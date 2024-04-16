import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../api/ProductApi';
import styled from 'styled-components';

const ProductDetails = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const details = await getProductDetails(productId);
                setProductDetails(details);
            } catch (error) {
                console.error('상품 상세 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!productDetails) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="card mb-3">
                <div className="card-body">
                    <ol className="breadcrumb">
                        {productDetails.oneDepthDescription} > {productDetails.twoDepthDescription} > {productDetails.threeDepthDescription}
                    </ol>
                    <h5 className="card-title">{productDetails.productName}</h5>
                    <p className="card-text">{productDetails.price}원</p>
                </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary me-2">장바구니 담기</button>
                <button className="btn btn-secondary">바로 구매</button>
            </div>
            <ProductDetailsTitle>
                <TitleText>상세정보</TitleText>
            </ProductDetailsTitle>
            <div className="product-description">
                <p>{productDetails.description}</p>
            </div>
        </div>
    );
};

const ProductDetailsTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TitleText = styled.h6`
  margin: 0;
`;


export default ProductDetails;