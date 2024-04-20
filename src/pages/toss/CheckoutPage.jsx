import React, {useEffect, useRef, useState} from "react";
import {loadPaymentWidget} from "@tosspayments/payment-widget-sdk";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../axios/api";

const selector = "#payment-widget";

const clientKey = process.env.REACT_APP_CLIENT_KEY;
const customerKey = "mJ3orpAqVfMzA0fNqK6T-";

function CheckoutPage() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(0);
  const {orderId} = useParams();
  const [order, setOrder] = useState(null);
  const {navigate} = useNavigate();

  useEffect(() => {
    // orderId를 기반으로 주문 정보를 가져오는 로직
    fetchOrder();
  }, [orderId]);


  const fetchOrder = async () => {
    // orderId를 기반으로 서버에서 주문 정보 가져오기
    try {
      const response = await api.get(`/api/v1/orders/${orderId}`); // 적절한 엔드포인트를 사용하세요
      setOrder(response.data);
      setPrice(response.data.totalAmount);
    } catch (error) {
      console.error('주문 정보를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(clientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
    }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        { value: price },
        { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const getOrderName = () => {
    if(order.historyInfos.length > 1){
      return order.historyInfos[0].product.name + '외 ' + (order.historyInfos.length - 1) + '건 결제';
    }
    return order.historyInfos[0].product.name
  }

  const handlePaymentRequest = async () => {
    // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try{
      await paymentWidget?.requestPayment({
        orderId: order.orderNum,
        orderName: getOrderName(),
        customerName: order.member.username,
        customerEmail: order.member.email,
        customerMobilePhone: order.member.phone,
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });

    } catch (error) {
      console.error("결제 요청 실패:", error)
    }
  };
  return (
      <div className="wrapper">
        <div className="box_section">
          {/* 결제 UI, 이용약관 UI 영역 */}
          <div id="payment-widget" />
          <div id="agreement" />
          <div style={{ paddingLeft: "24px" }}>
            {/* 할인 쿠폰 */}
            <div className="checkable typography--p">
              <label
                  htmlFor="coupon-box"
                  className="checkable__label typography--regular"
              >
                <input
                    id="coupon-box"
                    className="checkable__input"
                    type="checkbox"
                    aria-checked="true"
                    onChange={(event) => {
                      setPrice(
                          event.target.checked ? price - 5_000 : price + 5_000
                      );
                    }}
                />
                <span className="checkable__label-text">5,000원 쿠폰 적용</span>
              </label>
            </div>
          </div>
          <div className="result wrapper">
            {/* 결제하기 버튼 */}
            <button
                className="button"
                style={{ marginTop: "30px" }}
                onClick={handlePaymentRequest}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
  );
}

export default CheckoutPage;
