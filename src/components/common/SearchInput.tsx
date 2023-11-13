import { useRef } from 'react';
import styled from '@emotion/styled';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Button, Flex } from '.';

interface SearchInputProps {
	value: string;
	setValue: (value: string) => void;
	clearValue?: () => void;
	onKeyDown?: (e: React.SyntheticEvent) => void;
	onSearchButtonClick?: () => Promise<void>;
}

const SearchInput = ({ value, setValue, clearValue, onKeyDown, onSearchButtonClick }: SearchInputProps) => {
	const ref = useRef(null);

	return (
		<Container justifyContent="center" gap="1rem" margin="3rem 0" role="search">
			<Input
				type="text"
				placeholder="이름을 입력해 주세요."
				name="search-input"
				ref={ref}
				value={value}
				onChange={e => setValue(e.currentTarget.value)}
				onKeyDown={onKeyDown}
				autoComplete="off"
				aria-label="search-worker-input"
			/>
			{value.length > 0 && (
				<RefreshButton
					type="button"
					onClick={() => {
						clearValue ? clearValue() : setValue('');

						if (ref.current) {
							(ref.current as HTMLInputElement).focus();
						}
					}}>
					<MdClose />
				</RefreshButton>
			)}
			<SearchButton type="button" onClick={onSearchButtonClick}>
				<HiOutlineSearch color="var(--text-color)" />
			</SearchButton>
		</Container>
	);
};

const Container = styled(Flex)`
	position: relative;
	margin-left: auto;
	margin-right: auto;
	width: 330px;
	border-bottom: 5px solid var(--outline-color);

	&:focus-within {
		border-bottom: 5px solid var(--text-color);
	}

	@media screen and (min-width: 640px) {
		width: 400px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const Input = styled.input`
	padding: 1rem 1rem;
	width: 300px;
	font-size: 24px;
	font-weight: 900;
	border: none;
	color: var(--text-color);
	outline: none;

	@media screen and (min-width: 640px) {
		padding: 1rem 2rem;
		width: 400px;
		font-size: 30px;
	}

	@media screen and (min-width: 768px) {
		width: 600px;
	}
`;

const RefreshButton = styled(Button)`
	position: absolute;
	right: 4rem;
	display: inline-flex;
	align-items: center;
	padding: 0.3rem;
	border-radius: 9999px;

	&:hover {
		background-color: var(--outline-color);
	}

	svg {
		color: var(--text-color);
		font-size: 30px;
	}

	@media screen and (min-width: 640px) {
		right: 4.5rem;

		svg {
			font-size: 40px;
		}
	}
`;

const SearchButton = styled(Button)`
	position: absolute;
	right: 0;
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 1rem;
	border-radius: var(--radius);
	font-size: 27px;

	@media screen and (min-width: 640px) {
		svg {
			font-size: 36px;
		}
	}
`;

export default SearchInput;
