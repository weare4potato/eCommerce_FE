import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByShop } from '../../api/ProductApi';
import ProductCard from './ProductCard';

function ProductsByShopsList() {
    const { shopId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Fetching products for shop ID:', shopId);
                const response = await getProductsByShop(shopId, currentPage - 1, size);

                if (response && response.content&& response.totalPages) {
                    console.log('Setting products:', response.content);
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
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
    }, [shopId,currentPage, size]);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="container mt-4">
            <div className="row">
                {products.map((product) => (
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

export default ProductsByShopsList;