import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import registerPwa from './register-pwa.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerPwa();