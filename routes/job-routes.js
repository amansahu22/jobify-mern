import express from "express";
const router = express.Router();

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'

router.get('/', getAllJobs);

router.post('/', createJob);

router.get('/stats', showStats);
//remember place stats above the /:id otherwise it can be treated as id

router.delete('/:id', deleteJob);

router.patch('/:id', updateJob);



export default router;