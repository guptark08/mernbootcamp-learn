import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"; // "switch" is replaced with "Routes" in v6 of lib
import Home from "./core/Home";
const Routess = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact component={Home} />
        </Routes>
    </BrowserRouter>
  );
};

export default Routess;