import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IGetSearchResult, searchContent } from '../api';

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
	padding-top: 100px;
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ContentGrid = styled.dl`
	margin-bottom: 80px;
	padding: 0 60px;
`;

const ContentTitle = styled.dt``;

const ContentList = styled.dd`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-auto-rows: min-content;
	grid-gap: 10px;

	div {
		background: silver;
		min-height: 100px;
	}
`;

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get('keyword');
	const searchKeyword = keyword ? keyword : '';
	const { data, isLoading } = useQuery<IGetSearchResult>(
		'search',
		() => searchContent(searchKeyword),
		{ refetchOnWindowFocus: false, refetchOnMount: false }
	);

	useEffect(() => {
		console.log(data, isLoading);
	}, [data]);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<ContentGrid>
						<ContentTitle>title</ContentTitle>
						<ContentList>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</ContentList>
					</ContentGrid>
				</>
			)}
		</Wrapper>
	);
}

export default Search;
