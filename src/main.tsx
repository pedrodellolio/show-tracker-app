import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import Home from "./routes/Home";
import Protected from "./routes/Protected";
import "./global.css";
import App from "./App";

export const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
