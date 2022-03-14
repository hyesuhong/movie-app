import {
	AnimatePresence,
	motion,
	useTransform,
	useViewportScroll,
} from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getMovies, IGetMovieResult } from '../api';
import { makeImagePath } from '../utils';

const Wrapper = styled.div`
	height: 200vh;
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

const Slider = styled.div`
	position: relative;
	z-index: 2;
`;

const Row = styled(motion.div)`
	position: absolute;
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 10px;
	width: 100%;
`;

const Box = styled(motion.div)`
	/* position: relative; */
	/* height: 140px; */
	cursor: pointer;

	&:first-child {
		transform-origin: left center;
	}
	&:last-child {
		transform-origin: right center;
	}

	& > img {
		width: 100%;
	}
`;

const Info = styled(motion.div)`
	position: absolute;
	width: 100%;
	top: 100%;
	left: 0;
	padding: 10px 0;
	background: ${(props) => props.theme.black.light};
	opacity: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
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

const Modal = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	width: 70%;
	height: 80vh;
	margin: 0 auto;
	border-radius: 10px;
	z-index: 101;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.dark};
`;

const ModalCover = styled.div`
	position: relative;
	img {
		width: 100%;
	}
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(transparent, #181818);
	}
`;

const ModalTitle = styled.h3`
	color: ${(props) => props.theme.white.light};
	font-size: 20px;
	font-weight: 700;
	padding: 0 10px;
`;

const rowVariants = {
	hidden: {
		x: window.innerWidth,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.innerWidth,
	},
};

const boxVariants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		// zIndex: 99,
		transition: {
			delay: 0.5,
			duration: 0.3,
			type: 'tween',
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.3,
			type: 'tween',
		},
	},
};

const offset = 6;

function Home() {
	const navigate = useNavigate();
	const movieMatch = useMatch('/movies/:movieId');
	const { scrollY } = useViewportScroll();
	const transformScrollY = useTransform(scrollY, (value) => value + 50);
	const { data, isLoading } = useQuery<IGetMovieResult>(
		['movies', 'nowPlaying'],
		getMovies
	);
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			setLeaving(true);
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);
	const onBoxClicked = (movieId: number) => {
		navigate(`/movies/${movieId}`);
	};

	const modalClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const { currentTarget, target } = event;
		if (currentTarget === target) {
			navigate('/');
		}
	};
	const clickedMovie =
		movieMatch?.params.movieId &&
		data?.results.find(
			(movie) => movie.id === Number(movieMatch.params.movieId)
		);
	console.log(clickedMovie);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Banner onClick={increaseIndex}>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
						<Poster
							bgphoto={makeImagePath(data?.results[0].backdrop_path || '')}
						></Poster>
					</Banner>
					<Slider>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								key={index}
								variants={rowVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								transition={{ type: 'tween', duration: 1 }}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box
											key={movie.id}
											layoutId={movie.id + ''}
											variants={boxVariants}
											whileHover='hover'
											initial='normal'
											transition={{ type: 'tween' }}
											onClick={() => onBoxClicked(movie.id)}
										>
											<img
												src={makeImagePath(movie.backdrop_path, 'w500')}
												alt={movie.title}
											/>
											<Info
												variants={infoVariants}
												transition={{ type: 'tween' }}
											>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{movieMatch ? (
							<>
								<Overlay
									onClick={modalClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<Modal
									style={{ top: transformScrollY }}
									transition={{ type: 'tween', duration: 0 }}
									layoutId={movieMatch.params.movieId}
								>
									{clickedMovie && (
										<>
											<ModalCover>
												<img
													src={makeImagePath(
														clickedMovie.backdrop_path,
														'w500'
													)}
													alt={clickedMovie.title}
												/>
											</ModalCover>
											<ModalTitle>{clickedMovie.title}</ModalTitle>
										</>
									)}
								</Modal>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
