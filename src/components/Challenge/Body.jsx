import styled from "styled-components";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import { userStore } from "../UserStore";
import { AuthApi } from "../UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosLock } from "react-icons/io";

function Body() {

    const navigate = useNavigate();

    const { challengeInfo } = userStore();

    const { challengeId } = useParams();

    const userId = localStorage.getItem('userId')

    const basicView = challengeInfo.steps.find(step => step.complete === false) ? challengeInfo.steps.find(step => step.complete === false) : challengeInfo.steps[challengeInfo.steps.length - 1];
    console.log(basicView)
    const basicTest = basicView.days.find(day => day.test != 0)

    const incompleteDay = basicView.days.find(day => day.complete === false);
    

    const [clickedStep, setClickedStep] = useState(basicView.days);
    const [stepTitle, setStepTitle] = useState(basicView.step);
    const [stepTitleName, setStepTitleName] = useState(basicView.partName)
    const [toDo, setToDo] = useState(incompleteDay ? incompleteDay : basicView.days[basicView.days.length - 1]);
    const [Clicked, setClicked] = useState(false);
    const [modal, setModal] = useState(false);
    const [test, setTest] = useState(basicTest ? basicTest.test : null);
    const [memo, setMemo] = useState();

    const token = localStorage.getItem('token');

    const step = stepTitle;
    const day = toDo.day;

    const ChangeStep = useCallback((step) => {
        setClickedStep(step.days);
        setStepTitle(step.step);
        setStepTitleName(step.partName)
        setClicked(true);
        setTest(step.days.find(day => day.test != 0).test)
    }, []);

    const ChangeTodo = (day) => {
        setToDo(day);
    };

    const ModalOpen = () => {
        if(toDo.test == 0) {
            alert("단계를 완료하셔야 합니다!") 
        } else {
            setModal(true);
        }
    }

    const ModalClose = () => {
        setModal(false);
    }

    const saveMemo = (e) => {
        setMemo(e.target.value);
    }

    const UPDATE = import.meta.env.VITE_CHALLENGE_UPDATE;
    const MEMO = import.meta.env.VITE_CHALLENGE_MEMO;

    const submit = async () => {
        try {
            await Promise.all([
                AuthApi({token}).post(`${UPDATE}${challengeId}/${userId}`, {
                    step,
                    day
                }),
                AuthApi({token}).post(`${MEMO}${challengeId}/${userId}`, {
                    step,
                    day,
                    memo
                })
            ]);
            console.log('Both requests completed successfully');
        } catch (e) {
            console.error('An error occurred:', e);
            navigate('/error', {state: {error: e.message}})
        }
    };

    return (
        <Wrapper>
            <StepBar>
                {challengeInfo.steps.map((step) => (
                    <Step key={step.step} onClick={() => ChangeStep(step)}>
                        {!step.complete ? `${step.step} 단계 🔥` : "완료 🚀"}
                    </Step>
                ))}
            </StepBar>
            <StepName>{stepTitleName}</StepName>
            <Main>
                <StepWrapper>
                    <StepSubWrapper>
                        <StepTitle>
                        {stepTitle} 단계
                        </StepTitle>
                        {!Clicked ? basicView.days.map((day) => (
                            <DayButton key={day.day} onClick={() => ChangeTodo(day)}>
                                <Day>{!day.complete ? day.day + ' 일차' : null} </Day>
                                <DayComplete>{!day.complete ? "😶" : "완료😎"}</DayComplete>
                            </DayButton>
                        )) :
                            clickedStep.map((day) => (
                                <DayButton key={day.day} onClick={() => ChangeTodo(day)} >
                                    <Day>{!day.complete ? day.day + ' 일차'  : null}</Day>
                                    <DayComplete>{!day.complete ? "😶" : "완료😎"}</DayComplete>
                                </DayButton>
                            )) 
                        }
                        <FinalTest onClick={ModalOpen}>
                            {toDo.test != 0 ? '중간 점검!' : <IoIosLock size={30}/>}
                        </FinalTest>
                    </StepSubWrapper>
                </StepWrapper>
                {modal && 
                    <Modal test={test} onClose={ModalClose} challengeId={challengeId} step={step} />
                }
                <Subject>
                    <ToDoList>
                        <ToDoTitle>오늘의 숙제 📖: {toDo.day} 일차</ToDoTitle>
                        <ToDoSubject>
                            {toDo?.sectionList ? toDo.sectionList[0].map((section, idx) => (<span key={idx}>{section}</span>)) : null}
                        </ToDoSubject>
                    </ToDoList>
                    <Memo>
                        <MemoTitle>메모장</MemoTitle>
                        <Form>
                            <TextArea 
                                placeholder={toDo.memo}
                                onChange={saveMemo}
                            />
                        </Form>
                        <form onSubmit={submit}><MemoButton>저장</MemoButton></form>
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
    padding-bottom: 100px;
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
    @media (max-width: 768px) {
        width: 80%;
        gap: 30px;
    }
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
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const StepName = styled.div`
    color: white;
    font-weight: 600;
    font-size: 40px;
    margin-top: 30px;
`;

const Main = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
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
    border-radius: 30px;
    border: none;
    background-color: #b303ff;
    border: 4px solid #c674e9;
    box-shadow: 0 0 20px  rgba(0, 0, 0, 0.2);
    color: lightyellow;
    height: 60px;
    width: 80%;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0px 25px lightpink; /* 호버 시 그림자 변경 */
        transform: translateY(-2px); /* 호버 시 살짝 위로 이동 */
    }
`;

const Day = styled.h2`
    font-size: 15px;
    font-weight: 600;
    color: lightyellow;
`

const DayComplete = styled.p`
font-size: 20px;
font-weight: 600;
`

const FinalTest = styled.button`
    border: 3px solid green;
    width: 100px;
    height: 40px;
    font-size: 15px;
    font-weight: 600;
    background-color: #26bd26;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #4dcf4d;
    }
`;

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

const ToDoSubject = styled.div`
    font-size: 20px;
    color: #ffffffc2;
    font-weight: 600;
    background: #73C8A9;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #373B44, #73C8A9);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #373B44, #73C8A9);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    padding: 30px;
    gap: 15px;
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
    width: 100px;
    height: 40px;
    font-size: 15px;
    font-weight: 600;
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
