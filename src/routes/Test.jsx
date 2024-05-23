import { useForm } from 'react-hook-form';
import styled from 'styled-components';

function Test() {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        <input 
                            type='checkbox'
                            {...register("fruits", { required: "At least one fruit must be selected" })}
                            value="apple"
                        />
                        Apple
                    </label>
                    <label>
                        <input 
                            type='checkbox'
                            {...register("fruits", { required: "At least one fruit must be selected" })}
                            value="banana"
                        />
                        Banana
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type='checkbox'
                            {...register("book", { required: "At least one fruit must be selected" })}
                            value="harry"
                        />
                        Harry
                    </label>
                    <label>
                        <input 
                            type='checkbox'
                            {...register("book", { required: "At least one fruit must be selected" })}
                            value="nania"
                        />
                        Nania
                    </label>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </Wrapper>
    )
}

export default Test

const Form = styled.form``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
