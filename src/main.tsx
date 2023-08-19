import React from "react";
import ReactDOM from "react-dom/client";
import "./App.generated.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./settings/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>,
);
