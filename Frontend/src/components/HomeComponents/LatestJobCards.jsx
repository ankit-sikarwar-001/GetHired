import React from 'react';
import { Badge } from '../ui/badge';

const LatestJobCards = () => {
    return (
        <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-200 hover:shadow-2xl transition-all cursor-pointer duration-300 w-full max-w-md mx-auto">
            {/* Company Info */}
            <div>
                <h1 className="font-medium text-lg sm:text-xl">Company Name</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            {/* Job Title & Description */}
            <div>
                <h1 className="font-bold text-lg sm:text-xl my-2">Job Title</h1>
                <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </div>

            {/* Tags Section */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-[#6A38C2] font-bold" variant="ghost">
                    Position
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    Part Time
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    12 LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
