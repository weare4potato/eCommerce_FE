import React, { useState, useEffect } from 'react';
import { fetchStoreProducts } from '../../api/StoreApi'; // adjust the import path as necessary

const ShopsByProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const getProducts = async () => {
            try {
                console.log('Current page:', currentPage); // Log the current page
                console.log('Size:', size); // Log the size

                const response = await fetchStoreProducts(currentPage - 1, size);

                if (response && response.content && response.totalPages) {
                setProducts(response.content);
                setTotalPages(response.totalPages);
            } else {
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        getProducts();
    }, [currentPage, size]);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handleManage = (productId) => {
        // Logic to handle product management
        console.log('Managing product with id:', productId);
        // Redirect to the management page or open a management modal
    };

    const handleDelete = (productId) => {
        // Logic to delete the product
        console.log('Deleting product with id:', productId);
        // Make API call to delete the product and then remove it from the state
        // This could also open a confirmation dialog before deletion
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    {products.length > 0 ? (
                        <div className="d-flex flex-column align-items-center">
                            {products.map(product => (
                                <div key={product.id} className="card mb-3" style={{width: '100%'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">가격: {product.price}원</h6>
                                        <p className="card-text">재고: {product.stock}개</p>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => handleManage(product.id)}
                                        >
                                            관리
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">등록된 상품이 없습니다.</p>
                    )}
                </div>
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
};

export default ShopsByProducts;