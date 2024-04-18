import styled from "styled-components";
import {getReceivers} from "../../api/ReceiverApi";
import React, {useEffect, useState} from "react";
import ReceiverCard from "../../components/receiver/ReceiverCard";
import {useNavigate} from "react-router-dom";


function ReceiverMainPage() {
    const [receivers, setReceivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getReceiver()
    }, []);

    const getReceiver = async () => {
        let response = await getReceivers();
        console.log(response);
        setReceivers(response)
    }

    const goToCreateReceiver = () => {
        navigate('/createReceiver'); // '등록 상품 목록' 페이지로 이동
    };

    return (
        <StyledContainer>
            <ButtonGroup>
                <button type="button" onClick={goToCreateReceiver}>주소 등록</button>
            </ButtonGroup>
                <StyledContentContainer className="row">
                    {receivers && receivers.map((receiver) => (
                        <div key={receiver.id} >
                            <ReceiverCard receiver={receiver}/>
                        </div>
                    ))}
                </StyledContentContainer>
        </StyledContainer>
    )

}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vh;
    height: 100vh;
    margin: auto;
`

const StyledContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 0.5fr);
    grid-template-rows: 0.5fr 1.5fr;
    width: 80vh;
    height: 100vh;
    padding-top: 30px;
    border: 2px solid black;
    border-radius: 10px;
`

const ButtonGroup = styled.div`
    width: 80vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
`


export default ReceiverMainPage;