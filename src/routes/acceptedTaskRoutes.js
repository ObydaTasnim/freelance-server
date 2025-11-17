import { Router } from "express";
const router = Router();
import { getAcceptedTasksByEmail, acceptJob, deleteAcceptedTask } from "../controllers/acceptedTaskControllers.js";

router.get("/:email", getAcceptedTasksByEmail);
router.post("/", acceptJob);
router.delete("/:id", deleteAcceptedTask);

export default router;
