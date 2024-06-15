import styled from "styled-components";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { useState } from "react";

function Modal({ test, onClose }) {

    const [testData, setTestData] = useState(test[0])

    console.log(test[0])

    const handleNumClick = (e) =>{
        setTestData(e);
    }

    return (
        <Wrapper onClick={onClose}>
            <SubWrapper onClick={(e) => e.stopPropagation()}>
                <FormWrapper >
                    <TestWrapper key={testData.num}>
                        <Question>{testData.num}. {testData.question}</Question>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${testData.num}-item1`} name={testData.num} value={testData.item1} />
                            <Label htmlFor={`${testData.num}-item1`}>{testData.item1}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${testData.num}-item2`} name={testData.num} value={testData.item2} />
                            <Label htmlFor={`${testData.num}-item2`}>{testData.item2}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${testData.num}-item3`} name={testData.num} value={testData.item3} />
                            <Label htmlFor={`${testData.num}-item3`}>{testData.item3}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${testData.num}-item4`} name={testData.num} value={testData.item4} />
                            <Label htmlFor={`${testData.num}-item4`}>{testData.item4}</Label>
                        </ItemWrapper>
                    </TestWrapper>
                </FormWrapper>
                <ButtonWrapper>
                    {test.map((btn) => (
                        <Button key={btn.num} onClick={() => handleNumClick(btn)}>
                            {btn.num}
                        </Button>
                    ))}
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
    gap: 30px;
    background: #606c88;  
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88); 
    background: linear-gradient(to right, #3f4c6b, #606c88); 
    color: white;
    width: 50%;
    height: auto;
    padding: 20px;
    box-shadow: 0 0 10px lightyellow;
`;

const FormWrapper = styled.form`
`;

const TestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Question = styled.h2``;

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
    gap: 20px;
`;

const Button = styled.button`
    border: none;
    background-color: #06a7e1;
    border-radius: 40px;
    width: 50px;
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

const Result = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background: #606c88;  
    background: -webkit-linear-gradient(to right, #3f4c6b, #606c88); 
    background: linear-gradient(to right, #3f4c6b, #606c88); 
    color: white;
    width: 50%;
    height: auto;
    padding: 20px;
    box-shadow: 0 0 10px lightyellow;
    border-radius: 20px;
`;

const PaginationInfo = styled.div`
    align-self: flex-start;
    margin-bottom: -20px;
    font-weight: bold;
`;
