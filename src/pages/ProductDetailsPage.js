import React from 'react';
import TopNavbar from "../components/TopNavbar/TopNavbar";
import ProductDetails from '../components/ProductList/ProductDetails';
import {useNavigate} from "react-router-dom";

function ProductDetailsPage() {
    const navigate = useNavigate();

    const handleCategorySelection = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            <TopNavbar onCategorySelect={handleCategorySelection}/>
            <ProductDetails />
        </div>
    );
}

export default ProductDetailsPage;
