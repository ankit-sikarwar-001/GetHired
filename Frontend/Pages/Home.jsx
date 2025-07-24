import CategoryCorousel from '@/components/HomeComponents/CategoryCorousel'
import HeroSection from '../src/components/HomeComponents/HeroSection'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import LatestJob from '@/components/HomeComponents/LatestJob'
import Footer from '@/components/Footer'
import useGetAllJobs from '@/Hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCorousel />
      <LatestJob/>
      <Footer/>
    </div>
  )
}

export default Home
