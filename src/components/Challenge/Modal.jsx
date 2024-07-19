import styled from "styled-components";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import { AuthApi } from "../UserApi";

function Modal({ test, onClose, challengeId, step }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerClick = (index) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = index;
        setSelectedAnswers(newSelectedAnswers);
    };

    const handleNext = () => {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < test.length) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            setShowResults(true);
        }
    };

    const handlePrevious = () => {
        const prevIndex = currentQuestionIndex - 1;
        if (prevIndex >= 0) {
            setCurrentQuestionIndex(prevIndex);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setShowResults(false);
    };

    const saveAnswer = useCallback(
        async(wrongQuestions) => {
            const token = sessionStorage.getItem('token');
            const userId = sessionStorage.getItem('userId');
            try {
                await AuthApi({token}).put(`/api/v1/user/challenge/challengePage/wrongQuestion/${userId}/${challengeId}/${step}`, {
                    userId,
                    wrongQuestions,
                    challengeId,
                    step
                })
            } catch (error) {
                console.log(error)
                console.log(Array.isArray(wrongQuestions));
            }
            
        },
        [challengeId, step],
    )

    useEffect(() => {
        if (showResults) {
            const wrongQuestions = test
                .filter((q, index) => selectedAnswers[index] !== q.answer)
                .map((q) => q.testId);
            saveAnswer(wrongQuestions);
        }
    }, [showResults, saveAnswer, selectedAnswers, test]);

    if (showResults) {
        const correctAnswersCount = selectedAnswers.filter((answer, index) => answer === test[index].answer).length;
        const wrongQuestions = test.filter((q, index) => selectedAnswers[index] !== q.answer);
        
        return (
            <Wrapper onClick={onClose}>
                <Container onClick={(e) => e.stopPropagation()}>
                    <Title>Quiz 결과</Title>
                    <Question>{test.length} 문제 중에 {correctAnswersCount} 문제 맞추셨어요!</Question>
                    {wrongQuestions.length === 0 ? (
                        <p>축하합니다!🚀</p>
                    ) : (
                        wrongQuestions.map((q, index) => (
                            <ResultContainer key={q.testId}>
                                <p>{q.num}. {q.question}</p>
                                <p>Your answer: {q[`item${selectedAnswers[index] +1}`]}</p>
                                <p style={{ color: 'red' }}>Correct answer: {q[`item${q.answer}`]}</p>
                            </ResultContainer>
                        ))
                    )}
                    <RestartButton onClick={handleRestart}>Restart Quiz</RestartButton>
                </Container>
            </Wrapper>
        );
    }

    const currentQuestion = test[currentQuestionIndex];
    return (
        <Wrapper onClick={onClose}>
            <Container onClick={(e) => e.stopPropagation()}>
                <Title>Quiz</Title>
                <Question>{currentQuestion.num}. {currentQuestion.question}</Question>
                <QuestionContainer>
                    {['item1', 'item2', 'item3', 'item4'].map((item, index) => (
                        <Button 
                            key={item} 
                            onClick={() => handleAnswerClick(index)}
                            style={{ backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#662aff' : '#3c6aff' }}
                        >
                            {currentQuestion[item]}
                        </Button>
                    ))}
                </QuestionContainer>
                <div>
                    <NavButton onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</NavButton>
                    <NavButton onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex] && selectedAnswers[currentQuestionIndex] !== 0}>Next</NavButton>
                </div>
            </Container>
        </Wrapper>
    );
}

export default Modal;

Modal.propTypes = {
    test: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    challengeId: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    border: 1px solid black;
    inset: 0px;
    background-color: #8888881c;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background: #f2f2f2;  
    color: #494949;
    width: 50%;
    height: auto;
    padding: 30px;
    box-shadow: 0 0 10px lightyellow;
    margin-top: 50px;
    border-radius: 15px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
`;

const Question = styled.h2`
    font-size: 18px;
`;

const QuestionContainer = styled.div`
    margin: 20px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Button = styled.button`
    background-color: #275dff;
    color: white;
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const NavButton = styled(Button)`
    background-color: #727272;

    &:hover {
        background-color: #098dcb;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ResultContainer = styled.div`
    text-align: center;
`;

const RestartButton = styled(Button)`
    background-color: #f44336;

    &:hover {
        background-color: #e53935;
    }
`;

