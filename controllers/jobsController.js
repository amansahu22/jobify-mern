import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

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

const deleteJob = (req, res) => {
  res.send("delete job");
};

const getAllJobs = (req, res) => {
  res.send("get all jobs");
};

const updateJob = (req, res) => {
  res.send("update job");
};

const showStats = (req, res) => {
  res.send("show stats");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
