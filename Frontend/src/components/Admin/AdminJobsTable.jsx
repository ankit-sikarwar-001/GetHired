import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.jobs);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    // ✅ Filter jobs by search text
    useEffect(() => {
        const filtered = allAdminJobs?.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filtered || []);
    }, [allAdminJobs, searchJobByText]);

    // ✅ Safe date format
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toISOString().split('T')[0];
        } catch {
            return 'N/A';
        }
    };
    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(
                `${JOB_API_END_POINT}/delete/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="overflow-x-auto mt-6">
            <Table>
                <TableCaption>A list of your recently posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name || 'Unknown'}</TableCell>
                                <TableCell>{job?.title || 'Untitled'}</TableCell>
                                <TableCell>{formatDate(job?.createdAt)}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 grid justify-center">
                                            {/* ✅ Update route fixed according to backend */}
                                            <div
                                                onClick={() => navigate(`/admin/jobs/update/${job._id}`)}
                                                className="flex items-center gap-2 w-fit cursor-pointer hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div>

                                            {/* ✅ Applicants route (view job applicants) */}
                                            <div
                                                onClick={() =>
                                                    navigate(`/admin/jobs/${job._id}/applicants`)
                                                }
                                                className="flex items-center gap-2 mt-2 w-fit cursor-pointer hover:text-green-600"
                                            >
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>
                                            {/* Delete the wrong job */}
                                            <div
                                                onClick={() => deleteJobHandler(job._id)}
                                                className="flex items-center gap-2 mt-2 w-fit cursor-pointer hover:text-red-600"
                                            >
                                                <Trash2 className="w-4" />
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
