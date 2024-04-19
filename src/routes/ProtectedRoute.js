// Desc: Private route for authenticated users
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { bouncy } from 'ldrs';
bouncy.register();

// ==============================|| PROTECTED ROUTE ||============================== //
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set isAuthenticated based on whether user is truthy
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // If isAuthenticated is still being determined, you can render a loading indicator or wait for the result
  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center fixed top-0 left-0 z-10 text-5xl overflow-x-hidden bg-white w-screen h-screen">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
      </div>
    );
  }
  // console.log('isAuthenticated', isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/" />; // If user is not logged in, redirect to login page
};

export default ProtectedRoute;
