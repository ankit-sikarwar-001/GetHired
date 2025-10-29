import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { User } = useSelector(Store => Store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Toggle navbar visibility (mobile). Stop propagation so the document listener doesn't run.
    const toggleMenu = (e) => {
        // If event provided, stop it from bubbling to document
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
        setIsOpen(prev => !prev);
    };

    // Close navbar if clicked outside (for mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If click is on menu button we ignore (shouldn't happen due to stopPropagation, but safe-guard)
            if (menuButtonRef.current && menuButtonRef.current.contains(event.target)) {
                return;
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                localStorage.removeItem("user");
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='flex justify-between items-center px-4 md:px-6 h-16 max-w-7xl mx-auto'>
                <div className='text-2xl font-bold'>
                    <Link to="/">Get<span className='text-[#F83002] cursor-pointer'>Hired</span></Link>
                </div>

                {/* Mobile menu icon */}
                <div className='md:hidden' ref={menuButtonRef}>
                    {/* pass the event so we can stopPropagation */}
                    <Menu className='cursor-pointer' onClick={(e) => toggleMenu(e)} />
                </div>

                {/* Navigation links */}
                <ul
                    ref={menuRef}
                    className={`
                        md:flex md:items-center md:justify-end md:gap-6 font-medium 
                        absolute md:static bg-white w-2/3 right-0 top-16 px-6 py-4 md:p-0
                        transition-all duration-300 ease-in-out shadow-md md:shadow-none
                        ${isOpen ? 'block' : 'hidden'}
                    `}
                >
                    {User && User.role === "Recruiter" ? (
                        <>
                            <li><Link to="/admin/companies" className='block py-2 md:py-0'>Companies</Link></li>
                            <li><Link to="/admin/jobs" className='block py-2 md:py-0'>Jobs</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/" className='block py-2 md:py-0'>Home</Link></li>
                            <li><Link to="/jobs" className='block py-2 md:py-0'>Jobs</Link></li>
                            <li onClick={() => dispatch(setSearchedQuery(""))}>
                                <Link to="/browse" className='block py-2 md:py-0'>Browse</Link>
                            </li>
                        </>
                    )}

                    {!User ? (
                        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0'>
                            <Link to="/login">
                                <Button variant='outline' className='bg-white cursor-pointer text-black hover:bg-gray-100 w-full md:w-auto'>
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className='bg-[#6A38C2] text-white cursor-pointer hover:bg-[#5a28a5] w-full md:w-auto'>
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <li className='mt-4 md:mt-0'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={User?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@Avatar" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-68'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src={User?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="@Avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{User?.fullName}</h4>
                                            <p className='text-sm text-muted-foreground'>{User?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2 mt-3'>
                                        {User?.role === "Job Seeker" && (
                                            <Button variant='link' className="cursor-pointer">
                                                <Link to="/profile" className='flex items-center gap-1'> <User2 /> View Profile</Link>
                                            </Button>
                                        )}
                                        <Button
                                            variant='link'
                                            onClick={logoutHandler}
                                            className="bg-red-400 text-white hover:bg-red-500 transition-all"
                                        >
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
