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
                        <CertificateTitle>{item.certificateFullName}</CertificateTitle>
                        <CertificateDetail>🚀Click!</CertificateDetail>
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
    width: 100%;
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
    width: 83%;
    flex-wrap: wrap;
    gap: 50px;
    padding: 20px;
    @media (max-width: 768px)  {
        width: 89%;
    }
`;

const Certificate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    height: 220px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    background-color: #eef5ff;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 20px lightpink;
    }
`;

const Img = styled.img`
    width: 90%;
    background-color: white;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 0 8px lightcyan;
`;

const CertificateTitle = styled.h1`
    width: 80%;
    font-size: 20px;
    font-weight: 600; 
`;

const CertificateDetail = styled.span`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 30px;
    margin-top: 8px;
    font-weight: 600;
    color: grey;
`;
