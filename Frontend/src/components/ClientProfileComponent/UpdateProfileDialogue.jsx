import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoading, setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import Store from "@/redux/Store"
import { USER_API_END_POINT } from '../../utils/constant'

const UpdateProfileDialogue = ({ open, setOpen }) => {
    const [loading] = useState(false);
    const { User } = useSelector(Store=> Store.auth);
    const [input, setInput] = useState({
        fullname: User?.fullName,
        email: User?.email,
        phoneNumber: User?.phoneNumber,
        bio: User?.profile?.bio,
        skills: User?.profile?.skills?.map(skill => skill),
        file: User?.profile?.resume,

    })
    const dispatch = useDispatch();

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const fileHandler = (e)=>{
        const file = e.target.files?.[0];
        setInput({...input,file})
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        const formData = new FormData;
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("bio",input.bio);
        formData.append("skills",input.skills);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false));
        }
        setOpen(false); 
        console.log(input);
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)} >
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile
                        </DialogTitle>
                        <form onSubmit={submitHandler}> 
                            <div className='grid gap-4 py-4'>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="flex justify-end">Name</Label>
                                    <input
                                        id='name'
                                        value={input.fullname}
                                        type='text'
                                        onChange={changeEventHandler}
                                        name='name'
                                        className='col-span-3'
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="flex justify-end">Email</Label>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        onChange={changeEventHandler}
                                        value={input.email}
                                        className='col-span-3'
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="number" className="flex justify-end">Number</Label>
                                    <input
                                        id='number'
                                        name='number'
                                        type='number'
                                        onChange={changeEventHandler}
                                        value={input.phoneNumber}
                                        className='col-span-3'
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bio" className="flex justify-end">Bio</Label>
                                    <input
                                        id='bio'
                                        name='bio'
                                        onChange={changeEventHandler}
                                        value={input.bio}
                                        className='col-span-3'
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="skills" className="flex justify-end">Skills</Label>
                                    <input
                                        id='skills'
                                        name='skills'
                                        onChange={changeEventHandler}
                                        value={input.skills}
                                        className='col-span-3'
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="file" className="flex justify-end">Resume</Label>
                                    <input
                                        id='file'
                                        name='file'
                                        type='file'
                                        accept='application/pdf'
                                        onChange={fileHandler}
                                        // value={input.file}
                                        className='col-span-3'
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                {
                                    loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button> : <Button type="submit" className='w-full p-5 font-bold cursor-pointer bg-black text-white hover:bg-gray-900'>
                                        Update
                                    </Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialogue
