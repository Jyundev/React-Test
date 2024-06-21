import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
                    dayCellContent={customDayCellContent}
                    fixedWeekCount={false}
                    height='100%'
                />
            </CalendarWrapper>
            <DetailWrapper>
                {!select ? <BeforeSelect>일정을 선택해주세요🎈</BeforeSelect> : 
                    <>
                        <Title>✅ 접수 정보</Title>
                        <SubTitleWrapper>
                            <Round>{detail.extendedProps[0].round}</Round>
                            <SubTitle>{detail.title}</SubTitle>
                        </SubTitleWrapper>
                        <Overview>{detail.extendedProps[0].overView}</Overview>
                        <Detail>{"🕗 시험 날짜: "}{detail.extendedProps[0].testDay}</Detail>
                        <Detail>{"✒️ 시험 형식: "}{detail.extendedProps[0].type}</Detail>
                        <Detail>{"🆗 시험 자격: "}{detail.extendedProps[0].standards[0].qualification}</Detail>
                        <Button onClick={onClick}>상세 정보</Button>
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
    box-shadow: 3px 4px 15px grey;
    padding: 30px;
    background-color: #ffffff62;
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
        background-color: lightgreen;
    }

    .fc-event:hover {
    background-color: #44c944; /* 호버 시 배경색 변경 */
    font-weight: bold; /* 호버 시 텍스트 굵게 */
    }

    /* 이벤트 제목에 대한 스타일 */
    .fc-event-title {
        font-weight: 600;
    }
`;

const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid black;
    width: 30vw;
    border: 2px solid lightgrey;
    border-radius: 15px;
    padding: 40px 0;
    @media (max-width: 768px) {
        width: 80vw;
    }
`;

const BeforeSelect = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    font-size: 20px;
    font-size: 600;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 40px;
`;

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
    background-color: #def8de;
    border-radius: 7px;
    line-height: 20px;
    text-indent: 10px;
    margin-bottom: 20px;
`;

const Detail = styled.div`
    width: 70%;
    margin-bottom: 10px;
`;

const Button = styled.button`
    margin-top: 20px;
    padding: 13px;
    font-size: 17px;
    font-weight: 600;
    color: #000000bb;
    background-color: #fbe9cf;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px grey;
    &:hover {
        background-color: #fbd49f;
    }

`;


