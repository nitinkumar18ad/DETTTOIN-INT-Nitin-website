import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Lenis from "lenis";

// Initialize Lenis smooth scroll (respects prefers-reduced-motion)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function rafLoop(time) {
    lenis.raf(time);
    requestAnimationFrame(rafLoop);
  }

  requestAnimationFrame(rafLoop);
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
