import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function Tv() {
	const loading = false;
	return <Wrapper>{loading ? <Loader>Loading</Loader> : <></>}</Wrapper>;
}

export default Tv;
