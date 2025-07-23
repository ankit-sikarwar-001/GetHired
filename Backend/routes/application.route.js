import express, { application } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAllAppliedJobs, getApplicants, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAllAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").put(isAuthenticated, updateStatus);

export default router;
