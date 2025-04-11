import { forwardRef, RefObject } from 'react';
import styled from '@emotion/styled';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { Id as ToastifyId } from 'react-toastify';
import { Button, Flex } from '.';

interface SearchInputProps {
	value: string;
	setValue: (value: string) => void;
	clearValue?: () => void;
	onKeyDown?: (e: React.SyntheticEvent) => void;
	onSearchButtonClick?: () => Promise<ToastifyId | undefined>;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({ value, setValue, clearValue, onKeyDown, onSearchButtonClick }, ref) => {
		return (
			<Container
				role="search"
				justifyContent={'space-between'}
				alignItems={'center'}
				gap={'16px'}
				margin={' 48px auto 64px'}
				padding={'var(--padding-md) var(--padding-sm) 0'}
				maxWidth={'960px'}
				width={'100%'}>
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

							(ref as RefObject<HTMLInputElement>)?.current?.focus();
						}}>
						<MdClose />
					</RefreshButton>
				)}
				<SearchButton type="button" onClick={onSearchButtonClick}>
					<HiOutlineSearch color="var(--text-color)" />
				</SearchButton>
			</Container>
		);
	},
);

const Container = styled(Flex)`
	border-bottom: 5px solid var(--border-color);

	&:focus-within {
		border-bottom: 5px solid var(--text-color);
	}

	@media screen and (max-width: 640px) {
		gap: 8px;
		padding: var(--padding-sm) var(--padding-sm) var(--padding-md) var(--padding-md);
		max-width: 360px;
	}

	@media screen and (max-width: 375px) {
		padding: var(--padding-md) var(--padding-md) var(--padding-md);
		max-width: 320px;
	}
`;

const Input = styled.input`
	width: 100%;
	min-height: 45px;
	font-size: var(--fz-h5);
	font-weight: var(--fw-black);
	border: none;
	color: var(--text-color);
	outline: none;

	@media screen and (min-width: 640px) {
		padding: var(--padding-md);
		font-size: var(--fz-h4);
	}
`;

const RefreshButton = styled(Button)`
	display: inline-flex;
	align-items: center;
	padding: var(--padding-sm);
	font-size: 27px;
	border-radius: var(--radius-extra);

	&:hover {
		background-color: var(--btn-light-bg-color);
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
	padding: calc(var(--padding-sm) * 0.5) var(--padding-sm);
	border-radius: var(--radius);
	font-size: 27px;

	@media screen and (min-width: 640px) {
		svg {
			font-size: var(--fz-h4);
		}
	}
`;

export default SearchInput;
