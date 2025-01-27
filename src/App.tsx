// import "./App.css";

// import ReactLoading from "react-loading";
// import Login from "./pages/auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import VerificationOTP from "./pages/auth/VerificationOTP";
import CreateAccount from "./pages/auth/CreateAccount";
import ClientRole from "./pages/auth/ClientRole";
import ClientHome from "./pages/client/ClientHome";

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
  return <RouterProvider router={router} />;
}

export default App;
