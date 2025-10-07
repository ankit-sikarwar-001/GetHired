import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { useSelector } from 'react-redux'
import Store from '@/redux/Store'
import { Badge } from '../ui/badge'

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector(Store => Store.jobs);
  // console.log(allAppliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet yet !</span> : allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={item?.status === "rejected" ? "bg-red-500" : item.status === "pending" ? "bg-gray-500" : "bg-green-500"}>{item?.status.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs
