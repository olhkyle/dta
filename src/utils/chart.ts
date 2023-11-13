const createBackgroundColors = (dataLength: number) => Array.from({ length: dataLength }, (_, idx) => `rgba(70, 223, ${15 * idx}, 0.3)`);

export default createBackgroundColors;
