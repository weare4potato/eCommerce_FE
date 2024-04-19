import React from 'react';
import UpdateProduct from "../components/ProductList/UpdateProduct";

function UpdateProductPage() {
    const token = localStorage.getItem('Authorization');

    return (
        <div>
            <UpdateProduct token={token} />
        </div>
    );
}

export default UpdateProductPage;