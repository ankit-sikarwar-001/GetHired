import React, { useEffect, useState } from 'react'
import { Label } from '../../src/components/ui/label'
import { Input } from '../../src/components/ui/input'
import { RadioGroup } from '../../src/components/ui/radio-group'
import { Button } from '../../src/components/ui/button'
import Navbar from '../../src/components/shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import Store from '@/redux/Store'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const { loading, User } = useSelector((Store) => Store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate('/');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");

    } finally {
      dispatch(setLoading(false));
    }
  }
  useEffect(() => {
    if (User) {
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className='flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-0 py-10'>
        <form onSubmit={submitHandler} className='w-full md:max-w-5/12 p-6 border border-gray-300 rounded-md shadow-md bg-white'>
          <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>
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
                <input type="radio" value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  name='role' id="r2" className='cursor-pointer size-3' />
                <Label htmlFor="r2" className="text-base cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /></Button> : <Button type="submit" className='w-full p-5 font-bold cursor-pointer bg-black text-white hover:bg-gray-900'>
              Sign In
            </Button>
          }

          <div className='flex justify-between items-center mt-4'>
            <span>
              <p className='text-center text-sm mt-4'>Don't have an account? <Link to="/signup" className='text-blue-600 hover:underline'>Sign Up</Link></p>
            </span>
            <span>
              <p className='text-center text-sm mt-4'>Forgot Password? <Link to="/forgot-password" className='text-blue-600 hover:underline'>Reset</Link></p>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
