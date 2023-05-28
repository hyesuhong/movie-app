import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
	getMovieDetail,
	getMovieReviews,
	getMovieSimilar,
	IGetMovieResult,
	IGetMovieReviews,
	IMovie,
} from '../api';
import { makeImagePath } from '../utils';

const ModalContainer = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	width: 70%;
	height: 80vh;
	margin: 0 auto;
	border-radius: 10px;
	z-index: 101;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: ${(props) => props.theme.black.dark};

	article {
		margin-top: 30px;
		padding: 0 20px;

		& > h4 {
			font-size: 18px;
			font-weight: 500;
		}

		& > p {
			padding: 20px 0;
			text-align: center;
			color: ${(props) => props.theme.white};
			opacity: 0.5;
		}

		&:last-child {
			padding-bottom: 50px;
		}
	}
`;

const ModalCover = styled.div`
	position: relative;
	padding-top: 40%;
	z-index: 0;
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		img {
			width: 100%;
		}
	}
	& > div::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(transparent, #181818);
	}
`;

const ModalDesc = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-auto-rows: min-content;
	padding: 0 20px;
	z-index: 1;
`;

const ModalTitle = styled.h3`
	color: ${(props) => props.theme.white.light};
	font-size: 20px;
	font-weight: 700;
`;

const ModalOverview = styled.p`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	line-clamp: 3;
	-webkit-line-clamp: 3;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 70%;
	color: ${(props) => props.theme.white.light};
	margin-top: 20px;
	align-self: start;
`;

const ModalExtraDesc = styled.div`
	grid-row: span 2;

	& > ul {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 10px;
		&:last-child {
			margin-bottom: 0;
		}
		&::before {
			content: attr(data-info) ':';
			margin-right: 5px;
		}
		li {
			/* margin-left: 5px; */
			font-size: 0.9em;

			&::after {
				content: '·';
				margin: 0 2px;
			}

			&:last-child::after {
				display: none;
			}
		}
	}
`;

const ModalReviews = styled.article``;

const Review = styled.dl`
	display: flex;

	&:nth-of-type(1) {
		padding-top: 20px;
	}

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	& > dt {
		flex: 0 0 50px;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		overflow: hidden;

		&.string {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;

			font-size: 20px;
			font-weight: 500;
			color: ${(props) => props.theme.black.light};
			text-transform: uppercase;
		}

		&.image > img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	& > dd {
		margin-left: 20px;

		h5 {
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 5px;
		}

		p {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			line-clamp: 2;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 14px;
			opacity: 0.5;
		}
	}
`;

const ModalSimilar = styled.article`
	dl {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-rows: max-content;
		gap: 10px;
		margin-top: 20px;
	}

	dt {
		align-self: center;
		text-align: center;

		img {
			width: 100%;
		}
	}
`;

interface IModalProps {
	id: number;
	title: string;
	overview: string;
	bgImg: string;
	type: string;
}

function DetailModal({ id, title, overview, bgImg, type }: IModalProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { data: detailData, isLoading: detailLoading } = useQuery<IMovie>(
		'detail',
		() => getMovieDetail(id)
	);

	const { data: reviewData, isLoading: reviewLoading } =
		useQuery<IGetMovieReviews>('reviews', () => getMovieReviews(id));

	const { data: similarData, isLoading: similarLoading } =
		useQuery<IGetMovieResult>('similar', () => getMovieSimilar(id));

	useEffect(() => {
		setIsLoading(detailLoading && reviewLoading && similarLoading);
		console.log(similarData);
	}, [detailLoading, reviewLoading, similarLoading]);

	const { scrollY } = useViewportScroll();
	const transformScrollY = useTransform(scrollY, (value) => value + 50);
	return (
		<ModalContainer
			style={{ top: transformScrollY }}
			transition={{ type: 'tween', duration: 0 }}
			layoutId={type + '_' + id}
		>
			{isLoading ? (
				<>
					<ModalCover>
						<div>
							<img src={makeImagePath(bgImg, 'w500')} alt={title} />
						</div>
					</ModalCover>
					<ModalDesc>
						<ModalTitle>{title}</ModalTitle>
						<ModalOverview>{overview}</ModalOverview>
					</ModalDesc>
				</>
			) : (
				<>
					<ModalCover>
						<div>
							<img
								src={makeImagePath(
									detailData ? detailData.backdrop_path : '',
									'w1280'
								)}
								alt={detailData ? detailData.original_title : title}
							/>
						</div>
					</ModalCover>
					<ModalDesc>
						<ModalTitle>
							{detailData ? detailData.original_title : title}
						</ModalTitle>
						<ModalExtraDesc>
							<ul data-info='Release'>
								{detailData ? <li>{detailData.release_date}</li> : ''}
							</ul>
							<ul data-info='RunTime'>
								{detailData ? <li>{detailData.runtime} min</li> : ''}
							</ul>
							<ul data-info='Genres'>
								{detailData
									? detailData.genres.map((genre) => (
											<li key={genre.id}>{genre.name}</li>
									  ))
									: null}
							</ul>
							<ul data-info='Language'>
								{detailData ? <li>{detailData.original_language}</li> : ''}
							</ul>
							<ul data-info='Rate'>
								{detailData && (
									<li>
										{detailData.vote_average} (
										{new Intl.NumberFormat().format(detailData.vote_count)})
									</li>
								)}
							</ul>
						</ModalExtraDesc>
						<ModalOverview>
							{detailData ? detailData.overview : overview}
						</ModalOverview>
					</ModalDesc>
					{reviewData && (
						<ModalReviews>
							<h4>Reviews</h4>
							{reviewData.total_results === 0 ? (
								<p>There is no review</p>
							) : (
								reviewData.results.slice(0, 5).map((review) => {
									const { name, username, avatar_path } = review.author_details;
									const avatar =
										avatar_path === null
											? ''
											: avatar_path.includes('http')
											? avatar_path.replace('/', '')
											: `https://secure.gravatar.com/avatar${avatar_path}`;

									return (
										<Review key={review.id}>
											<dt className={avatar === '' ? 'string' : 'image'}>
												{avatar === '' ? (
													review.author.slice(0, 1)
												) : (
													<img src={avatar} alt={review.author} />
												)}
											</dt>
											<dd>
												<h5>{review.author}</h5>
												<p>{review.content}</p>
											</dd>
										</Review>
									);
								})
							)}
						</ModalReviews>
					)}
					{similarData && (
						<ModalSimilar>
							<h4>Similar Contents</h4>
							{similarData.total_results === 0 ? (
								<p>There is no content</p>
							) : (
								<dl>
									{similarData.results.map((sm) => (
										<dt key={sm.id}>
											{sm.poster_path === null ? (
												<p>{sm.title}</p>
											) : (
												<img
													src={makeImagePath(sm.poster_path)}
													alt={sm.title}
												/>
											)}
										</dt>
									))}
								</dl>
							)}
						</ModalSimilar>
					)}
				</>
			)}
		</ModalContainer>
	);
}

export default DetailModal;
