import { Children, ForwardedRef, HTMLAttributes, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';
import styled from '@emotion/styled';
import { useId } from '../../hooks';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	label?: ReactNode;
	children: ReactElement;
	bottomText?: string;
	rightText?: string;
	width?: number;
}

const Input = ({ label, children, bottomText, rightText, width = 250, ...props }: InputProps) => {
	const child = Children.only(children);
	const generatedId = useId('input');
	const id = child.props.id ?? generatedId;
	const isError: boolean = child.props.error ?? false;

	return (
		<div css={{ display: 'flex', flexDirection: 'column' }} {...props}>
			<label
				htmlFor={id}
				css={{
					display: `${label ? 'inline-block' : 'none'}`,
					padding: '4px 0',
					fontWeight: '500',
					lineHeight: 1.6,
					color: 'var(--text-color)',
				}}>
				{label}
			</label>
			<div css={{ display: 'flex', alignItems: 'center' }}>
				{cloneElement(child, { id, ...child.props })}
				{rightText !== null ? <RightText>{rightText}</RightText> : null}
			</div>
			{bottomText !== null ? (
				<BottomText isError={isError} width={width}>
					{bottomText}
				</BottomText>
			) : null}
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
	width: number;
}

Input.TextField = forwardRef(
	({ type, name, placeholder, error, disabled = false, width = 270, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<TextField
				type={type}
				name={name}
				placeholder={placeholder}
				ref={ref}
				error={error!}
				disabled={disabled}
				autoComplete="off"
				width={width}
				{...props}
			/>
		);
	},
);

Input.ControlledTextField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	error,
	disabled = false,
	width,
	...props
}: TextFieldProps) => {
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
			width={width}
			{...props}
		/>
	);
};

const RightText = styled.span`
	display: inline-block;
	margin-left: 0.5rem;
	font-weight: 600;
`;

const BottomText = styled.p<{ isError: boolean; width: number }>`
	display: inline-block;
	margin: 4px 0 0 0;
	width: 250px;
	color: ${({ isError }) => (isError ? 'var(--color-green-300)' : 'var(--color-gray-400)')};
	font-size: 14px;
	font-weight: 400;

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

const TextField = styled.input<{ width: number; error: string; disabled: boolean }>`
	margin: 0;
	padding: 0.75rem 1rem;
	min-width: 270px;
	font-size: 16px;
	line-height: 24px;
	border: none;
	border-radius: var(--radius);
	color: ${({ disabled }) => (disabled ? 'var(--disabled-text-color)' : 'var(--text-color)')};
	background-color: ${({ disabled }) => (disabled ? 'var(--outline-color)' : 'var(--bg-color)')};
	box-shadow: ${({ error }) => (error ? 'inset 0 0 0 1px var(--color-green-50)' : 'inset 0 0 0 1px var(--outline-color)')};
	outline: none;
	cursor: pointer;
	-webkit-appearance: none;

	&:focus {
		box-shadow: ${({ error }) => (error ? 'inset 0 0 0 2px var(--color-green-50)' : 'inset 0 0 0 1px var(--text-color)')};
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default Input;
