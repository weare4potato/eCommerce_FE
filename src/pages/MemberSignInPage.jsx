import React from 'react';
import styled from "styled-components";
import {memberSignIn} from "../api/MemberLogin";
import daumAddress from "./DaumAddress";

function MemberSignInPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const signIn = async (event) => {
        const userData = {email: email, password: password}
        try {
            event.preventDefault();
            await memberSignIn(userData);

        }catch (e){
            console.error(e);
        }


    }

    return (
        <StyledContainer>
            <SignInContainer>
                <h1>SignIn</h1>
                <div className="signup-form">
                    <form onSubmit={signIn}>
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
                        <div className="group">
                            <StyledInput className="btn btn-primary" onSubmit={signIn} type="submit" value="Sing in"/>
                        </div>
                    </form>
                </div>
            </SignInContainer>
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

const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 50vh;
    margin: auto;
    border-radius: 1px;
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .24), 0 17px 50px 0 rgba(0, 0, 0, .19);
`

const StyledInput = styled.input`
    width: 100%;
`

export default MemberSignInPage