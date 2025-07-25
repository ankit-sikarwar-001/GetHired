import { Application } from "../models/application.model.js";
import { Job } from "../models/Job.model.js";

export const applyJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({ message: "User ID and Job ID are required", success: false });
        }
        // existance check for job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
            if(existingApplication){
                return res.status(400).json({ message: "You have already applied for this job", success: false });
            }
        // check for job existance
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        } 
        // create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        // update job with new application
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({ message: "job applied successfully", application: newApplication, success: true });
    }catch(err){
        console.log(err);
    } 
}
export const getAllAppliedJobs = async (req, res) => {
    try{
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: {sort: { createdAt: -1 }},
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });
        if(!applications ){
            return res.status(404).json({ message: "No applications found", success: false });
        }
        return res.status(200).json({ message: "Applications fetched successfully", applications, success: true });
                 
    }catch(err){
        console.log(err);
    }
}

export const getApplicants = async (req, res) => {
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
         options: { sort: { createdAt: -1 } },
         populate: {
            path: "applicant",
         }
        }); 
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ message: "Applicants fetched successfully", applicants: job.applications, success: true });
    }catch(err){
        console.log(err);
    }
}
export const updateStatus = async (req, res) => { 
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status || !applicationId){
            return res.status(400).json({ message: "Status and Application ID are required", success: false });
        }
        const application = await Application.findById({_id:applicationId});
        if(!application){
            return res.status(404).json({ message: "Application not found", success: false });
        }
        // update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Application status updated successfully", application, success: true });
    }
    catch(err){
        console.log(err);
    }
}