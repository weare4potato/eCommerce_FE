import React from 'react';
import TopNavbar from "../components/TopNavbar/TopNavbar";
import CreateProduct from "../components/ProductList/CreateProduct";

function CreateProductPage() {
    const token = localStorage.getItem('Authorization');

    return (
        <div>
            <CreateProduct token={token} />
        </div>
    );
}

export default CreateProductPage;