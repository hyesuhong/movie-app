import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { getMovieDetail, IMovie } from '../api';
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
`;

interface IModalProps {
	id: number;
	title: string;
	overview: string;
	bgImg: string;
	type: string;
}

function DetailModal({ id, title, overview, bgImg, type }: IModalProps) {
	const { data, isLoading } = useQuery<IMovie>('detail', () =>
		getMovieDetail(id)
	);

	useEffect(() => console.log(data), [data]);

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
								src={makeImagePath(data ? data.backdrop_path : '', 'w500')}
								alt={data ? data.original_title : title}
							/>
						</div>
					</ModalCover>
					<ModalDesc>
						<ModalTitle>{data ? data.original_title : title}</ModalTitle>
						<ModalOverview>{data ? data.overview : overview}</ModalOverview>
					</ModalDesc>
				</>
			)}
		</ModalContainer>
	);
}

export default DetailModal;
