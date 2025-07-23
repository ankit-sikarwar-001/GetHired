import React, { useState } from 'react'
import { Label } from '../../src/components/ui/label'
import { Input } from '../../src/components/ui/input'
import { RadioGroup } from '../../src/components/ui/radio-group'
import { Button } from '../../src/components/ui/button'
import Navbar from '../../src/components/shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    file: ""
  })

  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData(); //we made formData because we want to send file unless we can simply use application/json with input variable
    formData.append('fullName', input.fullName);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log("Sending data:", formData);
      console.log("Response received:", res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }

  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className='flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-0 py-10'>
        <form onSubmit={submitHandler} className='w-full md:max-w-5/12 p-6 border border-gray-300 rounded-md shadow-md bg-white'>
          <h1 className='text-2xl font-bold text-center mb-4'>Sign Up</h1>

          <div className="mb-3">
            <Label htmlFor="name" className="text-lg">Full Name</Label>
            <Input
              className="mt-1"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              type="text"
              id="name"
              placeholder='Enter your full name'
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="number" className="text-lg">Phone Number</Label>
            <Input
              className="mt-1"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              id="number"
              type="tel"
              placeholder='985642xxxx'
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="email" className="text-lg">Email</Label>
            <Input
              className="mt-1"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              type="email"
              id="email"
              placeholder='abcd@gmail.com'
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="password" className="text-lg">Password</Label>
            <Input
              className="mt-1"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              type="password"
              id="password"
              placeholder='Enter your password'
            />
          </div>

          <div className='flex flex-col sm:flex-row sm:justify-between gap-4 mb-4'>
            <RadioGroup defaultValue="comfortable" className="flex gap-4">
              <div className="flex items-center gap-2">
                <input type="radio" value="Job Seeker"
                  checked={input.role === "Job Seeker"}
                  onChange={changeEventHandler}
                  name='role' id="r1" className='cursor-pointer size-3' />
                <Label htmlFor="r1" className="text-base cursor-pointer">Job Seeker</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  value="Recruiter" name='role' id="r2" className='cursor-pointer size-3' />
                <Label htmlFor="r2" className="text-base cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex flex-col gap-1 w-1/2'>
              <Label htmlFor="profile" className="text-base cursor-pointer">Profile Photo</Label>
              <Input type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer" id="profile" accept="image/*" />
            </div>
          </div>

          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button> : <Button type="submit" className='w-full p-5 font-bold cursor-pointer bg-black text-white hover:bg-gray-900'>
              Register
            </Button>
          }
          <span>
            <p className='text-center text-sm mt-4'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
          </span>
        </form>
      </div>
    </div>
  )
}

export default SignUp
