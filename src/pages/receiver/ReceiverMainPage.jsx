import styled from "styled-components";
import {getReceivers} from "../../api/ReceiverApi";
import React, {useState} from "react";
import ReceiverCard from "../../components/receiver/ReceiverCard";

function ReceiverMainPage() {
    const [receivers, setReceivers] = useState([]);

    const getReceiver = async () => {
        let response = await getReceivers();
        setReceivers(response.content)
        console.log(receivers)
    }

    return (
        <StyledContainer>
            <ButtonGroup>
                <button type="button">주소 등록</button>
            </ButtonGroup>
            <StyledContentContainer>
                {receivers.map(receiver => (
                    <div className="col-sm-4 mb-3" key={receiver.id}>
                        <ReceiverCard Receiver={receiver}/>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vh;
    height: 100vh;
    margin: auto;
    border: 2px solid black;
    border-radius: 10px;
`

const ButtonGroup = styled.div`
    width: 80vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
`


export default ReceiverMainPage;