import React, {useState, useEffect} from 'react';
import {fetchStoreProducts} from '../../api/StoreApi';
import {useNavigate} from 'react-router-dom';
import {deleteProduct} from "../../api/ProductApi";

const ShopsByProducts = ({token}) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchStoreProducts(currentPage - 1, size);

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

        getProducts();
    }, [currentPage, size]);

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

    const handleManage = (productId) => {
        navigate(`/updateProduct/${productId}`);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('상품을 삭제 하시겠습니까?')) {
            try {
                await deleteProduct(productId, token);
                setProducts(currentProducts => currentProducts.filter(product => product.productId !== productId));
                alert('상품 삭제 성공');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('상품 삭제 실패');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    {products.length > 0 ? (
                        <div className="d-flex flex-column align-items-center">
                            {products.map(product => (
                                <div key={product.productId} className="card mb-3" style={{width: '100%'}}>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">가격: {product.price}원</h6>
                                        <p className="card-text">재고: {product.stock}개</p>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => handleManage(product.productId)}
                                        >
                                            관리
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(product.productId)}
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