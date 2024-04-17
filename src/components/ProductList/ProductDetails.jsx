import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getProductDetails} from '../../api/ProductApi';
import styled from 'styled-components';

const ProductDetails = () => {
    const {productId} = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);

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

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value >= 1 ? value : 1);
    };

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const totalAmount = productDetails ? (quantity * productDetails.price) : 0;

    if (!productDetails) return <div>Loading...</div>;

    return (
        <Container>
            <Card>
                <CardBody>
                    <Breadcrumb>
                        {productDetails.oneDepthDescription} > {productDetails.twoDepthDescription} > {productDetails.threeDepthDescription}
                    </Breadcrumb>
                    <CardTitle>{productDetails.productName}</CardTitle>
                    <CardText>{productDetails.price}원</CardText>
                </CardBody>
            </Card>
            <QuantityAndButtonsContainer>
                <TotalAmountContainer>
                    총 금액: {totalAmount}원
                </TotalAmountContainer>
                <CounterContainer>
                    <QuantityInput type="number" value={quantity} onChange={handleQuantityChange}/>
                    <IncrementDecrementButton onClick={increment}>+</IncrementDecrementButton>
                    <IncrementDecrementButton onClick={decrement}>-</IncrementDecrementButton>
                </CounterContainer>
                <ActionButton className="btn btn-primary me-2">장바구니 담기</ActionButton>
                <ActionButton className="btn btn-secondary">바로 구매</ActionButton>
            </QuantityAndButtonsContainer>
            <ProductDetailsTitle>
                <TitleText>상세정보</TitleText>
            </ProductDetailsTitle>
            <ProductDescription>{productDetails.description}</ProductDescription>
        </Container>
    );
};

const TotalAmountContainer = styled.div`
    text-align: right;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`;


const Container = styled.div`
    margin-top: 4rem;
    width: 100%;
`;

const Card = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 50%;
    margin: auto;
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Breadcrumb = styled.ol`
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 15px;
`;

const CardTitle = styled.h5`
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

const CardText = styled.p`
    font-size: 18px;
    color: #333;
`;

const QuantityAndButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    width: 75%;
    margin-right: 50px;
    margin-top: 30px;
`;

const CounterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem; // 장바구니 담기 버튼과의 간격
`;

const QuantityInput = styled.input`
    width: 3rem; // 인풋 창의 너비를 설정합니다.
    height: 2.5rem; // 인풋 창의 높이를 높입니다.
    text-align: center;
    border: 1px solid #dee2e6;
    line-height: 1.5;
    font-size: 1rem; // 폰트 크기를 조정할 수 있습니다.
    // 인풋 창의 내부 스핀 버튼 숨기기
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    &:focus {
        outline: none;
    }
`;

const ActionButton = styled.button`
    padding: 0.5rem 1rem; // 버튼의 패딩을 조절합니다.
    border: none;
    color: #fff;
    background-color: #007bff;
    border-radius: 0.25rem;
    margin-left: 0.5rem; // 버튼 사이의 간격을 조절합니다.
    &:hover {
        background-color: #0069d9;
    }
`;

const IncrementDecrementButton = styled.button`
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.5rem; // 여기서는 버튼의 크기를 조절합니다.
    margin: 0; // 버튼 사이의 간격을 제거합니다.
    &:hover {
        background-color: #e9ecef;
    }
    &:first-child {
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }
    &:last-child {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }
`;




const ProductDetailsTitle = styled.div`
    display: block;
    width: 100%;
    background-color: #f5f5f5;
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
`;

const TitleText = styled.h6`
    margin: 0;
`;

const ProductDescription = styled.div`
    font-size: 16px;
    color: #666;
    line-height: 1.5;
`;


export default ProductDetails;