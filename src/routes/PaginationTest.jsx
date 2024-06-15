import { useEffect, useState } from "react";
import { AuthApi } from "../components/UserApi";
import styled from "styled-components";

function PaginationTest() {
    const [posts, setPosts] = useState([]);
    const [test, setTest] = useState(null); // Initialize test with null

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const res = await AuthApi.get(`/api/v1/user/challengePage/2/${userId}`);
            if (res.data.steps[0].days[3].test.length > 0) {
                setPosts(res.data.steps[0].days[3].test);
                setTest(res.data.steps[0].days[3].test[0]); // Initialize test with the first item in posts
            } else {
                console.error("No test data found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (posts.length === 0) {
        return <div>Loading...</div>;
    }

    const testData = (event) => {
        setTest(event);
    }

    return (
        <Wrapper>
            <Title>중간 점검</Title>
            <FormWrapper>
                {test && ( // Check if test is not null or undefined
                    <TestWrapper key={test.num}>
                        <Question>{test.num}. {test.question}</Question>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${test.num}-item1`} name={test.num} value={test.item1} />
                            <Label htmlFor={`${test.num}-item1`}>{test.item1}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${test.num}-item2`} name={test.num} value={test.item2} />
                            <Label htmlFor={`${test.num}-item2`}>{test.item2}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${test.num}-item3`} name={test.num} value={test.item3} />
                            <Label htmlFor={`${test.num}-item3`}>{test.item3}</Label>
                        </ItemWrapper>
                        <ItemWrapper>
                            <Item type="checkbox" id={`${test.num}-item4`} name={test.num} value={test.item4} />
                            <Label htmlFor={`${test.num}-item4`}>{test.item4}</Label>
                        </ItemWrapper>
                    </TestWrapper>
                )}
            </FormWrapper>
            <ButtonWrapper>
                {posts.map((btn) => (
                    <button key={btn.num} onClick={() => testData(btn)}>{btn.num}</button>
                ))}
            </ButtonWrapper>
        </Wrapper>
    );
}

export default PaginationTest;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    gap: 30px;
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: 600;
`;

const FormWrapper = styled.form``;

const TestWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 4px grey;
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
