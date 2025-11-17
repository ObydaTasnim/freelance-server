import { Router } from "express";
const router = Router();
import { getAllJobs, getLatestJobs, getJobById, getJobsByUserEmail, createJob, updateJob, deleteJob } from "../controllers/jobController.js";

router.get("/", getAllJobs);
router.get("/latest", getLatestJobs);
router.get("/:id", getJobById);
router.get("/user/:email", getJobsByUserEmail);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
