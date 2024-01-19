import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../config/firebase';

const ProtectedRoute = () => {
    //const navigate = useNavigate();

 const [user] = useAuthState(auth);

 return (
   <>
    {
        user ? (
                  <Outlet />
               ) : (
                <Navigate to="/" replace={true} />
               )
    }
     </>
 );
};

export default ProtectedRoute;