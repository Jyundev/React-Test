import styled from "styled-components";
import PropTypes from 'prop-types';

function Description({certificate}) {

    Description.propTypes = {
        certificate: PropTypes.object.isRequired,
    };

    return (
        <DescriptionWrapper>
            <DescriptionTitle>🔎 {certificate.certificateName} 란?</DescriptionTitle>
            <Overview>{certificate.overview}</Overview>
        </DescriptionWrapper>
    )
}

export default Description

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    gap: 40px;
`;

const DescriptionTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
`;

const Overview = styled.span`
    font-size: 19px;
    line-height: 30px;
    text-indent: 20px;
    border: 3px solid lightgreen;
    border-radius: 10px;
    padding: 10px;
`;