import styled from "styled-components";
import stepsData from "./Step";
import { useState } from "react";

function Body() {

    const [selected, setSelected] = useState([]);
    const [click, setClick] = useState(false);
    const [title, setTitle] = useState("")
    const [daySelected, setDaySelected] = useState([]);

    const { steps } = stepsData;

    const firstIncompleteStep = steps.find(step => step.status === false)?.days || [];

    const firstIncompleteStepData = steps.find(step => step.status === false) || [];

    const dayBarClick = (days) => {
        setSelected(days.days);
        setClick(true);
        setTitle(days.step)
    };

    const dayButtonClick = (step) => {
        setDaySelected(step.description)
        console.log(daySelected)
    }

    return (
        <Wrapper>
            <StepBar>
                {steps.map((step) => (
                    <Step key={step.step} onClick={() => dayBarClick(step)}>
                        {!step.status ? `Step ${step.step}` : `Complete!`}
                    </Step>
                ))}
            </StepBar>
            <Main>
                <StepWrapper>
                    <StepSubWrapper>
                        <StepTitle>
                        {!click ? `Step ${firstIncompleteStepData.step}` : `Step ${title}`}
                        </StepTitle>
                        {!click ? firstIncompleteStep.map((day) => (
                            <DayButton key={day.day} onClick={() => dayButtonClick(day)}>
                                <div>{day.day} day</div>
                                <div>{!day.status ? "미완료" : "완료"}</div>
                            </DayButton>
                        )) : selected.map((day) => (
                            <DayButton key={day.day} onClick={() => dayButtonClick(day)}>
                                <div>{day.day} day</div>
                                <div>{!day.status ? "미완료" : "완료"}</div>
                            </DayButton>
                        ))}
                        <FinalTest>
                            중간 점검!
                        </FinalTest>
                    </StepSubWrapper>
                </StepWrapper>
                <Subject>
                    <ToDoList>
                        <h1>ToDo List</h1>
                        {daySelected}
                    </ToDoList>
                    <Memo>
                        <div>메모장</div>
                        <Form>
                            <TextArea 
                                placeholder="기억해야 할 것을 기록하세요!"
                            />
                        </Form>
                        <button>저장</button>
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
    margin-top: 100px;
    gap: 60px;
    height: 1000px;
`;

const StepBar = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    gap: 60px;
    font-size: 30px;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */

    &:hover {
        background-color: #32b9f8; /* 호버 시 배경색 변경 */
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 변경 */
        transform: translateY(-2px); /* 호버 시 살짝 위로 이동 */
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
    background-color: #e5b2fb34;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`;

const StepTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
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

const FinalTest = styled.button``;

const Subject = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    gap: 30px;
`;

const ToDoList = styled.div`
    border: 1px solid black;
    width: 70%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Memo = styled.div`
    border: 1px solid black;
    width: 70%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
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
`;
