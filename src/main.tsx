import React from "react";
import ReactDOM from "react-dom/client";
import "./App.generated.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./settings/Routes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
