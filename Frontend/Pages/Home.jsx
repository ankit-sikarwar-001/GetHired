import CategoryCorousel from '@/components/HomeComponents/CategoryCorousel'
import HeroSection from '../src/components/HomeComponents/HeroSection'
import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import LatestJob from '@/components/HomeComponents/LatestJob'
import Footer from '@/components/Footer'
import useGetAllJobs from '@/Hooks/useGetAllCompanies'
import { useSelector } from 'react-redux'
import Store from '@/redux/Store'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { User } = useSelector(Store => Store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (User?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCorousel />
      <LatestJob />
      <Footer />
    </div>
  )
}

export default Home
