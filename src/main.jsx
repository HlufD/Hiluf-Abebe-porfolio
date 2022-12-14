import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { myContext, state } from "./contexts/myContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <myContext.Provider value={state}>
      <App />
    </myContext.Provider>
  </React.StrictMode>
);
