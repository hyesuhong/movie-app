import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	getMoviesNowPlaying,
	getMoviesPopular,
	getMoviesTop,
	getMoviesUpcoming,
	IGetMovieResult,
} from '../api';
import DetailModal from '../Components/DetailModal';
import Slider from '../Components/MovieSlider';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
	background-color: ${(props) => props.theme.black.darker};
`;

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	height: 80vh;
	padding: 60px;
	z-index: 1;
`;

const Poster = styled.div<{ bgphoto: string }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(rgba(20, 20, 20, 0.5), rgba(20, 20, 20, 1)),
		url(${(props) => props.bgphoto});
	background-size: cover;
	z-index: -1;
`;

const Title = styled.h2`
	font-size: 60px;
	margin-bottom: 10px;
`;

const Overview = styled.p`
	width: 50%;
	font-size: 20px;
`;

const Overlay = styled(motion.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(5px);
	opacity: 0;
	z-index: 100;
`;

function Home() {
	const navigate = useNavigate();
	const movieMatch = useMatch('/movies/:type/:movieId');
	const { data: nowData, isLoading: nowLoading } = useQuery<IGetMovieResult>(
		['movies', 'nowPlaying'],
		getMoviesNowPlaying
	);
	const { data: popularData, isLoading: popularLoading } =
		useQuery<IGetMovieResult>(['movies', 'popular'], getMoviesPopular);
	const { data: topData, isLoading: topLoading } = useQuery<IGetMovieResult>(
		['movies', 'topLated'],
		getMoviesTop
	);
	const { data: comingData, isLoading: comingLoading } =
		useQuery<IGetMovieResult>(['movies', 'upcoming'], getMoviesUpcoming);
	const loading = nowLoading || popularLoading || topLoading || comingLoading;

	const modalClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const { currentTarget, target } = event;
		if (currentTarget === target) {
			navigate('/');
		}
	};

	let clickedMovie;
	if (movieMatch) {
		switch (movieMatch.params.type) {
			case 'nowPlaying':
				clickedMovie = nowData?.results.find(
					(movie) => movie.id === Number(movieMatch.params.movieId)
				);
				break;
			case 'popular':
				clickedMovie = popularData?.results.find(
					(movie) => movie.id === Number(movieMatch.params.movieId)
				);
				break;
			case 'topLated':
				clickedMovie = topData?.results.find(
					(movie) => movie.id === Number(movieMatch.params.movieId)
				);
				break;
			case 'upcoming':
				clickedMovie = comingData?.results.find(
					(movie) => movie.id === Number(movieMatch.params.movieId)
				);
				break;
		}
	}

	return (
		<Wrapper>
			{loading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Banner>
						<Title>{nowData?.results[0].title}</Title>
						<Overview>{nowData?.results[0].overview}</Overview>
						<Poster
							bgphoto={makeImagePath(nowData?.results[0].backdrop_path || '')}
						></Poster>
					</Banner>
					{nowData && (
						<Slider movies={nowData.results.slice(1)} title='nowPlaying' />
					)}
					{popularData && (
						<Slider movies={popularData.results} title='popular' />
					)}
					{topData && <Slider movies={topData.results} title='topLated' />}
					{comingData && (
						<Slider movies={comingData.results} title='upcoming' />
					)}

					<AnimatePresence>
						{movieMatch ? (
							<>
								<Overlay
									onClick={modalClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								{clickedMovie && (
									<DetailModal
										id={clickedMovie.id}
										title={clickedMovie.title}
										overview={clickedMovie.overview}
										bgImg={clickedMovie.backdrop_path}
										type={movieMatch.params.type as string}
									/>
								)}
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
