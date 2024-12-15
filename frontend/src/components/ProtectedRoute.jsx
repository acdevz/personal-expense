import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthToken = async () => {
    try {
      const response = await axios.get("http://localhost:8888/api/validateToken", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("User is not authenticated:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (loading) {
    return <div className="loading-screen">
      <div className="loader"></div>
    </div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
