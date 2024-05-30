import styled from "styled-components";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useState } from "react";

function Modal({ test, onClose }) {
    const { handleSubmit, register, getValues } = useForm();
    const [completed, setCompleted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const correctAnswers = test.map(item => item.answer);

    const onSubmit = () => {
        const answers = getValues();
        const formattedAnswers = Object.keys(answers).map(key => answers[key]);
        setUserAnswers(formattedAnswers);
        setCompleted(true);
    };

    // 맞춘 문제 수를 계산하는 함수
    const calculateCorrectAnswers = () => {
        return userAnswers.reduce((count, answer, index) => (
            answer === correctAnswers[index] ? count + 1 : count
        ), 0);
    };

    // 틀린 문제와 정답을 반환하는 함수
    const getIncorrectAnswers = () => {
        return userAnswers.map((answer, index) => ({
            question: test[index].question,
            userAnswer: answer,
            correctAnswer: correctAnswers[index],
            isCorrect: answer === correctAnswers[index],
        }));
    };

    // 맞춘 문제 수
    const correctCount = completed ? calculateCorrectAnswers() : 0;
    // 총 문제 수
    const totalCount = correctAnswers.length;
    // 틀린 문제와 정답
    const incorrectAnswers = completed ? getIncorrectAnswers() : [];

    // 페이지 이동 함수
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, test.length - 1));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    return (
        <Wrapper onClick={onClose}>
            {!completed ?
                <TestWrapper onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit(onSubmit)}>
                    <PaginationInfo>
                        문제 {currentPage + 1} / {test.length}
                    </PaginationInfo>
                    <Test key={test[currentPage].id}>
                        <Question>{test[currentPage].id}. {test[currentPage].question}</Question>
                        {[test[currentPage].item1, test[currentPage].item2, test[currentPage].item3, test[currentPage].item4].map((item, idx) => (
                            <Label key={idx} htmlFor={`item${idx + 1}-${test[currentPage].id}`}>
                                <Item
                                    id={`item${idx + 1}-${test[currentPage].id}`}
                                    name={`answer${test[currentPage].id}`}
                                    type="radio"
                                    value={item}
                                    {...register(`answer${test[currentPage].id}`, { required: "선택한 항목이 없습니다." })}
                                />
                                {item}
                            </Label>
                        ))}
                    </Test>
                    <ButtonWrapper>
                        <button type="button" onClick={handlePrev} disabled={currentPage === 0}>
                            Previous
                        </button>
                        {currentPage === test.length - 1 ? (
                            <button type='submit'>Submit</button>
                        ) : (
                            <button type="button" onClick={handleNext}>
                                Next
                            </button>
                        )}
                    </ButtonWrapper>
                </TestWrapper>
                :
                <Result>
                    <h2>퀴즈 결과</h2>
                    <p>
                        {totalCount}문제 중 {correctCount}문제 맞춤
                    </p>
                    <h3>틀린 문제</h3>
                    <ul>
                        {incorrectAnswers.map((item, index) => (
                            !item.isCorrect && (
                                <li key={index}>
                                    <p>질문: {item.question}</p>
                                    <p>내 답: {item.userAnswer}</p>
                                    <p>정답: {item.correctAnswer}</p>
                                </li>
                            )
                        ))}
                    </ul>
                </Result>
            }
        </Wrapper>
    );
}

export default Modal;

Modal.propTypes = {
    test: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    border: 1px solid black;
    inset: 0px;
    background-color: #ffffff1c;
`;

const TestWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: white;
    width: 50%;
    height: auto;
    padding: 20px;
    border: 4px solid black;
`;

const Test = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Question = styled.div``;

const Item = styled.input``;

const Label = styled.label`
    cursor: pointer;
    &:hover {
        font-weight: 900;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Result = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: white;
    width: 50%;
    height: auto;
    padding: 20px;
    border: 4px solid black;
`;

const PaginationInfo = styled.div`
    align-self: flex-start;
    margin-bottom: -20px;
    font-weight: bold;
`;
