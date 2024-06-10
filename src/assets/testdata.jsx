import { useTable } from 'react-table';
import PropTypes from 'prop-types';

const data = [
    {
        chapter: "데이터 이해",
        unit: [
        {
            name: "데이터의 이해",
            detail: [
            "데이터와 정보",
            "데이터베이스의 정의와 특징",
            "데이터베이스 활용",
            "데이터의 가치와 미래"
            ]
        },
        {
            name: "빅데이터의 이해",
            detail: [
            "빅데이터의 가치와 영향",
            "비즈니스 모델",
            "위기 요인과 통제 방안",
            "미래의 빅데이터"
            ]
        },
        {
            name: "가치 창조를 위한 데이터 사이언스와 전략 인사이트",
            detail: [
            "빅데이터분석과 전략 인사이트",
            "전략 인사이트 도출을 위한 필요 역량",
            "빅데이터 그리고 데이터 사이언스의 미래"
            ]
        }
        ]
    },
    {
        chapter: "데이터분석 기획",
        unit: [
        {
            name: "데이터분석 기획의 이해",
            detail: [
            "분석 기획 방향성 도출",
            "분석 방법론",
            "분석 과제 발굴",
            "분석 프로젝트 관리 방안"
            ]
        },
        {
            name: "분석 마스터 플랜",
            detail: [
            "마스터 플랜 수립",
            "분석 거버넌스 체계 수립"
            ]
        }
        ]
    },
    {
        chapter: "데이터분석",
        unit: [
        {
            name: "R기초와 데이터 마트",
            detail: [
            "R기초",
            "데이터 마트",
            "결측값 처리와 이상값 검색"
            ]
        },
        {
            name: "통계분석",
            detail: [
            "통계학 개론",
            "기초 통계분석",
            "다변량 분석",
            "시계열 예측"
            ]
        },
        {
            name: "정형 데이터 마이닝",
            detail: [
            "데이터 마이닝 개요",
            "분류분석(Classification)",
            "군집분석(Clustering)",
            "연관분석(Association Analysis)"
            ]
        }
        ]
    }
];

export const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                    {headerGroup.headers.map(column => (
                    <th
                        {...column.getHeaderProps()}
                        key={column.id}
                        style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        }}
                    >
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            key={cell.column.id}
                            style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                            }}
                        >
                            {cell.render('Cell')}
                        </td>
                        );
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
        );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            Header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
            Cell: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            chapter: PropTypes.string.isRequired,
            unit: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                detail: PropTypes.arrayOf(PropTypes.string).isRequired,
            })
            ).isRequired,
        })
    ).isRequired,
};
