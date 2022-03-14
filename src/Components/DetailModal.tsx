import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
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

interface IModalProps {
	id: number;
	title: string;
	overview: string;
	bgImg: string;
	type: string;
}

function DetailModal({ id, title, overview, bgImg, type }: IModalProps) {
	console.log(id, title, overview, bgImg);
	const { scrollY } = useViewportScroll();
	const transformScrollY = useTransform(scrollY, (value) => value + 50);
	return (
		<ModalContainer
			style={{ top: transformScrollY }}
			transition={{ type: 'tween', duration: 0 }}
			layoutId={type + '_' + id}
		>
			<ModalCover>
				<img src={makeImagePath(bgImg, 'w500')} alt={title} />
			</ModalCover>
			<ModalTitle>{title}</ModalTitle>
		</ModalContainer>
	);
}

export default DetailModal;
