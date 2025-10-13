import Store from '@/redux/Store'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { User } = useSelector(Store => Store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (User === null || User.role !== "Recruiter") {
            navigate("/");
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
