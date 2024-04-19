import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {createOrder, getMember, getTotalAmount} from "../../api/OrderApi";
import {getReceivers} from "../../api/ReceiverApi";

const MainButton = ({ onClick }) => (
    <button onClick={onClick}>배송지 변경</button>
);

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
  const [totalAmount, setTotalAmount] = useState(0);
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    fetchMember();
  }, []);

  useEffect(() => {
    fetchReceiver();
  }, []);

  useEffect(() => {
    getTotalAmount(state)
    .then(totalAmountData => {
      setTotalAmount(totalAmountData);
    })
    .catch(error => {
    });
  }, []);

  const fetchMember = async () => {
    let memberData = await getMember();
    setMember(memberData);
  };

  const fetchReceiver = async () => {
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
        receiverId: 1,
        // selectedReceiver.id
        type: "CARD",
        totalAmount: totalAmount,
        orderProducts: state
      }
      let OrderRes = await createOrder(orderData)
      navigate(`/orders/${OrderRes.id}/payment/toss`)
    } else {
      alert('배송지를 선택해 주세요');
    }
  }

  const handleCancel = () => {
    // Cart 페이지로 이동
    navigate('/');
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
                  <p>배송주소 : {selectedReceiver.city} {selectedReceiver.street}{selectedReceiver.zipcode}</p>
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

