import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/auth/Login'
import Home from '../Pages/Home'
import SignUp from '../Pages/auth/SignUp'
import Jobs from '../Pages/Jobs'
import Browse from '../Pages/browse'
import Profile from '../Pages/Profile'
import JobDescrition from './components/JobsComponents/JobDescrition'
import Companies from './components/Admin/Companies'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetup from './components/Admin/CompanySetup'
import AdminJobs from './components/Admin/AdminJobs'

const approuter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/job/description/:id',
    element: <JobDescrition />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  // admins routes start from here 
  {
    path: '/admin/companies',
    element: <Companies />,
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />,
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />,
  },
])

function App() {

  return (
    <>
      <RouterProvider router={approuter} />
    </>
  )
}

export default App
