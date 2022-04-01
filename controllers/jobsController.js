import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";

const monthName = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  june: 6,
  july: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  //remember at the time we are validating our token we added user field to our req body

  const job = await Job.create(req.body);

  console.log(job);
  res.status(StatusCodes.CREATED).json(job);
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }

  checkPermission(req.user, job.createdBy);

  await Job.findOneAndRemove({ _id: jobId });
  //or we can use await job.remove();

  res.status(StatusCodes.OK).json({ msg: "Job deleted Successfully" });
};

const getAllJobs = async (req, res) => {
  const user = req.user.userId;

  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: user,
  };

  if (status !== "all") {
    queryObject.status = status;
  }

  if (jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.company = { $regex: search, $options: "i" };
    //option i means case-insensitive
  }

  //No Await then it will not return the response it will only return the query
  let result = Job.find(queryObject);

  //chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("company");
  }
  if (sort === "z-a") {
    result = result.sort("-company");
  }

  //pagination

  const limit = Number(req.query.limit) || 10; //in our cases we will set this as default 10.
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit); //skip and limit methods are provided by mongoDB
  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const noOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    noOfPages,
  });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }

  //checking for the permission

  checkPermission(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true, //this will verify incoming data with the validators that we have set inside mongoose schema
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  const user = req.user.userId;
  //remember userId is of type string and we want it as a mongoose objectId
  const userObjectId = mongoose.Types.ObjectId(user);

  // aggregation pipeline(https://docs.mongodb.com/manual/core/aggregation-pipeline/)
  let stats = await Job.aggregate([
    { $match: { createdBy: userObjectId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  //just to format our data
  stats = stats.reduce((final, current) => {
    const { _id: title, count } = current;
    final[title] = count;
    return final;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0, //if there is pending field inside of stats then set that value else set as 0
    interview: stats.interview || 0,
    decline: stats.decline || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } }, //-1 represents latest entries
    { $limit: 6 }, //give only 6 entries
  ]);

  //formating data
  monthlyApplications = monthlyApplications
    .reduce((final, current) => {
      let {
        _id: { month, year },
        count,
      } = current;

      for (let i in monthName) {
        if (monthName[i] === month) {
          month = i;
        }
      }
      const date = `${month} ${year}`;
      final.push({ date, count });
      return final;
    }, [])
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications,
  });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
