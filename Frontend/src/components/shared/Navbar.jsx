import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, User2, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import store from "@/redux/Store"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {User} = useSelector(store=>store.auth);
    console.log(User);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    <li><Link to="/" className='block py-2 cursor-pointer  md:py-0'>Home</Link></li>
                    <li><Link to="/jobs" className='block py-2 cursor-pointer md:py-0'>Jobs</Link></li>
                    <li><Link to="/browse" className='block py-2 cursor-pointer md:py-0'>Browse</Link></li>

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
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@Avatar" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-68'>
                                    <div className='flex gap-4  space-y-2'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@Avatar" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Ankit Singh</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col mt-4 space-y-2'>
                                        <Button variant='link' className="cursor-pointer">
                                                <Link to="/profile" className='flex'> <User2 /> View Profile</Link>
                                        </Button>
                                        <Button variant='link' className="bg-red-400 cursor-pointer">
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
