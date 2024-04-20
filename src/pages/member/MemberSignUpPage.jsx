import React, {useState} from "react";
import styled from "styled-components";
import {memberSignUp} from "../../api/MemberApi";
import {useNavigate} from "react-router-dom";

function dataParse(data) {
    const jsonString = JSON.stringify(data);
    const parsedObj = JSON.parse(jsonString);
    return parsedObj.message;
}

function MemberSignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password,
            username: username,
            phone: phone
        };
        try {
            navigate('/')
            await memberSignUp(userData);
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
                                   placeholder="Username" aria-label="Username"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">비밀번호</span>
                            <input type="password" className="form-control" value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder="Password" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">닉네임</span>
                            <input type="text" className="form-control" value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   placeholder="username" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">핸드폰</span>
                            <input type="text" className="form-control" value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                                   placeholder="ex) 01012341234" aria-label="Password"
                                   aria-describedby="basic-addon1"/>
                        </div>
                        <div className="group">
                            <p>이메일 인증 후 로그인이 가능합니다.</p>
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
    width: 80%;
    height: 50vh;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
`

const StyledInput = styled.input`
    width: 100%;
`

export default MemberSignUpPage;