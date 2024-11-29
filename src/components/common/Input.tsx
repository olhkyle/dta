import { Children, ForwardedRef, HTMLAttributes, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';
import styled from '@emotion/styled';
import { useId } from '../../hooks';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	label?: ReactNode;
	children: ReactElement;
	bottomText?: string;
	rightText?: string;
}

const Input = ({ label, children, bottomText, rightText, ...props }: InputProps) => {
	const child = Children.only(children);
	const generatedId = useId('input');
	const id = child.props.id ?? generatedId;
	const isError: boolean = child.props.error ?? false;

	return (
		<div css={{ display: 'flex', flexDirection: 'column', width: '100%' }} {...props}>
			<label
				htmlFor={id}
				css={{
					display: `${label ? 'inline-block' : 'none'}`,
					padding: '4px 0',
					fontWeight: 'var(--fw-medium)',
					lineHeight: 1.6,
					color: 'var(--text-color)',
				}}>
				{label}
			</label>
			<div css={{ display: 'flex', alignItems: 'center', width: '100%' }}>
				{cloneElement(child, { id, ...child.props })}
				{rightText && <RightText>{rightText}</RightText>}
			</div>
			{bottomText && <BottomText isError={isError}>{bottomText}</BottomText>}
		</div>
	);
};

interface TextFieldProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
	type: 'text' | 'number' | 'password';
	name: string;
	placeholder: string;
	value?: string;
	error: string | undefined;
	disabled?: boolean;
}

Input.TextField = forwardRef(
	({ type, name, placeholder, error, disabled = false, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<TextField
				type={type}
				name={name}
				placeholder={placeholder}
				ref={ref}
				error={error!}
				disabled={disabled}
				autoComplete="off"
				{...props}
			/>
		);
	},
);

Input.ControlledTextField = ({ type, name, placeholder, value, onChange, onBlur, error, disabled = false, ...props }: TextFieldProps) => {
	return (
		<TextField
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			error={error!}
			disabled={disabled}
			aria-disabled={disabled}
			autoComplete="off"
			{...props}
		/>
	);
};

const RightText = styled.span`
	display: inline-block;
	margin-left: 8px;
	font-weight: var(--fw-semibold);
`;

const BottomText = styled.p<{ isError: boolean }>`
	display: inline-block;
	margin: 4px 0 0 0;
	min-width: 270px;
	color: ${({ isError }) => (isError ? 'var(--color-green-300)' : 'var(--color-gray-400)')};
	font-size: var(--fz-m);
	font-weight: var(--fw-regular);
`;

const TextField = styled.input<{ error: string; disabled: boolean }>`
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
	box-shadow: ${({ error }) => (error ? 'inset 0 0 0 1px var(--color-green-50)' : 'inset 0 0 0 1px var(--outline-color)')};
	transition: color 0.1s ease-in-out;
	outline: none;
	cursor: pointer;
	-webkit-appearance: none;

	&:focus {
		background-color: var(--bg-color);
		box-shadow: ${({ error }) => (error ? 'inset 0 0 0 2px var(--color-green-50)' : 'inset 0 0 0 1px var(--color-gray-600)')};
	}
`;

export default Input;
