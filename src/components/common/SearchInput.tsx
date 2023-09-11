import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Flex } from '.';

const SearchInput = () => {
	const [value, setValue] = useState<string>('');

	return (
		<Flex justifyContent="center" gap="1rem" margin="3rem 0" role="search">
			<Input
				type="text"
				placeholder="이름을 입력해 주세요."
				value={value}
				onChange={e => setValue(e.target.value)}
				ref={node => node?.focus()}
			/>
			<SearchButton type="button">검 색</SearchButton>
		</Flex>
	);
};

const Input = styled.input`
	padding: 1rem 1rem;
	width: 240px;
	font-size: 18px;
	font-weight: 600;
	border: none;
	color: var(--text-color);
	outline: none;
	border-bottom: 5px solid var(--outline-color);

	&:focus {
		border-bottom: 5px solid var(--text-color);
	}

	@media screen and (min-width: 640px) {
		padding: 1rem 2rem;
		width: 400px;
		font-size: 24px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const SearchButton = styled(Button)`
	padding: 0.75rem 1.2rem;
	border-radius: 8px;
	font-size: 19px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}

	@media screen and (min-width: 640px) {
		padding: 1rem 2rem;
	}
`;

export default SearchInput;
