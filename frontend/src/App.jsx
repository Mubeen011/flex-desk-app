import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/app_components/RootLayout.jsx";
import router from "./routers/routers.jsx";
import { Amplify } from "aws-amplify";
import { DbaProvider } from "./contexts/DbaProvider.jsx";
import { getRequest } from "./api/axios.js";
import awsconfig from "../src/api/aws-exports.js";
import { useEffect } from "react";

function App() {
  Amplify.configure(awsconfig);

  return (
    <DbaProvider>
      <RouterProvider router={router} />;
    </DbaProvider>
  );
}

export default App;
