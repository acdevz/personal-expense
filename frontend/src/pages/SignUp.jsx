import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/signup",
        { name, email, password },
        { withCredentials: true }
      );

      const { user, message } = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Sign Up Successful!");

      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">Sign Up</button>
      </form>

      <div className="other-sign-options">
        Or signin instead? 
        <NavLink 
          to="/signin" 
          end
        >
          SignIn
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;