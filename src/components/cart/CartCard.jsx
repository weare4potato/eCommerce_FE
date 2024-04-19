import React, {useState} from "react";
import styled from "styled-components";
import {deleteCart} from "../../api/CartApi";

function CartCard({cart, onUpdateQuantity, toggleCheckBox}) {

    const [quantity, setQuantity] = useState(cart.quantity)

    const increment = () => {setQuantity(quantity + 1); onUpdateQuantity(cart.cartId, cart.quantity + 1);};
    const decrement = () => {setQuantity(quantity > 1 ? quantity - 1 : 1); onUpdateQuantity(cart.cartId, cart.quantity > 1 ? cart.quantity - 1 : 1);};

    const deleteAction = async () => {
        await deleteCart(cart.cartId);
        window.location.reload();
    }

    const checkBox = () => {toggleCheckBox(cart.cartId);}

    return (
        <div className="card">
            <div className="card-body">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={checkBox} checked = {cart.isSelected}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">선택</label>
                </div>
                <p className="card-title">상품명 : {cart.productName}</p>
                <p className="card-text">가격 : {cart.productPrice}</p>
                <p className="card-text">수량 : {quantity}</p>
                <IncrementDecrementButton onClick={increment}>+</IncrementDecrementButton>
                <IncrementDecrementButton onClick={decrement}>-</IncrementDecrementButton>
                <IncrementDecrementButton onClick={deleteAction}>삭제</IncrementDecrementButton>
            </div>
        </div>
    )
}

const IncrementDecrementButton = styled.button`
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    margin: 0;

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

export default CartCard;