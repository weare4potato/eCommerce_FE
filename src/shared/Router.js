import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import App from '../App';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;