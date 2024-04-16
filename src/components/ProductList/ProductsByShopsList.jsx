import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByShop } from '../../api/ProductApi';
import ProductCard from './ProductCard';

function ProductsByShopsList() {
    const { shopId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products for shop ID:', shopId);
                const response = await getProductsByShop(shopId);
                console.log('Response:', response);

                // 여기서 바로 response.content에 접근합니다.
                if (response && response.content) {
                    console.log('Setting products:', response.content);
                    setProducts(response.content);
                } else {
                    console.log('No products found or response format is incorrect.');
                    setProducts([]);
                }
            } catch (error) {
                console.error('Failed to fetch products for shop:', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, [shopId]);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map((product) => (
                    <div className="col-sm-4 mb-3" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsByShopsList;