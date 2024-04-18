import React, {useState} from "react";
import styled from "styled-components";
import {storeSignUp} from "../../api/StoreApi";
import {createBusinessNumber} from "../../api/RevenueApi";
import {useNavigate} from "react-router-dom";

function dataParse(data) {
    const jsonString = JSON.stringify(data);
    const parsedObj = JSON.parse(jsonString);
    return parsedObj.message;
}


function StoreSignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validatePassword, setValidatePassword] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();

        const storeData = {
            email: email,
            password: password,
            validatePassword: validatePassword,
            name: name,
            description: description,
            phone: phone,
            businessNumber: businessNumber,
        };

        try {
            await storeSignUp(storeData);
            navigate("/")

        } catch (error) {
            alert(dataParse(error.response.data));
        }
    }

    const getBusinessNumber = async () => {
        try {

            const data = await createBusinessNumber();
            const jsonString = JSON.stringify(data);
            const parsedObj = JSON.parse(jsonString);

            alert(parsedObj.number);

        } catch (error) {
            alert(dataParse(error.response.data));
        }
    }


    return (
        <StyledContainer>
            <SignUpContainer>
                <h1>SignUp</h1>
                <div className="signup-form">
                    <form onSubmit={signUp}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">이메일</span>
                            <input type="text" className="form-control" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder="이메일" aria-label="Username"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">비밀번호</span>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder="비밀번호" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">비밀번호 재확인</span>
                            <input type="password" className="form-control" value={validatePassword}
                                   onChange={(e) => setValidatePassword(e.target.value)}
                                   placeholder="비밀번호 재확인" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">상점 이름</span>
                            <input type="text" className="form-control" value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="상점 이름" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">상점 설명</span>
                            <input type="text" className="form-control" value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   placeholder="상점 설명" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">전화번호</span>
                            <input type="text" className="form-control" value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                                   placeholder="전화 번호" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">사업자 등록 번호</span>
                            <input type="text" className="form-control" value={businessNumber}
                                   onChange={(e) => setBusinessNumber(e.target.value)}
                                   placeholder="사업자 등록 번호" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                            <button type={"button"} onClick={getBusinessNumber} className="btn btn-primary">발급</button>
                        </div>
                        <div className="group">
                            <StyledInput className="btn btn-primary" type="submit" value="회원가입"/>
                        </div>
                    </form>
                </div>
            </SignUpContainer>
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

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60vh;
    height: 60vh;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
`

const StyledInput = styled.input`
    width: 100%;
`

export default StoreSignUpPage;