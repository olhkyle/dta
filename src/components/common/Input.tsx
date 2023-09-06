import { Children, ForwardedRef, HTMLAttributes, ReactElement, ReactNode, cloneElement, forwardRef } from 'react';
import styled from '@emotion/styled';
import { useId } from '../../hooks/useId';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	label?: ReactNode;
	children: ReactElement;
	bottomText?: string;
}

const Input = ({ label, children, bottomText, ...props }: InputProps) => {
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
					fontSize: '16px',
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

interface TextFieldProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
	type: 'text' | 'password';
	name: string;
	placeholder: string;
	error: string | undefined;
	width: number;
}

Input.TextField = forwardRef(({ type, name, placeholder, error, width, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
	return (
		<TextField type={type} name={name} placeholder={placeholder} ref={ref} error={error!} autoComplete="off" width={width} {...props} />
	);
});

const BottomText = styled.p<{ isError: boolean }>`
	display: inline-block;
	margin-top: 4px;
	color: ${({ isError }) => (isError ? 'var(--color-green-50)' : 'var(--color-gray-400)')};
	font-size: 14px;
	font-weight: 400;
`;

const TextField = styled.input<{ width: number; error: string }>`
	margin: 0;
	padding: 0.75rem 1rem;
	width: 340px;
	font-size: 14px;
	line-height: 24px;
	border: none;
	border-radius: 8px;
	color: var(--text-color);
	outline: none;
	box-shadow: ${({ error }) => (error ? 'inset 0 0 0 1px var(--color-green-50)' : 'inset 0 0 0 1px var(--outline-color)')};

	&:focus {
		box-shadow: ${({ error }) => (error ? 'inset 0 0 0 2px var(--color-green-50)' : 'inset 0 0 0 1px var(--text-color)')};
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default Input;
