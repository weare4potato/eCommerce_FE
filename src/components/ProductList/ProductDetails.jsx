import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getProductDetails} from '../../api/ProductApi';
import styled from 'styled-components';

const ProductDetails = () => {
    const { productId } = useParams();
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

    if (!productDetails) return <div>Loading...</div>;

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
                <CounterContainer>
                    <Button onClick={decrement}>-</Button>
                    <QuantityInput type="number" value={quantity} onChange={handleQuantityChange} />
                    <Button onClick={increment}>+</Button>
                </CounterContainer>
                <Button className="btn btn-primary me-2">장바구니 담기</Button>
                <Button className="btn btn-secondary">바로 구매</Button>
            </QuantityAndButtonsContainer>
            <ProductDetailsTitle>
                <TitleText>상세정보</TitleText>
            </ProductDetailsTitle>
            <ProductDescription>{productDetails.description}</ProductDescription>
        </Container>
    );
};


const Container = styled.div`
    margin-top: 4rem;
    width: 100%;
`;

const Card = styled.div`
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 4px 8px rgba(0,0,0,0.1);
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
`;

const CounterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  margin: 0 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
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