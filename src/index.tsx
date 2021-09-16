import React from "react";
import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import "@emdgroup-liquid/liquid/dist/css/liquid.css";
import { defineCustomElements, setAssetPath } from "@emdgroup-liquid/liquid";
import App from "./App";

defineCustomElements();
setAssetPath(window.location.origin);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
