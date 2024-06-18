import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components"

function Search() {

    const [certificateData, setCertificateData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const ALL = import.meta.env.VITE_CERIFICATE_ALL
            const response = await axios.get(ALL);
            setCertificateData(response.data.data);
            setFilteredData(response.data.data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log(certificateData)

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const filtered = certificateData.filter(item =>
            Object.values(item).some(val => 
                String(val).toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const onClick = (id) => {
        navigate(`/certificate/${id}`)
    }

    return (
        <Wrapper>
            <Title>자격증을 검색하세요 🔎</Title>
            <SearchBar 
                type='text'
                placeholder="검색어를 입력해주세요."
                onChange={handleChange}
            />
            <SearchResult>
                {filteredData.map(item => (
                    <Certificate key={item.certificate_id} onClick={() => onClick(item.certificate_id)}>
                        {item.certificateFullName}
                    </Certificate>
                ))}
            </SearchResult>
        </Wrapper>
    );
}

export default Search;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    padding: 40px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
`;

const SearchBar = styled.input`
    margin: 20px;
    width: 400px;
    height: 47px;
    font-size: 15px;
    border-radius: 20px;
    padding-left: 15px;
    border: 3px solid lightgreen;
    box-shadow: 0 5px 10px grey;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:focus {
        transform: scale(1.08);
        outline: none;
    }
`;

const SearchResult = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    border: 1px solid grey;
    padding: 20px;
`;

const Certificate = styled.div`
    border: 1px solid black;
    border-radius: 20px;
    width: 250px;
    height: 250px;
    cursor: pointer;
`;
