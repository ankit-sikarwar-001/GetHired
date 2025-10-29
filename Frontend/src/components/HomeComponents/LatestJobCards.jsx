import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const descriptionRef = React.useRef(null);

    React.useEffect(() => {
        if (descriptionRef.current) {
            setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, [job?.description]);

    return (
        <div
            onClick={() => {
                navigate(`/job/description/${job._id}`);
            }}
            className="p-4 sm:p-5 rounded-lg shadow-xl bg-white border border-gray-200 hover:shadow-2xl transition-all cursor-pointer duration-300 w-full max-w-md sm:max-w-lg mx-auto"
        >
            {/* Company Info */}
            <div>
                <h1 className="font-medium text-lg sm:text-xl">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mt-2">
                <h1 className="font-bold text-lg sm:text-xl mb-1">{job?.title}</h1>
                <p
                    ref={descriptionRef}
                    className={`text-sm text-gray-600 transition-all duration-300 ${expanded ? "line-clamp-none" : "line-clamp-3"
                        }`}
                >
                    {job?.description}
                </p>
                {isOverflowing && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                        className="text-[#6A38C2] text-sm font-semibold mt-1 hover:underline focus:outline-none"
                    >
                        {expanded ? "Read less" : "Read more"}
                    </button>
                )}
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-[#6A38C2] font-bold" variant="ghost">
                    {job?.position}
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    {job?.salary}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
