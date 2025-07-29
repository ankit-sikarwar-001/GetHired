import React, { useEffect } from 'react'
import { Badge } from '../ui/badge'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import useGetSingleJob from "@/Hooks/useGetAllJobs"
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import Store from '@/redux/Store'

const JobDescrition = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { singleJob } = useSelector(Store=>Store.jobs)
    const { User } = useSelector(Store=>Store.auth)
    const isApplied = singleJob?.applications?.some(applications=>applications.applicant === User?.id) || false;
    console.log(User?._id);
    console.log(singleJob?.applications?.some(applications => applications.applicant == User?.id))
    const jobId = params.id;
    useGetSingleJob(jobId);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log(res);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();
    }, [jobId,dispatch,User?._id])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex justify-between items-center'>
                    <div>
                        <h1 className='font-bold  text-xl'>{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Badge className="text-[#6A38C2] font-bold" variant="ghost">
                                {singleJob?.position}
                            </Badge>
                            <Badge className="text-[#F83002] font-bold" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-bold" variant="ghost">
                                {singleJob?.salary}
                            </Badge>
                        </div>
                    </div>
                    <Button 
                    disabled = {isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' :'bg-[#7209b7] hover:bg-[#6a3db8] cursor-pointer'}`}>{isApplied?"Already Applied":"Apply Now"}</Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>

                </div>
            </div>
        </div>
    )
}

export default JobDescrition
