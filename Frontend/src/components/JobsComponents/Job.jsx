import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "dnkjfdfjfn";
  const daysAgo = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }
  return (
    <div className='p-5 rounded-md shadow-lg bg-white border border-gray-200'>
      <div className="flex items-center justify-between">
        <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt.split("T")[0]) == 0 ? "Today" : `${daysAgo(job?.createdAt.split("T")[0])} days ago`}</p>
        <Button variant="outline" className='rounded-full' size="icon"><Bookmark /></Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className='p-6' size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold my-2 text-lg'>{job?.title}</h1>
        <p className='text-sm text-gray-700'>{job?.description}</p>
      </div>
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
      <div className='flex items-center gap-4 mt-5'>
        <Button className="cursor-pointer" onClick={() => navigate(`/job/description/${job._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save for later</Button>
      </div>
    </div>
  )
}

export default Job
