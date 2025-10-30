import { application } from "express";
import { Job } from "../models/Job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      createdby: userId,
    });
    return res
      .status(201)
      .json({ message: "Job created successfully", job, success: true });
  } catch (err) {
    console.log(err);
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// students  k liye
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (err) {
    console.log(err);
  }
};
// admin kitne job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdby: adminId }).populate("company");
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Jobs fetched successfully", jobs, success: true });
  } catch (err) {
    console.log(err);
  }
};

// Update Admin Job
export const updateAdminJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
    } = req.body;

    let job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Update fields only if provided
    if (title) job.title = title;
    if (description) job.description = description;
    if (requirements) job.requirements = requirements.split(",");
    if (salary) job.salary = salary;
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experience) job.experienceLevel = experience;
    if (position) job.position = position;

    await job.save();

    return res
      .status(200)
      .json({ message: "Job updated successfully", job, success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
