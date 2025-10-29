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
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { User } = useSelector(Store => Store.auth)
  const isResume = true

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm my-8 p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-24 w-24 shadow-md">
              <AvatarImage
                src={User?.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                alt={User?.fullName || 'User profile photo'}
                onError={e => {
                  e.target.src =
                    'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
                }}
              />
            </Avatar>

            <div className="space-y-2">
              <h1 className="font-semibold text-2xl text-gray-900">
                {User?.fullName || 'User Name'}
              </h1>
              <p className="text-gray-600 max-w-md">
                {User?.profile?.bio || 'No bio added yet.'}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-100"
          >
            <Pen size={18} /> <span>Edit</span>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Contact Information</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={18} /> <span>{User?.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact size={18} /> <span>{User?.phoneNumber || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Skills & Resume */}
        <div className="mt-8 border-t border-gray-200 pt-5">
          <h2 className="font-semibold text-lg text-gray-800 mb-3">Skills & Resume</h2>

          <div className="flex flex-wrap gap-2 mb-5">
            {User?.profile?.skills?.length > 0 ? (
              User.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-50 text-[#7209b7] border border-[#7209b7]/30 hover:bg-purple-100 transition-all"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>

          <div className="grid w-full max-w-sm items-start gap-1.5">
            <Label className="text-md font-semibold text-gray-800">Resume</Label>
            {isResume && User?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={User.profile.resume}
                className="text-blue-600 font-medium hover:underline break-all"
              >
                {User.profile.resumeOriginalName || 'View Resume'}
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-10">
        <h1 className="font-bold text-xl text-gray-900 mb-4">Applied Jobs</h1>
        <AppliedJobs />
      </div>

      {/* Edit Profile Dialog */}
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
