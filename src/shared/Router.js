import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import MemberSignInPage from '../pages/MemberSignInPage';
import MemberSignUpPage from "../pages/MemberSignUpPage";
import App from '../App';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Main from "../pages/Main";
import ProductsByCategoryPage from "../pages/ProductsByCategoryPage";
import ProductsByShopsPage from "../pages/ProductsByShopsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/category/:categoryId" element={<ProductsByCategoryPage />} />
                <Route path="/shops/:shopId" element={<ProductsByShopsPage />} />
                <Route path="/products/:productId" element={<ProductDetailsPage />} />
                <Route path="/login" element={<MemberSignInPage/>}/>
                <Route path="/signup" element={<MemberSignUpPage/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;