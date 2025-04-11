import { useTheme } from '../../../hooks';
import { SkeletonItem } from '../../skeleton';

const LoginLinkLoader = () => {
	const [theme] = useTheme();

	return <SkeletonItem width={'95px'} height={'42px'} theme={theme} />;
};

export default LoginLinkLoader;
