import { HTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	type: 'button' | 'submit';
	disabled?: boolean;
	onClick?: () => void;
	children?: ReactNode;
}

const Button = ({ type, disabled = false, onClick, children, ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			css={{
				padding: '0.8rem 1.2rem',
				borderRadius: 'var(--radius)',
				fontSize: 'var(--fz-p)',
				fontWeight: 'var(--fw-semibold)',
				color: 'var(--text-color)',
			}}
			disabled={disabled}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
