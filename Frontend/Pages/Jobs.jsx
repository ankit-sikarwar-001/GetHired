import FilterCard from '@/components/JobsComponents/FilterCard'
import Job from '@/components/JobsComponents/Job'
import Navbar from '@/components/shared/Navbar'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import Store from '@/redux/Store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

// const randomJobs = [1, 2, 3,4,5,6,7,8]
const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(Store => Store.jobs)
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                console.log(searchedQuery)
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
    return (
        <div >
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 '>
                <div className='flex gap-5 '>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[79vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
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
