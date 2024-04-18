import React from "react";
import {useNavigate} from "react-router-dom";
import {deleteReceiver} from "../../api/ReceiverApi";


function ReceiverCard(data) {
    const navigate = useNavigate();
    const address = data.receiver.city + " "
        + data.receiver.street + " "
        + data.receiver.zipcode + " "
        + data.receiver.detail + " ";

    const goToUpdate = () => {
        navigate(`/receiver/${data.receiver.id}`);
    }

    const deleteAction = async () => {
        await deleteReceiver(data.receiver.id);
        window.location.reload();
    }

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title">이름 : {data.receiver.name}</p>
                <p className="card-text">별명 : {data.receiver.addressName}</p>
                <p className="card-text">주소지 : {address}</p>
                <p className="card-text">전화번호 : {data.receiver.phone}</p>
                <button onClick={deleteAction}>삭제</button>
                <button onClick= {goToUpdate}>수정</button>
            </div>
        </div>
    )
}

export default ReceiverCard;