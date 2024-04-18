import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {createOrder, getMember, getTotalAmount} from "../../api/OrderApi";
import {getReceivers} from "../../api/ReceiverApi";

// MainButton 컴포넌트: 배송지 변경 버튼
const MainButton = ({ onClick }) => (
    <button onClick={onClick}>배송지 변경</button>
);

// DropdownMenu 컴포넌트: 드롭다운 메뉴
const DropdownMenu = ({ receivers, onSelectReceiver }) => (
    <div className="receiver-list">
      <h4>수령자 목록</h4>
      <ul>
        {receivers.map(receiver => (
            <li key={receiver.id} onClick={() => onSelectReceiver(receiver)}>
              {receiver.name}
            </li>
        ))}
      </ul>
    </div>
);

function OrderComponent() {
  const navigate = useNavigate();
  const [member, setMember] = useState({});
  const [receivers, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const [productDetails, setProductDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [] = useParams();

  console.log(receivers);
  useEffect(() => {
    // orderId를 기반으로 주문 정보를 가져오는 로직
    fetchMember();
  }, []);

  useEffect(() => {
    // orderId를 기반으로 주문 정보를 가져오는 로직
    fetchReceiver();
  }, []);

  useEffect(() => {
    getTotalAmount(productDetails)
    .then(totalAmountData => {
      setTotalAmount(totalAmountData);
    })
    .catch(error => {
      // 에러 처리
    });
  }, []);

  const fetchMember = async () => {
    // orderId를 기반으로 서버에서 주문 정보 가져오기
    let memberData = await getMember();
    setMember(memberData);
  };

  const fetchReceiver = async () => {
    // orderId를 기반으로 서버에서 주문 정보 가져오기
    let receiversData = await getReceivers();
    setReceivers(receiversData);
  };

  const handleReceiverChange = (receiver) => {
    setSelectedReceiver(receiver);
    setIsDropdownOpen(false); // 선택 후 드롭다운을 닫음
  };

  const  handlePayment = async () => {
    if (selectedReceiver !== null) {
      let orderData = {
        memberId: member.id,
        receiverId: selectedReceiver.id,
        type: "SAMPLE1",
        totalAmount: totalAmount,
        orderProducts: productDetails
      }
      let OrderRes = await createOrder(orderData)
      navigate(`/orders/${OrderRes.id}/payment/toss`)
    } else {
      console.error('배송지를 선택해 주세요');
    }
  }

  const handleCancel = () => {
    // Cart 페이지로 이동
    navigate('/'); // 어디로?
  };

  return (
      <div className="App">
        <div className="title">
          <h4>주문/결제</h4>
        </div>
        <div className="member">
          <h4>구매자정보</h4>
          <div className="box">
            <p>이름 : {member.username}</p>
            <p>이메일 : {member.email}</p>
            <p>휴대폰 번호 : {member.phone}</p>
          </div>
        </div>
        <div className="receiver">
          {/* 배송지 변경 버튼 */}
          <MainButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}/>
          <h4>받는사람정보</h4>
          <div className="box">
            {selectedReceiver && (
                <>
                  <p>이름 : {selectedReceiver.name}</p>
                  <p>배송주소 : {selectedReceiver.address}</p>
                  <p>연락처 : {selectedReceiver.phone}</p>
                </>
            )}
          </div>
          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
              <DropdownMenu receivers={receivers}
                            onSelectReceiver={handleReceiverChange}/>
          )}
        </div>
        <div className="orderDetails">
          <h4>결제정보</h4>
          <div className="box">
            <p>총상품가격 : {totalAmount}</p>
            <p>총결제금액 : {totalAmount}</p>
          </div>
        </div>
        <button onClick={handleCancel}>취소하기</button>
        <button onClick={handlePayment}>결제하기</button>
      </div>
  )
}

export default OrderComponent;

