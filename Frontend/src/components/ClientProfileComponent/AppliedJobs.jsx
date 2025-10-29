import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Badge } from '../ui/badge';
import Store from '@/redux/Store';

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((store) => store.jobs);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'rejected':
        return 'bg-red-500 hover:bg-red-500/80';
      case 'pending':
        return 'bg-gray-500 hover:bg-gray-500/80';
      default:
        return 'bg-green-500 hover:bg-green-500/80';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold">Your Applied Jobs</h1>
      {allAppliedJobs.length <= 0 ? (
        <div className="flex items-center justify-center p-8 text-gray-500">
          <p>You haven't applied for any jobs yet!</p>
        </div>
      ) : (
        <>
          {/* Desktop Table: Appears on medium screens and larger */}
          <div className="hidden md:block">
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAppliedJobs.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        {item.createdAt.split('T')[0]}
                      </TableCell>
                      <TableCell>{item?.job?.title}</TableCell>
                      <TableCell>{item?.job?.company?.name}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={getStatusBadgeClass(item?.status)}>
                          {item?.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile "Card" View: Appears on smaller screens */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {allAppliedJobs.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">Date:</span>{' '}
                    {item.createdAt.split('T')[0]}
                  </p>
                  <Badge className={getStatusBadgeClass(item?.status)}>
                    {item?.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">
                    {item?.job?.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Company:</span>{' '}
                    {item?.job?.company?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedJobs;
