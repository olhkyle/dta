interface CircleProps {
	size: number;
	bgColor: string;
}

const Circle = ({ size, bgColor }: CircleProps) => {
	return <div css={{ width: `${size}px`, height: `${size}px`, backgroundColor: bgColor, borderRadius: '9999px' }} />;
};

export default Circle;
