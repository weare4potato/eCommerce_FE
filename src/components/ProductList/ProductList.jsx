import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../api/ProductApi';
import ProductCard from './ProductCard';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching all products');
                const response = await getAllProducts();
                setProducts(response);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map(product => (
                    <div className="col-sm-4 mb-3" key={product.id}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;