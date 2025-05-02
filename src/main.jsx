import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContextGLOBAL } from "./contextGLOBAL.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextGLOBAL>
      <App />
    </ContextGLOBAL>
  </StrictMode>
);
