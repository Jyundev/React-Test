import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"

function Search() {

    const [certificateData, setCertificateData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://52.78.44.47/api/v1/certificate/all');
            setCertificateData(response.data);
            setFilteredData(response.data); // 데이터가 로드된 후에 filteredData를 초기화
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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

    return (
        <Wrapper>
            <SearchBar 
                type='text'
                placeholder="검색어를 입력해주세요."
                onChange={handleChange}
            />
            <ul>
                {filteredData.map(item => (
                    <li key={item.certificate_id}>
                        {item.certificateFullName}
                    </li>
                ))}
            </ul>
        </Wrapper>
    );
}

export default Search;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SearchBar = styled.input``;
