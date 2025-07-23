/* eslint-disable no-unused-vars */
import Job from '@/components/JobsComponents/Job'
import Navbar from '@/components/shared/Navbar'
import React from 'react'

const randomJobs = [1, 2, 3,4,5,6,5,55]
const Browse = () => {
    return (
        <div >
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-lg my-10'>Seach Results {randomJobs.length}</h1>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        randomJobs.map((item, index) => (
                            <Job />
                        ))
                    }

                </div>

            </div>
        </div>
    )
}

export default Browse
