import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const response = await fetch("/api/v1/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        // 결제 실패 비즈니스 로직을 구현하세요.
        navigate(`/fail`);
        return;
      }

      // 결제 성공 비즈니스 로직을 구현하세요.
    }
    confirm();
  }, []);

  return (
      <div className="result wrapper">
        <div className="box_section">
          <h2>
            결제 성공
          </h2>
          <p>{`주문번호: ${searchParams.get("orderId")}`}</p>
          <p>{`결제 금액: ${Number(
              searchParams.get("amount")
          ).toLocaleString()}원`}</p>
          <p>{`paymentKey: ${searchParams.get("paymentKey")}`}</p>
        </div>
        <ButtonGroup>
          <button onClick={() => navigate('/orders')} className="btn btn-primary">주문 목록으로</button>
          <button onClick={() => navigate('/')} className="btn btn-secondary">메인 페이지로</button>
        </ButtonGroup>
      </div>
  );
}

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
`;

export default SuccessPage;