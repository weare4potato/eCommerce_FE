import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/ProductApi';
import ProductCard from './ProductCard';

function ProductsByCategoryList() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products for category ID:', categoryId); // 카테고리 ID 로그
                const response = await getProductsByCategory(categoryId);
                console.log('Response:', response); // 응답 전체 로그
                if (response && Array.isArray(response.content)) {
                    console.log('Setting products:', response.content); // 설정될 상품 데이터 로그
                    setProducts(response.content);
                } else {
                    setProducts([]);
                    console.log('No products found or response format is incorrect.'); // 데이터 없음 또는 형식 오류 로그
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setProducts([]);  // 에러 발생 시 빈 배열로 초기화
            }
        };

        fetchProducts();
    }, [categoryId]);

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

export default ProductsByCategoryList;