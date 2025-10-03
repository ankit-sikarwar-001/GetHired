import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");

    }
    return (
        <div className="text-center px-4">
            <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base">
                    No. 1 Recruitment Website
                </span>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    Search Smarter, <br />
                    Apply Confidently & <br />
                    Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </h1>
                <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
                    Discover thousands of jobs from top companies and apply to your dream role with ease.
                </p>

                <div className="flex w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] mx-auto shadow-lg border border-gray-200 pl-3 pr-1 py-1 rounded-full items-center gap-2 bg-white">
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream job"
                        className="flex-grow outline-none border-none text-sm md:text-base px-2"
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-[#6A38C2] px-4 py-2 text-white hover:bg-[#57299e] transition">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
