import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="card" style={{ width: '18rem' }} onClick={handleCardClick}>
            <div className="card-body">
                <img src = {product.url} alt={product.name} />
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}원</p>
            </div>
        </div>
    );
}

export default ProductCard;