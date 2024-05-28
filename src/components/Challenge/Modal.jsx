import styled from "styled-components"
import PropTypes from 'prop-types'
import { useForm } from "react-hook-form"

function Modal({test, onClose}) {

    const { handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Wrapper onClick={onClose}>
            <TestWrapper onClick={(e) => e.stopPropagation()}>
                {test.map((data) => (
                    <Test key={data.id} onSubmit={handleSubmit(onSubmit)}>
                        <Question>{data.id}. {data.question}</Question>
                        <Label htmlFor={`item1-${data.id}`}>
                            <Item id={`item1-${data.id}`} name={`item1-${data.id}`} type="checkbox" value={data.item1} />
                            {data.item1}
                        </Label>
                        <Label htmlFor={`item2-${data.id}`}>
                            <Item id={`item2-${data.id}`} name={`item2-${data.id}`} type="checkbox" value={data.item2} />
                            {data.item2}
                        </Label>
                        <Label htmlFor={`item3-${data.id}`}>
                            <Item id={`item3-${data.id}`} name={`item3-${data.id}`} type="checkbox" value={data.item3} />
                            {data.item3}
                        </Label>
                        <Label htmlFor={`item4-${data.id}`}>
                            <Item id={`item4-${data.id}`} name={`item4-${data.id}`} type="checkbox" value={data.item4} />
                            {data.item4}
                        </Label>
                    </Test>
                ))}
            </TestWrapper>
        </Wrapper>
    )
}

export default Modal

Modal.propTypes = {
    test: PropTypes.array,
    onClose: PropTypes.func.isRequired
}

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

const TestWrapper = styled.div`
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

const Test = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Question = styled.div``;

const Item = styled.input`
    display: none;
`;

const Label = styled.label`
    cursor: pointer;
`;