import React from "react";
import ReactDOM from "react-dom/client";
import "./App.generated.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./settings/Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
