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
		<div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<label
				htmlFor={label}
				css={{
					display: `${label ? 'inline-block' : 'none'}`,
					padding: '4px 0',
					fontWeight: 'var(--fw-medium)',
					lineHeight: 1.6,
					color: 'var(--text-color)',
				}}>
				{label}
			</label>
			{cloneElement(child, { id, ...child.props })}
			{bottomText && <BottomText isError={isError}>{bottomText}</BottomText>}
		</div>
	);
};

interface SelectFieldProps extends HTMLAttributes<HTMLSelectElement> {
	id: string;
	name: string;
	error: string | undefined;
	disabled?: boolean;
}

Select.Field = forwardRef(
	({ id, name, onChange, onBlur, error, disabled, ...props }: SelectFieldProps, ref: ForwardedRef<HTMLSelectElement>) => {
		return (
			<SelectField
				id={id}
				name={name}
				ref={ref}
				onChange={onChange}
				onBlur={onBlur}
				aria-invalid="false"
				error={error!}
				disabled={disabled ?? false}
				aria-disabled={disabled}
				{...props}>
				<option value="사업자">사업자</option>
				<option value="개인">개 인</option>
			</SelectField>
		);
	},
);

const BottomText = styled.p<{ isError: boolean }>`
	display: inline-block;
	margin-top: 4px;
	color: ${({ isError }) => (isError ? 'var(--color-green-300)' : 'var(--color-gray-400)')};
	font-size: var(--fz-m);
	font-weight: var(--fw-regular);
`;

const SelectField = styled.select<{ error: string; disabled: boolean }>`
	margin: 0;
	padding: 12px 16px;
	min-width: 270px;
	width: 100%;
	font-size: var(--fz-rp);
	line-height: 24px;
	border: none;
	border-radius: var(--radius);
	color: ${({ disabled }) => (disabled ? 'var(--disabled-text-color)' : 'var(--text-color)')};
	background-color: ${({ disabled }) => (disabled ? 'var(--outline-color)' : 'var(--color-gray-opacity-50)')};
	outline: none;
	cursor: pointer;

	box-shadow: ${({ error }) => (error ? 'inset 0 0 0 1px var(--color-green-50)' : 'inset 0 0 0 1px var(--outline-color)')};

	&:focus {
		box-shadow: ${({ error }) => (error ? 'inset 0 0 0 2px var(--color-green-50)' : 'inset 0 0 0 1px var(--color-gray-600)')};
	}

	option {
		padding: 16px;
		cursor: pointer;
	}
`;

export default Select;
