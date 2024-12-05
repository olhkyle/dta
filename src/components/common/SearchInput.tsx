import { useRef } from 'react';
import styled from '@emotion/styled';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Button, Flex } from '.';
import { Id as ToastifyId } from 'react-toastify';

interface SearchInputProps {
	value: string;
	setValue: (value: string) => void;
	clearValue?: () => void;
	onKeyDown?: (e: React.SyntheticEvent) => void;
	onSearchButtonClick?: () => Promise<ToastifyId | undefined>;
}

const SearchInput = ({ value, setValue, clearValue, onKeyDown, onSearchButtonClick }: SearchInputProps) => {
	const ref = useRef(null);

	return (
		<Container justifyContent="space-between" alignItems="center" gap="16px" role="search">
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
	margin: 48px auto 64px;
	padding: 16px 8px 0;
	max-width: 960px;
	width: 100%;
	border-bottom: 5px solid var(--outline-color);

	&:focus-within {
		border-bottom: 5px solid var(--text-color);
	}

	@media screen and (max-width: 640px) {
		padding: 8px 8px 16px 16px;
		max-width: 360px;
	}

	@media screen and (max-width: 375px) {
		padding: 16px 16px 16px;
		max-width: 320px;
	}
`;

const Input = styled.input`
	width: 100%;
	font-size: var(--fz-h5);
	font-weight: var(--fw-black);
	border: none;
	color: var(--text-color);
	outline: none;

	@media screen and (min-width: 640px) {
		padding: 16px;
		font-size: var(--fz-h4);
	}
`;

const RefreshButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	padding: 4px 8px;
	font-size: 27px;
	border-radius: 9999px;

	&:hover {
		background-color: var(--outline-color);
	}

	svg {
		color: var(--text-color);
	}

	@media screen and (min-width: 640px) {
		svg {
			font-size: var(--fz-h4);
		}
	}
`;

const SearchButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	padding: 4px 8px;
	border-radius: var(--radius);
	font-size: 27px;

	@media screen and (min-width: 640px) {
		svg {
			font-size: var(--fz-h4);
		}
	}
`;

export default SearchInput;
