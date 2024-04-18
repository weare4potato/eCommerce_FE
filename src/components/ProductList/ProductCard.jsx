import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    console.log('Product in card:', product);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('ProductCard rendering with product:', product);
    }, [product]);

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className="card" style={{ width: '18rem' }} onClick={handleCardClick}>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}원</p>
            </div>
        </div>
    );
}

export default ProductCard;