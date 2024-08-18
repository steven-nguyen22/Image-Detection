import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FileUpload from "./pages/FileUploadPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/fileupload",
    element: <FileUpload />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
