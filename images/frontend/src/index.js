import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Hero from "./components/hero/Hero";
import "./components/hero/hero.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Hero />
  </React.StrictMode>
);
