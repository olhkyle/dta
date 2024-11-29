import styled from '@emotion/styled';
import { Flex, RegisterForm } from '../components';

const Register = () => {
	return (
		<Container margin="0 auto" width="100%" padding="0 16px">
			<RegisterForm />
		</Container>
	);
};

const Container = styled(Flex)`
	max-width: 600px;
`;

export default Register;
