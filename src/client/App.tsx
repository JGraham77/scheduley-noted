import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./views/Verify";

interface AppProps {}

const App = (props: AppProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/verify"
                    element={<Verify />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
