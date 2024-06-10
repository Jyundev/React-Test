import axios from "axios"
import { useEffect } from "react";
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';

function Test() {

    useEffect(() => {
        
        const fetchData = async() => {
            const data = await axios.get('http://52.78.44.47/api/v1/challenge/all')
            console.log(typeof(data.data))
        }
        fetchData();
    }, [])

    const nodes = [
        {   
            id: 0,
            name: 'Task 1',
            deadline: new Date(2024, 5, 15), // 2024년 6월 15일
            type: 'Development',
            isComplete: false,
            nodes: [
                { name: 'Subtask 1-1', deadline: new Date(2024, 5, 10), type: 'Review', isComplete: true },
                { name: 'Subtask 1-2', deadline: new Date(2024, 5, 12), type: 'Testing', isComplete: false }
            ]
            },
            {
            id: 1,
            name: 'Task 2',
            deadline: new Date(2024, 6, 1), // 2024년 7월 1일
            type: 'Design',
            isComplete: true,
            nodes: [
                { name: 'Subtask 2-1', deadline: new Date(2024, 5, 28), type: 'Sketch', isComplete: true }
            ]
            },
            {
            id: 2,
            name: 'Task 3',
            deadline: new Date(2024, 6, 20), // 2024년 7월 20일
            type: 'Research',
            isComplete: false,
            nodes: [] // 서브 태스크가 없음
            }
    ];
    

    const data = { nodes };

    const theme = useTheme(getTheme());

    const COLUMNS = [
        { label: 'Task', renderCell: (item) => item.name, key: (item) => item.id, },
        {
            label: 'Deadline',
            renderCell: (item) =>
                item.deadline.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                }),
            key: (item) => item.id,
        },
        { label: 'Type', renderCell: (item) => item.type, key: (item) => item.id, },
        {
            label: 'Complete',
            renderCell: (item) => item.isComplete.toString(),
            key: (item) => item.id,
        },
        { label: 'Tasks', renderCell: (item) => item.nodes?.length, key: (item) => item.id, },
    ];

    return (
        <CompactTable columns={COLUMNS} data={data} theme={theme}/>
    )
}

export default Test