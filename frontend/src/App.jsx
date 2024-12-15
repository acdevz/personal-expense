import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import Main from "./layouts/Main";

// Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Timeline from "./pages/Timeline";
import Wallets from "./pages/Wallets";
import Budgets from "./pages/Budgets";
import Activity from "./pages/Activity";
import Options from "./pages/Options"
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />, // Wrap protected routes
    children: [
      {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
          { index: true, element: <Timeline /> },
          { path: "wallets", element: <Wallets /> },
          { path: "budgets", element: <Budgets /> },
          { path: "activity", element: <Activity /> },
          { path: "options", element: <Options /> }
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
