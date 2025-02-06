// import "./App.css";

// import ReactLoading from "react-loading";
// import Login from "./pages/auth/Login";
import { createBrowserRouter } from "react-router-dom";
import JobCard from "./components/common/JobCard";
import ClientRole from "./pages/auth/ClientRole";
import CreateAccount from "./pages/auth/CreateAccount";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import VerificationOTP from "./pages/auth/VerificationOTP";
import ClientHome from "./pages/client/ClientHome";
import NavBar from "./components/common/NavBar";

const router = createBrowserRouter([
  {
    element: <SignUp />,
    children: [
      {
        path: "/signup/choose-role",
        element: <ClientRole />,
      },
      {
        path: "/signup/create-account",
        element: <CreateAccount />,
      },
    ],
  },
  {
    path: "/signup/verify",
    element: <VerificationOTP />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <ClientHome />,
  },
]);

function App() {
  // return <RouterProvider router={router} />;
  // return <NavBar />;
  return <NavBar />;
}

export default App;
