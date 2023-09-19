interface CircleProps {
	size: number;
	bgColor: string;
}

const Circle = ({ bgColor, size }: CircleProps) => {
	return <div css={{ width: `${size}px`, height: `${size}px`, backgroundColor: bgColor, borderRadius: '9999px' }} />;
};

export default Circle;
