import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../Pages/auth/Login'
import Home from '../Pages/Home'
import SignUp from '../Pages/auth/SignUp'
import Jobs from '../Pages/Jobs'
import Browse from '../Pages/browse'
import Profile from '../Pages/Profile'
import JobDescrition from './components/JobsComponents/JobDescrition'

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
    element: <Profile/>,
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
