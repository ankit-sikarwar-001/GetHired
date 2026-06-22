import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import { getAtsScore } from "../controllers/ats.controller.js";

const router = express.Router();

router.route("/score").get(isAuthenticated, getAtsScore);

export default router;
