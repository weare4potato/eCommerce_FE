import React from 'react';
import TopNavbar from "../components/TopNavbar/TopNavbar";
import {useNavigate} from "react-router-dom";
import ProductsByShopsList from "../components/ProductList/ProductsByShopsList";

function ProductsByShopsPage() {
    const navigate = useNavigate();

    const handleCategorySelection = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            <TopNavbar onCategorySelect={handleCategorySelection} />
            <ProductsByShopsList />
        </div>
    );
}

export default ProductsByShopsPage;
