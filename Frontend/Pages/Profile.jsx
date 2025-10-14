import Navbar from '@/components/shared/Navbar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Contact, Mail, Pen } from 'lucide-react'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import AppliedJobs from '@/components/ClientProfileComponent/AppliedJobs'
import UpdateProfileDialogue from '@/components/ClientProfileComponent/UpdateProfileDialogue'
import { useSelector } from 'react-redux'
import Store from '@/redux/Store'
import useGetAppliedJobs from '@/Hooks/useGetAppliedJobs.jsx'


const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { User } = useSelector(Store => Store.auth);
  // const skills = User?.profile?.skills?.map(skill => skill);
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={User?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                alt={User?.fullName ? `${User.fullName}'s profile photo` : "Default profile"}
                onError={e => { e.target.src = "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"; }}
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{User?.fullName}</h1>
              <p>{User?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right" variant="outline"><Pen /></Button>
        </div>
        <div className=" my-5">
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{User?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>
              {User?.phoneNumber}
            </span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {
              User?.profile?.skills.length != 0 ? User?.profile?.skills.map((skill, index) => <Badge key={index}>{skill}</Badge>) : <span>
                NA
              </span>
            }
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {
              isResume ? <a target='blank' href={User?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{User?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
          </div>

        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className='font-bold text-lg'>Applied Jobs</h1>
        {/* Application table */}
        <AppliedJobs />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
