import styled from "styled-components";
import Challengers from "./Challenger";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

function Body() {

    const userId = "user1"

    const { challengeId } = useParams();
    
    const challenge = Challengers[userId][0].challenges[0][challengeId][0];

    const basicView = challenge.steps.find(step => step.complete === false) || [];
    

    const [clickedStep, setClickedStep] = useState([]);
    const [stepTitle, setStepTitle] = useState();
    const [toDo, setToDo] = useState(basicView.days.find(day => day.complete === false));
    const [Clicked, setClicked] = useState(false);
    const [modal, setModal] = useState(false);
    const [test, setTest] = useState(basicView.test)

    const ChangeStep = (step) => {
        setClickedStep(step.days);
        setStepTitle(step.step);
        setClicked(true);
        setTest(step.test)
    };

    const ChangeTodo = (day) => {
        setToDo(day);
    };

    const ModalOpen = () => {
        setModal(true);
    }

    const ModalClose = () => {
        setModal(false);
    }

    return (
        <Wrapper>
            <StepBar>
                {challenge.steps.map((step) => (
                    <Step key={step.step} onClick={() => ChangeStep(step)}>
                        {!step.complete ? `${step.step} 단계` : "완료!"}
                    </Step>
                ))}
            </StepBar>
            <Main>
                <StepWrapper>
                    <StepSubWrapper>
                        <StepTitle>
                        {!Clicked ? basicView.step : stepTitle} 단계
                        </StepTitle>
                        {!Clicked ? basicView.days.map((day) => (
                            <DayButton key={day.day} onClick={() => ChangeTodo(day)}>
                                <Day>{day.day} 일차</Day>
                                <DayComplete>{!day.complete ? "미완료😶" : "완료😎"}</DayComplete>
                            </DayButton>
                        )) :
                            clickedStep.map((day) => (
                                <DayButton key={day.day} onClick={() => ChangeTodo(day)} >
                                    <Day>{day.day} day</Day>
                                    <DayComplete>{!day.complete ? "미완료😶" : "완료😎"}</DayComplete>
                                </DayButton>
                            )) 
                        }
                        <FinalTest onClick={ModalOpen}>
                            중간 점검!
                        </FinalTest>
                    </StepSubWrapper>
                </StepWrapper>
                {modal && 
                    <Modal test={test} onClose={ModalClose} />
                }
                <Subject>
                    <ToDoList>
                        <ToDoTitle>오늘의 숙제 📖: {toDo.day} 일차</ToDoTitle>
                        <ToDoSubject>{toDo.subject}</ToDoSubject>
                    </ToDoList>
                    <Memo>
                        <MemoTitle>메모장</MemoTitle>
                        <Form>
                            <TextArea 
                                placeholder="기억해야 할 것을 기록하세요!"
                            />
                        </Form>
                        <MemoButton>저장</MemoButton>
                    </Memo>
                </Subject>
            </Main>
        </Wrapper>
    );
}

export default Body;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
    height: 1000px;
    background: #485563; 
    background: -webkit-linear-gradient(to right, #29323c, #485563); 
    background: linear-gradient(to right, #29323c, #485563); 
`;

const StepBar = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 60px;
    font-size: 30px;
    margin-top: 100px;
`;

const Step = styled.button`
    border: none;
    background-color: #06a7e1;
    border-radius: 40px;
    width: 160px;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

    &:hover {
        background-color: #32b9f8; 
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); 
        transform: translateY(-2px); 
    }

    &:active {
        background-color: #004b6e; /* 클릭 시 배경색 변경 */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 클릭 시 그림자 원래대로 */
        transform: translateY(0); /* 클릭 시 원래 위치로 */
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 600px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const StepWrapper = styled.div`
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StepSubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 20px;
    gap: 30px;
    border: 4px solid #bb64e0;
    background-color: #e5b5fa4c;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`;

const StepTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
    color: white;
`;

const DayButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: none;
    background-color: #efd0fc;
    border: 3px solid #9805d7;
    height: 60px;
    width: 80%;
    cursor: pointer;
    &:hover {
        background-color: #e0a4fa; /* 호버 시 배경색 변경 */
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 변경 */
        transform: translateY(-2px); /* 호버 시 살짝 위로 이동 */
    }
`;

const Day = styled.h2`
    font-size: 15px;
    font-weight: 600;
    color: #220522;
`

const DayComplete = styled.p`
`

const FinalTest = styled.button``;

const Subject = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 90%;
    gap: 30px;
`;

const ToDoList = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
`;

const ToDoTitle = styled.h1`
    font-size: 25px;
    font-weight: 600;
    color: beige;
    margin-bottom: 20px;
`;

const ToDoSubject = styled.p`
    font-size: 35px;
    color: #ffffffc2;
    font-weight: 600;
    background: #73C8A9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #373B44, #73C8A9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #373B44, #73C8A9);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding: 10px;
    border-radius: 7px;
`;

const Memo = styled.div`
    width: 70%;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const MemoTitle = styled.h1`
    color: white;
    font-size: 30px;
    font-weight: 600;
    padding: 20px;
`;

const MemoButton = styled.button`
    border: 3px solid green;
    width: 30%;
    height: 35px;;
    background-color: #26bd26;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #4dcf4d;
    }
`;

const Form = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TextArea = styled.textarea`
    resize: none;
    border: none;
    border-radius: 20px;
    height: 200px;
    padding: 10px;
    &:focus {
        border: 2px solid skyblue;
    }
    background-color: #ffffff45;
    &::placeholder {
        color: white;
    }
`;
