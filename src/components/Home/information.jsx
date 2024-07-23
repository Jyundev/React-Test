import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaInfoCircle } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { PiNotePencilThin } from "react-icons/pi";
import { PiStudentLight } from "react-icons/pi";
import { FaExclamationCircle } from "react-icons/fa";

function Information() {

    const navigate = useNavigate();

    const [calandarData, setCalandarData] = useState();

    const CALANDAR = import.meta.env.VITE_CERTIFICATE_CALANDAR

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(CALANDAR);
            setCalandarData(response.data.data)
        }
        fetchData();
    }, [CALANDAR]);

    const [detail, setDetail] = useState();
    const [select, setSelected] = useState(false);

    const handleDateClick = (e) => {
        setDetail(e.event);
        setSelected(true);
    }
    
    const customDayCellContent = (arg) => {
        return arg.date.getDate().toString(); // 일자만 표시
    };

    const onClick = () => {
        navigate(`/certificate/${detail.extendedProps.certificateId}`);
    }

    return (
        <Wrapper>
            <CalendarWrapper>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView='dayGridMonth'
                    events={calandarData}
                    eventClick={handleDateClick}
                    locale='ko'
                    buttonText={{
                        today: '오늘'
                    }}
                    dayCellContent={customDayCellContent}
                    fixedWeekCount={false}
                    height='100%'
                />
            </CalendarWrapper>
            <DetailWrapper>
                {!select ? 
                            <BeforeSelectWrapper>
                                <BeforeSelect>자격증 접수일을 누르면 </BeforeSelect>
                                <BeforeSelect>자세한 정보를 알 수 있어요<BeforeSelectIcon><FaExclamationCircle /></BeforeSelectIcon></BeforeSelect>
                            </BeforeSelectWrapper>
                : 
                    <>
                        <Title><TitleIcon><FaInfoCircle /></TitleIcon> 자격증 시험 접수 정보</Title>
                        <SubTitleWrapper>
                            <Round>{detail.extendedProps[0].round}</Round>
                            <SubTitle>{detail.title}</SubTitle>
                        </SubTitleWrapper>
                        <Overview>{detail.extendedProps[0].overView}</Overview>
                        <Detail><DetailIcon><CiCalendar /></DetailIcon>{"시험 날짜 : "}{detail.extendedProps[0].testDay}</Detail>
                        <Detail><DetailIcon><PiNotePencilThin /></DetailIcon>{"시험 형식 : "}{detail.extendedProps[0].type}</Detail>
                        <Detail><DetailIcon><PiStudentLight /></DetailIcon>{"시험 자격 : "}{detail.extendedProps[0].standards[0].qualification}</Detail>
                        <Button onClick={onClick}>더보기</Button>
                    </>
                }
            </DetailWrapper>
        </Wrapper>
    )
}

export default Information

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    justify-content: center;
    gap: 60px;
    margin-top: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const CalendarWrapper = styled.div`
    width: 40vw;
    height: 80vh;
    border-radius: 30px;
    border: 2px solid grey;
    padding: 30px;
    border: 2px solid lightgrey;
    @media (max-width: 768px) {
        width: 80vw;
    }

    .fc-day-sun a {
    color: #ff6868;
    }
    
    /* 토요일 날짜: 파란색 */
    .fc-day-sat a {
        color: #8d8dff;
    }

    /* 이벤트 클래스에 대한 기본 스타일 */
    .fc-event {
        cursor: pointer;
        border: none;
        transition: background-color 0.3s, color 0.3s;
        text-align: center;
        background-color: #95c8ff;
    }

    .fc-event:hover {
    background-color: #ffceda; /* 호버 시 배경색 변경 */
    }

    /* 이벤트 제목에 대한 스타일 */
    .fc-event-title {
        font-weight: 200;
        color: black;
        margin: 2px 0;
    }
.fc-button {
    background-color: white; /* 버튼 배경색 */
    color: #5c5c5c; /* 버튼 텍스트 색상 */
    border: none; /* 버튼 테두리 제거 */
    padding: 10px 20px; /* 버튼 패딩 */
    border-radius: 4px; /* 버튼 테두리 둥글게 */
    font-size: 20px;
    cursor: pointer;
}

.fc-button:hover {
    color: #088ad6; /* 호버 시 버튼 배경색 */
    background-color: white;
}

.fc-button:disabled {
    background-color: white; /* 비활성화된 버튼 배경색 */
    color: #5c5c5c;
}
.fc-button-group {
}

.fc-button {
}
@media (max-width: 768px) {
    .fc-toolbar {
        display: flex;
        align-items: center;
    }
    .fc-toolbar-title {
        font-size: 30px; 
    }
    .fc-button {
        font-size: 24px;
    }
}
@media (max-width: 500px) {
    
    .fc-toolbar-title {
        font-size: 24px; 
    }
    .fc-button {
        font-size: 17px;
    }
}
`;

const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 30vw;
    border: 2px solid lightgrey;
    border-radius: 15px;
    padding: 40px 0;
    @media (max-width: 768px) {
        width: 80vw;
    }
`;

const BeforeSelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const BeforeSelect = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 20px;
    font-size: 600;
    text-align: center;
`;

const BeforeSelectIcon = styled.p`
    margin-left: 5px;
    color: tomato;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 40px;
`;

const TitleIcon = styled.div`
    font-size: 20px;
`

const SubTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
`;

const Round = styled.div`
    font-size: 17px;
    margin-bottom: 6px;
`;

const SubTitle = styled.div`
    font-size: 23px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Overview = styled.div`
    width: 80%;
    padding: 15px;
    background-color: #e2edff;
    border-radius: 7px;
    line-height: 20px;
    text-indent: 10px;
    margin-bottom: 20px;
`;

const Detail = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    margin-bottom: 10px;
    gap: 10px;
`;

const DetailIcon = styled.div`
    font-size: 18px;
`

const Button = styled.button`
    margin-top: 20px;
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    background-color: #282828;
    border: 1px solid gray;
    border-radius: 10px;
    &:hover {
        background-color: #3b3b3b;

    }

`;



