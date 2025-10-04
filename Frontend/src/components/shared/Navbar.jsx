import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User2, Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { setSearchedQuery } from '@/redux/jobSlice'
// import store from "@/redux/Store"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { User } = useSelector(Store => Store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='flex justify-between items-center px-4 md:px-6 h-16 max-w-7xl mx-auto'>
                <div className='text-2xl font-bold'>
                    <Link to="/" > Get<span className='text-[#F83002] cursor-pointer'>Hired</span></Link>
                </div>

                <div className='md:hidden'>
                    <Menu className='cursor-pointer' onClick={toggleMenu} />
                </div>

                <ul className={`
                    md:flex md:items-center md:justify-end md:gap-6 font-medium 
                    absolute md:static bg-white  w-1/3 right-0 top-16 px-6 py-4 md:p-0
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'block' : 'hidden'}
                `}>
                    {
                        User && User.role == "Recruiter" ? (
                            <>
                                <li><Link to="/admin/companies" className='block py-2 cursor-pointer  md:py-0'>Companies</Link></li>
                                <li><Link to="/admin/jobs" className='block py-2 cursor-pointer md:py-0'>Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className='block py-2 cursor-pointer  md:py-0'>Home</Link></li>
                                <li><Link to="/jobs" className='block py-2 cursor-pointer md:py-0'>Jobs</Link></li>
                                <li onClick={() => dispatch(setSearchedQuery(""))} ><Link to="/browse" className='block py-2 cursor-pointer md:py-0'>Browse</Link></li>
                            </>
                        )
                    }


                    {!User ? (
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0'>
                            <Link to="/login">
                                <Button variant='outline' className='bg-white cursor-pointer text-black hover:bg-gray-100 w-full md:w-auto'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='bg-[#6A38C2] text-white cursor-pointer hover:bg-[#6A38C2] w-full md:w-auto'>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <li className='mt-4 md:mt-0'>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer' asChild>
                                    <Avatar>
                                        <AvatarImage src={User?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@Avatar" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-68'>
                                    <div className='flex gap-4  space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={User?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@Avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{User?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{User?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col  space-y-2'>
                                        {
                                            User && User.role == "Job Seeker" && (
                                                <>
                                                    <Button variant='link' className="cursor-pointer">
                                                        <Link to="/profile" className='flex'> <User2 /> View Profile</Link>
                                                    </Button>
                                                </>
                                            )
                                        }

                                        <Button variant='link' onClick={logoutHandler} className="bg-red-400 cursor-pointer">
                                            <LogOut /> Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
