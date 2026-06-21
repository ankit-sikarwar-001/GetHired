import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(
        (Store) => Store.company,
    );
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredCompany =
            companies.length >= 0 &&
            companies.filter((company) => {
                if (!searchCompanyByText) {
                    return true;
                }
                return company?.name
                    ?.toLowerCase()
                    .includes(searchCompanyByText.toLowerCase());
            });
        console.log(filteredCompany);
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const deleteCompanyHandler = async (companyId) => {
        try {
            const res = await axios.delete(
                `${COMPANY_API_END_POINT}/delete/${companyId}`,
                {
                    withCredentials: true,
                },
            );

            if (res.data.success) {
                toast.success(res.data.message);

                setFilterCompany((prev) =>
                    prev.filter((company) => company._id !== companyId),
                );
            }
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.message || "Failed to delete company");
        }
    };
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <tr key={company._id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage
                                        src={company.logo || "https://github.com/shadcn.png"}
                                    />
                                </Avatar>
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 ">
                                        {/* onClick={() => navigate(`/admin/companies/${company._id}`)} */}
                                        <div
                                            onClick={() =>
                                                navigate(`/admin/companies/${company._id}`)
                                            }
                                            className="flex items-center gap-2 w-fit cursor-pointer"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>

                                        <div
                                            onClick={() => deleteCompanyHandler(company._id)}
                                            className="flex items-center gap-2 mt-2 w-fit cursor-pointer hover:text-red-600 "
                                        >
                                            <Trash2 className="w-4" />

                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CompaniesTable;
