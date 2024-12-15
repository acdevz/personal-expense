import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/users/signin",
        { email, password },
        { withCredentials: true }
      );

      const { user, message } = response.data;
      
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Sign In Successful!");

      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
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

        <button type="submit" className="btn">Sign In</button>
      </form>

      <div className="other-sign-options">
        Or signup instead? 
        <NavLink 
          to="/signup" 
          end
        >
          SignUp
        </NavLink>
      </div>
    </div>
  );
};

export default SignIn;
