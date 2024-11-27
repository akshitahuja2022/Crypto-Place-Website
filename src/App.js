import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Coin from "./Pages/Coin/Coin";
import Footer from "./Components/Footer/Footer";

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer />
    </div>
  );
}
