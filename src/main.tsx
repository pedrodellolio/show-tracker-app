import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Home from "./routes/Home";
import Protected from "./routes/Protected";
import { AuthProvider } from "./contexts/AuthContext";
import "./global.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        element: <Root />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
