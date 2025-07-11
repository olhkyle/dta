import styled from '@emotion/styled';

const Classified = () => {
	return (
		<Container>
			{Array.from({ length: 5 }, (_, idx) => (
				<div key={idx} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin: 32px auto;
	width: 100%;
	height: 200px;
	background-color: var(--white);
	filter: blur(4px);
	text-align: center;

	div {
		width: 100%;
		height: 20px;
		background-color: var(--color-gray-100);
	}
`;

export default Classified;
