import { HTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	type: 'button' | 'submit';
	onClick?: () => void;
	children?: ReactNode;
}

const Button = ({ type, onClick, children, ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			css={{
				padding: '0.8rem 1.2rem',
				borderRadius: '8px',
				fontSize: '16px',
				fontWeight: '600',
			}}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
