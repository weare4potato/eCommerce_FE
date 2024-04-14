import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import MemberSignInPage from '../pages/MemberSignInPage';
import MemberSignUpPage from "../pages/MemberSignUpPage";
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
                <Route path="/login" element={<MemberSignInPage/>}/>
                <Route path="/signup" element={<MemberSignUpPage/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;