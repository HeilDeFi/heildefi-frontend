import React from 'react'
import styled from 'styled-components'
import Donate from '../components/Donate';
const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
`;
const Grants: React.FunctionComponent = () => {
    return (
        <Content>
            < Donate/>
        </Content>
    )
}

export default Grants
