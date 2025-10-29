import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import FilterCard from "@/components/JobsComponents/FilterCard";
import Job from "@/components/JobsComponents/Job";
import useGetAllJobs from "@/Hooks/useGetAllJobs";
import { X } from "lucide-react";

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector((store) => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row gap-5 relative">
                    {/* Sidebar for desktop/laptop */}
                    <div className="hidden sm:block w-[25%] lg:w-[20%]">
                        <FilterCard />
                    </div>

                    {/* Filter Button for mobile */}
                    <div className="sm:hidden mb-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Available Jobs</h2>
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="bg-[#6A38C2] text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-[#5930a3] transition"
                        >
                            Filters
                        </button>
                    </div>

                    {/* Job Cards Section */}
                    <div className="flex-1">
                        {filterJobs.length <= 0 ? (
                            <span>Job not found</span>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-5">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job._id}
                                        layout
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -30, scale: 0.9 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                    ></div>

                    {/* Drawer Panel */}
                    <div className="relative w-72 bg-white h-full shadow-xl p-4 animate-slideInLeft overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-3">
                            <h1 className="font-bold text-lg">Filter Jobs</h1>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <X size={22} />
                            </button>
                        </div>
                        <hr className="mb-3" />

                        {/* Render only filter options (no button) */}
                        <div className="w-full bg-white rounded-md">
                            <FilterCard showButton={false} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
