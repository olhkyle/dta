import { Children, ForwardedRef, HTMLAttributes, ReactElement, cloneElement, forwardRef } from 'react';
import styled from '@emotion/styled';
import { useId } from '../../hooks';

interface SelectProps {
	label?: string;
	children: ReactElement;
	bottomText?: string;
}

const Select = ({ label, bottomText, children }: SelectProps) => {
	const child = Children.only(children);
	const generatedId = useId('select');
	const id = child.props.id ?? generatedId;
	const isError = child.props.error ?? false;

	return (
		<div css={{ display: 'flex', flexDirection: 'column' }}>
			<label
				css={{
					display: `${label ? 'inline-block' : 'none'}`,
					padding: '4px 0',
					fontSize: 'var(--text-label)',
					fontWeight: '500',
					lineHeight: 1.6,
					color: 'var(--text-color)',
				}}>
				{label}
			</label>
			{cloneElement(child, { id, ...child.props })}
			{bottomText !== null ? <BottomText isError={isError}>{bottomText}</BottomText> : null}
		</div>
	);
};

interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
	name: string;
	error: string | undefined;
	width: number;
}

Select.Field = forwardRef(({ onChange, onBlur, name, error, width, ...props }: SelectFieldProps, ref: ForwardedRef<HTMLSelectElement>) => {
	return (
		<SelectField
			name={name}
			placeholder="선택해 주세요"
			ref={ref}
			onChange={onChange}
			onBlur={onBlur}
			aria-invalid="false"
			error={error!}
			width={width}
			{...props}>
			<option value="">---선 택--- </option>
			<option value="개인">개 인</option>
			<option value="사업자">사업자</option>
		</SelectField>
	);
});

const BottomText = styled.p<{ isError: boolean }>`
	display: inline-block;
	margin-top: 4px;
	color: ${({ isError }) => (isError ? 'var(--color-green-300)' : 'var(--color-gray-400)')};
	font-size: 14px;
	font-weight: 400;
`;

const SelectField = styled.select<{ width: number; error: string }>`
	margin: 0;
	padding: 0.75rem 1rem;
	min-width: 200px;
	font-size: 16px;
	line-height: 24px;
	border: none;
	border-radius: 8px;
	color: var(--text-color);
	outline: none;
	cursor: pointer;

	box-shadow: ${({ error }) => (error ? 'inset 0 0 0 1px var(--color-green-50)' : 'inset 0 0 0 1px var(--outline-color)')};

	&:focus {
		box-shadow: ${({ error }) => (error ? 'inset 0 0 0 2px var(--color-green-50)' : 'inset 0 0 0 1px var(--text-color)')};
	}

	option {
		cursor: pointer;
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default Select;
