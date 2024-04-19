import React from 'react';
import ShopsByProducts from "../components/ProductList/ShopsByProducts";

function ShopsByProductsPage() {
    const token = localStorage.getItem('Authorization');

    return (
        <div>
            <ShopsByProducts token={token} />
        </div>
    );
}

export default ShopsByProductsPage;