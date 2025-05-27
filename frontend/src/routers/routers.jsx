import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../components/app_components/RootLayout.jsx";
import Error from "../pages/Error";
import Login from "../pages/Login";
import FetchTokens from "../pages/FetchTokens.jsx";
import Dashboard from "../components/app_components/Dashboard.jsx";
import Peoples from "../components/app_components/Peoples.jsx";
import Groups from "../components/app_components/Groups.jsx";
import FloorPlan from "../components/app_components/FloorPlan.jsx";
import Analytics from "../components/app_components/Analytics.jsx";
import Settings from "../components/app_components/Settings.jsx";
// Create a custom route with authentication check
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app/dashboard" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/fetchTokens",
    element: <FetchTokens />,
  },

  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "people",
        element: <Peoples />,
      },
      {
        path: "groups", // /app/booking route
        element: <Groups />,
      },
      {
        path: "floorplan", // /app/booking route
        element: <FloorPlan />,
      },
      {
        path: "analytics", // /app/booking route
        element: <Analytics />,
      },
      {
        path: "settings", // /app/booking route
        element: <Settings />,
      },
    ],
  },

  {
    path: "/error",
    element: <Error />,
  },

  {
    path: "/login",
    element: <Navigate to="/app/home" />,
  },
]);

export default router;
