import styled from "styled-components";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useState } from "react";

function Modal({ test, onClose }) {

    const [selectedNum, setSelectedNum] = useState(1)

    console.log(test[0])

    const handleNumClick = (e) =>{
        setSelectedNum(e);
    }

    return (
        <Wrapper onClick={onClose}>
            <SubWrapper onClick={(e) => e.stopPropagation()}>
                <FormWrapper>
                    {test.map((test) => (
                        <TestWrapper key={test.num}>
                            <Question>{test.num}. {test.question}</Question>
                            <ItemSelect>
                                <ItemWrapper>
                                    <Item type="checkbox" id={`${test.num}-item1`} name={test.num} value={1} />
                                    <Label htmlFor={`${test.num}-item1`}>{test.item1}</Label>
                                </ItemWrapper>
                                <ItemWrapper>
                                    <Item type="checkbox" id={`${test.num}-item2`} name={test.num} value={2} />
                                    <Label htmlFor={`${test.num}-item2`}>{test.item2}</Label>
                                </ItemWrapper>
                                <ItemWrapper>
                                    <Item type="checkbox" id={`${test.num}-item3`} name={test.num} value={3} />
                                    <Label htmlFor={`${test.num}-item3`}>{test.item3}</Label>
                                </ItemWrapper>
                                <ItemWrapper>
                                    <Item type="checkbox" id={`${test.num}-item4`} name={test.num} value={4} />
                                    <Label htmlFor={`${test.num}-item4`}>{test.item4}</Label>
                                </ItemWrapper>
                            </ItemSelect>
                        </TestWrapper>
                    ))}
                    
                </FormWrapper>
                <ButtonWrapper>
                    {test.map((btn) => (
                        <Button key={btn.num} onClick={() => handleNumClick(btn)}>
                            {btn.num}
                        </Button>
                    ))}
                    <ResultButton>결과 보기</ResultButton>
                </ButtonWrapper>
            </SubWrapper>
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

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    background: #606c88;  
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88); 
    background: linear-gradient(to right, #3f4c6b, #606c88); 
    color: white;
    width: 50%;
    height: auto;
    padding: 30px;
    box-shadow: 0 0 10px lightyellow;
    margin-top: 50px;
`;

const FormWrapper = styled.form`
`;

const TestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

const Question = styled.h2``;

const ItemSelect = styled.div``;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
`;

const Item = styled.input``;

const Label = styled.label``;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const Button = styled.button`
    border: none;
    background-color: #06a7e1;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 15px;
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

const ResultButton = styled.button``;
