import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import Store from '@/redux/Store'
import Navbar from '../shared/Navbar'

const JobDescription = () => {
    const { singleJob } = useSelector(Store => Store.jobs)
    const { User } = useSelector(Store => Store.auth)
    const isInitiallyApplied =
        singleJob?.applications?.some(app => app.applicant === User?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            })
            if (res.data.success) {
                setIsApplied(true)
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: User?._id }],
                }
                dispatch(setSingleJob(updatedSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Error applying for job')
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(
                        res.data.job.applications.some(app => app.applicant === User?._id)
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, User?._id])

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-2xl shadow-md">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {singleJob?.title || 'Job Title'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge className="text-blue-700 font-semibold" variant="ghost">
                                {singleJob?.postion} Positions
                            </Badge>
                            <Badge className="text-[#F83002] font-semibold" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-[#7209b7] font-semibold" variant="ghost">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>

                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full sm:w-auto rounded-lg text-white font-medium transition-all ${isApplied
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                            }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Job Description Section */}
                <div className="bg-white mt-8 rounded-2xl shadow-md p-5 sm:p-8">
                    <h2 className="border-b border-gray-200 pb-3 mb-5 text-lg sm:text-xl font-semibold text-gray-800">
                        Job Description
                    </h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-800">
                        <p>
                            <span className="font-bold">Role:</span>{' '}
                            <span className="text-gray-700">{singleJob?.title}</span>
                        </p>
                        <p>
                            <span className="font-bold">Location:</span>{' '}
                            <span className="text-gray-700">{singleJob?.location}</span>
                        </p>
                        <p>
                            <span className="font-bold">Description:</span>{' '}
                            <span className="text-gray-700">{singleJob?.description}</span>
                        </p>
                        <p>
                            <span className="font-bold">Experience:</span>{' '}
                            <span className="text-gray-700">{singleJob?.experience} yrs</span>
                        </p>
                        <p>
                            <span className="font-bold">Salary:</span>{' '}
                            <span className="text-gray-700">{singleJob?.salary} LPA</span>
                        </p>
                        <p>
                            <span className="font-bold">Total Applicants:</span>{' '}
                            <span className="text-gray-700">
                                {singleJob?.applications?.length}
                            </span>
                        </p>
                        <p>
                            <span className="font-bold">Posted Date:</span>{' '}
                            <span className="text-gray-700">
                                {singleJob?.createdAt?.split('T')[0]}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
