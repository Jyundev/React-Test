import styled from "styled-components";
import PropTypes from 'prop-types';

function Description({certificate}) {

    Description.propTypes = {
        certificate: PropTypes.object.isRequired,
    };

    return (
        <DescriptionWrapper>
            <DescriptionTitle>🔎 {certificate.certificateName} 란?</DescriptionTitle>
            <DescriptionSubWrapper>
                <DescriptionImg src={certificate.thumbnail} alt='certificate image' />
                <Overview>{certificate.overview}</Overview>
            </DescriptionSubWrapper>
        </DescriptionWrapper>
    )
}

export default Description

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
`;

const DescriptionTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
`;

const DescriptionSubWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr;
    align-items: center;
`;

const DescriptionImg = styled.img``;

const Overview = styled.span`
    font-size: 19px;
    line-height: 30px;
    text-indent: 20px;
    border: 3px solid lightgreen;
    border-radius: 10px;
    padding: 10px;
`;