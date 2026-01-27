import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Stats from "./Page/Stats.jsx";
import TeamStats from "./Page/TeamStats.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Stats" element={<Stats />} />
        <Route path="/TeamStats" element={<TeamStats />} />
      </Routes>
    </Router>
  </StrictMode>,
);
