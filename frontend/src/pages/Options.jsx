import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Options = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8888/api/users/signout", // Replace with your API endpoint
        {},
        { withCredentials: true }
      );

      // Remove token or user data
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");

      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (err) {
      toast.error("Error logging out. Please try again.");
    }
  };

  // Handle Delete Account Logic
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible!")) {
      return; // User canceled the action
    }

    try {
      await axios.delete(
        "http://localhost:8888/api/users/deleteUser", // Replace with your API endpoint
        { withCredentials: true }
      );

      // Clean up local storage and cookies
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");

      toast.success("Account deleted successfully!");
      navigate("/signup");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error deleting account!";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <h1>Account Options</h1>
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '20px'
      }}>
        <button className="btn" onClick={handleLogout}>
          Log Out
        </button>
        <button className="btn btn--warning" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </>
  );
};

export default Options;
