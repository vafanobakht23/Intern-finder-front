import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./App.tsx";
import './App.generated.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
