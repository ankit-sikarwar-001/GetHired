import FilterCard from '@/components/JobsComponents/FilterCard'
import Job from '@/components/JobsComponents/Job'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/Hooks/useGetAllCompanies'
import Store from '@/redux/Store'
import React from 'react'
import { useSelector } from 'react-redux'

// const randomJobs = [1, 2, 3,4,5,6,7,8]
const Jobs = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(Store => Store.jobs)
    return (
        <div >
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 '>
                <div className='flex gap-5 '>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        allJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[79vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        allJobs.map((job) => (
                                            <div key={job._id}>
                                                <Job key={job._id} job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
