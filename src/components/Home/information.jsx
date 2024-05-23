import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import styled from 'styled-components'
import { useState } from 'react'

const events = [
    {   title: 'ADsP 접수', 
        start: '2024-05-15',
        end: '2024-05-17',
        extendedProps:{
            난이도: '하',
            접수비: '50000'
            } 
    },
    {   title: 'SQLd 시험', 
        start: '2024-05-20',
        end: '2024-05-25',
        extendedProps:{
            난이도: '중',
            접수비: '50000'
            } 
    },
    ]

function Information() {

    const [detail, setDetail] = useState();
    const [select, setSelected] = useState(false);

    const handleDateClick = (e) => {
        console.log(e)
        setDetail(e.event);
        setSelected(true);
    }
    
    const customDayCellContent = (arg) => {
        // arg.date는 현재 날짜 객체를 나타냅니다.
        // 이를 적절한 형식으로 변환하여 반환합니다.
        return arg.date.getDate().toString(); // 일자만 표시
    };

    console.log(detail)

    return (
        <Wrapper>
            <CalendarWrapper>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView='dayGridMonth'
                    events={events}
                    eventClick={handleDateClick}
                    height="auto"
                    locale='ko'
                    dayCellContent={customDayCellContent}
                    fixedWeekCount={false}
                />
            </CalendarWrapper>
            <DetailWrapper>
                {!select ? <Title>일정을 선택해주세요</Title> : 
                    <div>
                        <Title>{detail.title}</Title>
                        <Title>{detail.extendedProps.난이도}</Title>
                        <Title>{detail.extendedProps.접수비}</Title>
                    </div>
                }
            </DetailWrapper>
        </Wrapper>
    )
}

export default Information

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    justify-content: center;
    gap: 60px;
    margin-top: 20px;
`;

const CalendarWrapper = styled.div`
    width: 60vh;

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
    }

    .fc-event:hover {
    background-color: #91d1fb; /* 호버 시 배경색 변경 */
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
    justify-content: center;
    border: 1px solid black;
    width: 60vh;
`;

const Title = styled.div``;


