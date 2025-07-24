import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import Store from '@/redux/Store'

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJob = () => {
    const { allJobs } = useSelector(Store => Store.jobs)
    return (
        <div className="max-w-7xl mx-auto my-20 px-4 md:px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            <div className="grid grid-cols-1 ml-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 my-8">
                {allJobs.length <=0 ? <span>NO Job Available</span>: allJobs.slice(0, 6).map((job) => (
                    <LatestJobCards key={job._id} job = {job}/>
                ))}
            </div>
        </div>
    )
}

export default LatestJob
