import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../../api/ProductApi';
import ProductCard from './ProductCard';

function ProductsByCategoryList() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsByCategory(categoryId, currentPage - 1, size);
                if (response && response.content && response.totalPages) {
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('상품을 불러올 수 없습니다.', error);
                setProducts([]);
            }
        };

        fetchProducts();
    }, [categoryId, currentPage, size]);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map(product => (
                    <div className="col-sm-4 mb-3" key={product.id}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                            <a onClick={() => setCurrentPage(number)} className="page-link">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ProductsByCategoryList;