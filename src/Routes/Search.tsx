import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IGetSearchResult, searchContent } from '../api';
import { makeImagePath } from '../utils';

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

const ContentTitle = styled.dt`
	font-size: 20px;
	font-weight: 500;
	color: ${(props) => props.theme.white.light};
	padding-bottom: 10px;
`;

const ContentList = styled.dd`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	grid-auto-rows: max-content;
	grid-gap: 10px;

	& > div {
		height: 8vw;
	}
	& > div > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
		console.log(data?.results.slice(0, 100));
	}, [isLoading]);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<ContentGrid>
						<ContentTitle>Movies</ContentTitle>
						<ContentList>
							{data?.results
								.slice(0, 100)
								.filter((res) => res.media_type === 'movie')
								.map((movie) => (
									<div key={movie.id}>
										<img
											src={makeImagePath(
												movie.backdrop_path ? movie.backdrop_path : '',
												'w500'
											)}
											alt={movie.title}
										/>
									</div>
								))}
						</ContentList>
					</ContentGrid>
					<ContentGrid>
						<ContentTitle>TV Shows</ContentTitle>
						<ContentList>
							{data?.results
								.slice(0, 100)
								.filter((res) => res.media_type === 'tv')
								.map((tv) => (
									<div key={tv.id}>
										<img
											src={makeImagePath(
												tv.backdrop_path ? tv.backdrop_path : '',
												'w500'
											)}
											alt={tv.title}
										/>
									</div>
								))}
						</ContentList>
					</ContentGrid>
				</>
			)}
		</Wrapper>
	);
}

export default Search;
