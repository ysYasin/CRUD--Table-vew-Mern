import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DisplayCrudDetails from "./Components/DisplayCrudDetails.jsx";
import EditForm from "./Components/EditForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DisplayCrudDetails />,
      },
    ],
  },
  {
    path: "edit/:id",
    element: <EditForm />,
    loader: ({ params }) => fetch(`http://localhost:5300/users/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
