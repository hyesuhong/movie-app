import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
	getTvShowLatest,
	getTvShowsOnAir,
	getTvShowsPopular,
	getTvShowsToday,
	getTvShowsTop,
	IGetTvShowResult,
	ITvShow,
} from '../api';
import TvModal from '../Components/TvModal';
import Slider from '../Components/TvSlider';
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

function Tv() {
	const navigate = useNavigate();
	const tvMatch = useMatch('/tv/:type/:tvId');

	const { data: latestData, isLoading: latestLoading } = useQuery<ITvShow>(
		['tv', 'latest'],
		getTvShowLatest
	);
	const { data: todayData, isLoading: todayLoading } =
		useQuery<IGetTvShowResult>(['tv', 'today'], getTvShowsToday);
	const { data: popularData, isLoading: popularLoading } =
		useQuery<IGetTvShowResult>(['tv', 'popular'], getTvShowsPopular);
	const { data: onAirData, isLoading: onAirLoading } =
		useQuery<IGetTvShowResult>(['tv', 'onAir'], getTvShowsOnAir);
	const { data: topData, isLoading: topLoading } = useQuery<IGetTvShowResult>(
		['tv', 'top'],
		getTvShowsTop
	);

	const loading =
		latestLoading ||
		todayLoading ||
		popularLoading ||
		onAirLoading ||
		topLoading;

	const modalClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const { currentTarget, target } = event;
		if (currentTarget === target) {
			navigate('/tv');
		}
	};

	let clickedShow;
	if (tvMatch) {
		switch (tvMatch.params.type) {
			case 'todayAiring':
				clickedShow = todayData?.results.find(
					(show) => show.id === Number(tvMatch.params.tvId)
				);
				break;
			case 'popular':
				clickedShow = popularData?.results.find(
					(show) => show.id === Number(tvMatch.params.tvId)
				);
				break;
			case 'onAir':
				clickedShow = onAirData?.results.find(
					(show) => show.id === Number(tvMatch.params.tvId)
				);
				break;
			case 'topRated':
				clickedShow = topData?.results.find(
					(show) => show.id === Number(tvMatch.params.tvId)
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
						<Title>{latestData?.name}</Title>
						<Overview>{latestData?.overview}</Overview>
						<Poster
							bgphoto={makeImagePath(latestData?.backdrop_path || '')}
						></Poster>
					</Banner>
					{todayData && <Slider data={todayData.results} title='todayAiring' />}
					{popularData && <Slider data={popularData.results} title='popular' />}
					{onAirData && <Slider data={onAirData.results} title='onAir' />}
					{topData && <Slider data={topData.results} title='topRated' />}

					<AnimatePresence>
						{tvMatch ? (
							<>
								<Overlay
									onClick={modalClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								{clickedShow && (
									<TvModal
										id={clickedShow.id}
										title={clickedShow.name}
										overview={clickedShow.overview}
										bgImg={clickedShow.backdrop_path}
										type={tvMatch.params.type as string}
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

export default Tv;
