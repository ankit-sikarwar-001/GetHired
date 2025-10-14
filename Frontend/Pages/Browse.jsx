import React, { useEffect, useState } from 'react'
import Navbar from '@/components/shared/Navbar';
import Job from '@/components/JobsComponents/Job';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/Hooks/useGetAllJobs.jsx';
import Store from '@/redux/Store';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(Store => Store.jobs);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        const searchedJobs = allJobs.filter((jobs) => {
            if (!searchedQuery) {
                return true;
            };
            return jobs?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) || jobs?.description?.toLowerCase().includes(searchedQuery.toLowerCase());

        });
        console.log(searchedJobs);
        setFilterJobs(searchedJobs);
    }, [allJobs, searchedQuery])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filterJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        filterJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse