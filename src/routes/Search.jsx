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
                        <Img src={item.thumbnail} alt="img" />
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
    gap: 20px;
    padding: 40px;
    width: 100%;
    margin-bottom: 100px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
`;

const SearchBar = styled.input`
    margin: 20px;
    width: 500px;
    height: 45px;
    font-size: 15px;
    border-radius: 20px;
    padding-left: 15px;
    border: 1px solid gray;
    font-family: "Jua", sans-serif;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:focus {
        transform: scale(1.08);
        outline: none;
    }
    @media (max-width: 768px)  {
        width: 300px;
    }
`;

const SearchResult = styled.div`
    display: flex;
    width: 83%;
    flex-wrap: wrap;
    gap: 50px;
    padding: 20px;
    @media (max-width: 600px)  {
        width: 100%;
    }
`;

const Certificate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 220px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    background-color: #eef5ff;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 20px #ffff88;
    }
    @media (max-width: 700px)  {
        width: 150px;
        height: 150px;
    }
`;

const Img = styled.img`
    width: 220px;
    height: 220px;
    background-color: white;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 0 8px lightcyan;
    @media (max-width: 700px)  {
        width: 150px;
        height: 150px;
    }
`;
