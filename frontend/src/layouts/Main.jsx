import { Outlet, NavLink } from "react-router-dom";
import "./Main.css"; // Add some basic CSS for styling

const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/signin");
};

const Main = () => {
  return (
    <div className="main-layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="brand">Expense Manager</h2>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "active-link" : ""}
              end
            >
              Timeline
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/wallets" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Wallets
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/budgets" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Budgets
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/activity" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Activity
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/options" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              Options
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
