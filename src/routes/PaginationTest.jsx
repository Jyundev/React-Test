import React, { useState } from 'react';
import styled from 'styled-components';

const test = [
  {
    testId: 0,
    num: 0,
    question: "What is the capital of France?",
    item1: "Berlin",
    item2: "Madrid",
    item3: "Paris",
    item4: "Lisbon",
    answer: 2
  },
  {
    testId: 1,
    num: 1,
    question: "What is 2 + 2?",
    item1: "3",
    item2: "4",
    item3: "5",
    item4: "6",
    answer: 1
  },
  {
    testId: 2,
    num: 2,
    question: "What is the capital of Japan?",
    item1: "Seoul",
    item2: "Beijing",
    item3: "Tokyo",
    item4: "Bangkok",
    answer: 2
  }
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const QuestionContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const NavButton = styled(Button)`
  background-color: #008CBA;

  &:hover {
    background-color: #007BB5;
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

function PaginationTest() {
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

  if (showResults) {
    const correctAnswersCount = selectedAnswers.filter((answer, index) => answer === test[index].answer).length;
    const wrongQuestions = test.filter((q, index) => selectedAnswers[index] !== q.answer);

    return (
      <Container>
        <h1>Results</h1>
        <p>You got {correctAnswersCount} out of {test.length} questions right.</p>
        {wrongQuestions.length === 0 ? (
          <p>Congratulations! You got all questions right!</p>
        ) : (
          wrongQuestions.map((q, index) => (
            <ResultContainer key={q.testId}>
              <p>{q.question}</p>
              <p>Your answer: {q[`item${selectedAnswers[q.num] + 1}`]}</p>
              <p style={{ color: 'red' }}>Correct answer: {q[`item${q.answer + 1}`]}</p>
            </ResultContainer>
          ))
        )}
        <RestartButton onClick={handleRestart}>Restart Quiz</RestartButton>
      </Container>
    );
  }

  const currentQuestion = test[currentQuestionIndex];
  return (
    <Container>
      <h1>Quiz</h1>
      <QuestionContainer>
        <p>{currentQuestion.question}</p>
        {['item1', 'item2', 'item3', 'item4'].map((item, index) => (
          <Button 
            key={item} 
            onClick={() => handleAnswerClick(index)}
            style={{ backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#45a049' : '#4CAF50' }}
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
  );
}

export default PaginationTest;
