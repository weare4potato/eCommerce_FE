import React from 'react';
import ProductList from "../components/ProductList/ProductList";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import { useNavigate } from 'react-router-dom';

function Main() {
    const navigate = useNavigate();

    const handleCategorySelection = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div>
            <TopNavbar onCategorySelect={handleCategorySelection} />
            <ProductList />
        </div>
    );
}

export default Main;
