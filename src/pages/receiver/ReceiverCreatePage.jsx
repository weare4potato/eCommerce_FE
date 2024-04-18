import React, {useState} from "react";
import {createReceiver} from "../../api/ReceiverApi";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import DaumPostcode from "react-daum-postcode"
import Modal from "bootstrap/js/src/modal";

function ReceiverCreatePage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [addressName, setAddressName] = useState("");
    const [detail, setDetail] = useState("");
    const [isDaumModal, setIsDaumModal] = useState(false);
    const [addressData, setAddressData] = useState("");

    const create = async (e) => {
        e.preventDefault();
        const receiverData = {
            name: name,
            phone: phone,
            city: city,
            street: street,
            zipcode: zipcode,
            addressName: addressName,
            detail: detail,
        }
        try {
            await createReceiver(receiverData);
            navigate("/receiver")
        } catch (error) {

        }

    }

    const handleComplete = (data) => {

        const sido = data.sido;
        const sigungu = data.sigungu;
        const roadAddress = data.roadAddress.split(" ").slice(3).join(" ");
        const zonecode = data.zonecode;


        setCity(sido + " " + sigungu)
        setStreet(roadAddress)
        setZipcode(zonecode)

        setAddressData(sido + " " + sigungu + " " + roadAddress + " " + zonecode)
    }

    return (
        <StyledContainer>
            <h1>주소지 등록</h1>
            <div className="signup-form">
                <form onSubmit={create}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">받는 사람</span>
                        <input type="text" className="form-control" value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder="받는 사람" aria-label="Username"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">전화번호</span>
                        <input type="text" className="form-control" value={phone}
                               onChange={(e) => setPhone(e.target.value)}
                               placeholder="전화번호" aria-label="text"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">주소</span>
                        <input type="text" className="form-control" value={addressData}
                               onClick={(e) => setIsDaumModal(true)}
                               placeholder="주소" aria-label="text"
                               aria-describedby="basic-addon1"/>
                        {isDaumModal && <DaumPostcode onComplete={handleComplete}/>}
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">상세 주소</span>
                        <input type="text" className="form-control" value={detail}
                               onChange={(e) => setDetail(e.target.value)}
                               placeholder="상세주소" aria-label="Password"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">주소지 별명</span>
                        <input type="text" className="form-control" value={addressName}
                               onChange={(e) => setAddressName(e.target.value)}
                               placeholder="주소지 별명" aria-label="Password"
                               aria-describedby="basic-addon1">
                        </input>
                    </div>
                    <div className="group">
                        <StyledInput className="btn btn-primary" type="submit" value="수정"/>
                    </div>
                </form>
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50vh;
    height: 100vh;
    margin: auto;

`;

const StyledInput = styled.input`
    width: 100%;
`;

export default ReceiverCreatePage