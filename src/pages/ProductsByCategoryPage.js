import React from 'react';
import TopNavbar from "../components/TopNavbar/TopNavbar";
import ProductsByCategoryList from "../components/ProductList/ProductsByCategoryList";
import {useNavigate} from "react-router-dom";

function ProductsByCategoryPage() {
    const navigate = useNavigate();

    const handleCategorySelection = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            <TopNavbar onCategorySelect={handleCategorySelection} />
            <ProductsByCategoryList />
        </div>
    );
}

export default ProductsByCategoryPage;