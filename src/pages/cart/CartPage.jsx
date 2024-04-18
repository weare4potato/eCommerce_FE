import React, {useEffect, useState} from "react";
import {getCarts} from "../../api/CartApi";
import styled from "styled-components";
import CartCard from "../../components/cart/CartCard";
import {getProductDetails} from "../../api/ProductApi";
import {useNavigate} from "react-router-dom";


function dataParse(data) {
    const jsonString = JSON.stringify(data);
    const parsedObj = JSON.parse(jsonString);
    return parsedObj.message;
}

function CartPage() {
    const navigate = useNavigate();
    const state = useState()
    const [cartData, setCartData] = useState([])
    const [productData, setProductData] = useState([])
    const [combinedData, setCombinedData] = useState([])

    useEffect(() => {
        getCartData()
    }, [])

    const getCartData = async () => {
        try {
            let data = await getCarts();
            setCartData(data)
            getProductData(data)
        } catch (error) {
            console.log(dataParse(error))
        }
    }

    const getProductData = async (data) => {
        try {
            const productIds = data.map(cart => cart.productId);
            const products = await Promise.all(productIds.map(getProductDetails));
            console.log(products)
            setProductData(products);
        } catch (error) {
            console.log("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        const combinedData = cartData.map(cartItem => {
            const productItem = productData.find(product => product.productId === cartItem.productId);
            if (!productItem) { // productItem이 undefined인 경우를 처리합니다.
                return null; // 또는 적절한 기본값을 반환할 수 있습니다.
            }
            return {
                cartId: cartItem.cartId,
                productId: cartItem.productId,
                productName: productItem.productName,
                productPrice: productItem.price,
                quantity: cartItem.quantity,
                isSelected: true
            };
        }).filter(item => item);
        setCombinedData(combinedData)
    }, [cartData, productData])

    const handleUpdateQuantity = (cartId, newQuantity) => {
        setCombinedData(prevCartItems => {
            return prevCartItems.map(item => {
                if (item.cartId === cartId) {
                    return {...item, quantity: newQuantity};
                }
                return item;
            });
        });
    };

    const handleUpdateIsSelected = (cartId) => {
        setCombinedData(prevCartItems => {
            return prevCartItems.map(item => {
                if (item.cartId === cartId) {
                    return {...item, isSelected: !item.isSelected};
                }
                return item;
            });
        });
    }

    const totalPrice = combinedData.reduce((acc, item) => {
        let total = acc;
        if(item.isSelected){
            total = total + (item.productPrice * item.quantity)
        }
        return total;
    }, 0);

    const handleBuy = () =>{
        const token = localStorage.getItem("Authorization");

        if(!token){
            navigate("/login");
        }

        const orderData = combinedData.map(item => {

            if(!item.isSelected){
                return null
            }
            return {
                productId: item.productId,
                productPrice : item.productPrice,
                quantity: item.quantity,
            }
        })

        console.log(orderData);
        navigate("/order", {state : orderData})
    }

    return (
        <StyledContainer>
            <StyledCartContainer>
                {combinedData.length === 0 ? (
                    <p align="center"> 장바구니에 상품을 담아주세요</p>
                ) : (
                    combinedData.map((data) => (
                        <div key={data.cartId}>
                            <CartCard onUpdateQuantity={handleUpdateQuantity}
                                      cart={data}
                                      toggleCheckBox={handleUpdateIsSelected}/>
                        </div>
                    )))
                }
            </StyledCartContainer>
            <div>
                <StyledOrderContainer>
                    <h3>총 주문 금액</h3>
                    <h3>{totalPrice}</h3>
                    <StyledInput className="btn btn-primary" type="submit" onClick={handleBuy} value="주문하기"/>
                </StyledOrderContainer>
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 100vh;
    height: 100vh;
    margin: auto;
`

const StyledCartContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 0.8fr);
    grid-template-rows: repeat(auto-fill, minmax(200px, 0.1fr));
    justify-content: center;
    width: 80vh;
    height: 100vh;
    padding-top: 30px;
    border: 2px solid black;
    border-radius: 10px;
`
const StyledOrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50vh;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
`

const StyledInput = styled.input`
    width: 80%;
`


export default CartPage