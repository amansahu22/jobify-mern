import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import checkPermission from "../utils/checkPermission.js";
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
  const jobs = await Job.find({ createdBy: user });

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs: jobs.length,
    noOfPages: 1,
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

const showStats = (req, res) => {
  res.send("show stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
