import styled from "styled-components";
import { userStore } from "../UserStore";
import { useCallback, useEffect, useState } from "react";
import { AuthApi } from "../UserApi";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";

function Memo() {
    const { challengeList } = userStore();
    const [challengeId, setChallengeId] = useState(null);
    const [stepData, setStepData] = useState(null);
    const [nodes, setNodes] = useState([]);
    const [expandedIds, setExpandedIds] = useState([]);
    const theme = useTheme(getTheme());

    const fetchData = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        const CHALLENGE = import.meta.env.VITE_CHALLENEGE;
        
        if (challengeId !== null) {
            try {
                const response = await AuthApi({ token }).get(`${CHALLENGE}${challengeId}/${userId}`);
                setStepData(response.data.steps);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [challengeId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (stepData) {
            const updatedNodes = stepData.flatMap((step) =>
                step.days.filter((day) => day.complete).map((day, index) => ({
                    key: `${step.step}-${index}`, 
                    step: step.step,
                    partName: step.partName,
                    day: day.day || index + 1,
                    memo: day.memo,
                    chapter: day.chapter || [],
                    test: day.test || [],
                }))
            );
            setNodes(updatedNodes);
        } else {
            setNodes([]);
        }
    }, [stepData]);

    const pagination = usePagination(
        { nodes },
        {
            state: {
                page: 0,
                size: 5,
            },
            onChange: onPaginationChange,
        }
    );

    function onPaginationChange(action, state) {
        console.log(action, state);
    }

    const selectChallengeId = (e) => {
        setChallengeId(e.target.value);
        fetchData();
    };

    const handleExpand = (item) => {
        if (expandedIds.includes(item.key)) {
            setExpandedIds(expandedIds.filter((id) => id !== item.key));
        } else {
            setExpandedIds(expandedIds.concat(item.key));
        }
    };

    const COLUMNS = [
        { label: "Part Name", renderCell: (item) => item.partName },
        { label: "Chapter", renderCell: (item) => item.chapter },
        { label: "Memo", renderCell: (item) => item.memo },
    ];

    const ROW_PROPS = {
        onClick: handleExpand,
    };
    const ExpandRow = styled.tr`
    display: flex;
    grid-column: 1 / -1;
    `;

    const ExpandCell = styled.td`
    flex: 1;
    `;

    const ExpandContainer = styled.div`
    margin: 10px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

    const ExpandList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    `;

    const ExpandListItem = styled.li`
    margin-bottom: 5px;
    `;

    const ROW_OPTIONS = {
        renderAfterRow: (item) => (
            <>
                {expandedIds.includes(item.key) && (
                    <ExpandRow key={`expand-${item.key}`}>
                        <ExpandCell>
                            <ExpandContainer>
                                <ExpandList>
                                    <ExpandListItem>
                                        <strong>Memo:</strong> {JSON.stringify(item.memo)}
                                    </ExpandListItem>
                                </ExpandList>
                            </ExpandContainer>
                        </ExpandCell>
                    </ExpandRow>
                )}
            </>
        ),
    };


    return (
        <Wrapper>
            <SelectWrapper>
                <TitleWrapper>
                    <Title>나의 메모</Title>
                    <select onChange={selectChallengeId} defaultValue={'default'}>
                        <option value="default" disabled>챌린지를 고르세요</option>
                        {challengeList.data.map((challenge) => (
                            <option key={challenge.challengeId} value={challenge.challengeId}>{challenge.challengeName}</option>
                        ))}
                    </select>
                </TitleWrapper>
            </SelectWrapper>
            {challengeId !== null && stepData ? (
                <>
                    <CompactTable
                        columns={COLUMNS}
                        rowProps={ROW_PROPS}
                        rowOptions={ROW_OPTIONS}
                        data={{ nodes }}
                        theme={theme}
                        pagination={pagination}
                        rowKey={(item) => item.key}
                    />

                    <PaginationWrapper>
                        <span>Total Pages: {pagination.state.getTotalPages(nodes)}</span>
                        <span>
                            Page:{" "}
                            {pagination.state.getPages(nodes).map((_, index) => (
                                <PageButton
                                    key={index}
                                    type="button"
                                    $active={pagination.state.page === index}
                                    onClick={() => pagination.fns.onSetPage(index)}
                                >
                                    {index + 1}
                                </PageButton>
                            ))}
                        </span>
                    </PaginationWrapper>
                </>
            ) : null}
        </Wrapper>
    );
}

export default Memo;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
`;

const SelectWrapper = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    width: 100%;
    margin-left: 50px;
    gap: 50px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 400;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const PageButton = styled.button`
    font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
    margin-right: 5px;
`;
