import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninSchema, signInSchema } from './schema';
import { Button, Flex, Input, Spacer, Text } from '..';
import { signIn } from '../../service/auth';
import { useSetUser } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setFocus,
	} = useForm<SigninSchema>({ resolver: zodResolver(signInSchema), shouldFocusError: true });

	const { setCurrentUser } = useSetUser();
	const navigate = useNavigate();

	const onSubmit = async (data: SigninSchema) => {
		try {
			const userData = await signIn(data);

			setCurrentUser({ ...userData });
			toast.success('성공적으로 로그인 되었습니다');
			navigate(routes.HOME);
		} catch (e) {
			reset();
			toast.error('이메일 또는 비밀번호가 틀립니다');
			console.error(e);
		}
	};

	useEffect(() => {
		setFocus('email');
	}, [setFocus]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" gap="1.5rem">
				<Input label="이메일" bottomText={errors?.email?.message}>
					<Input.TextField
						type="text"
						placeholder="이메일을 입력해 주세요."
						{...register('email')}
						error={errors?.email?.message}
						width={500}
					/>
				</Input>

				<Input label="비밀번호" bottomText={errors?.password?.message}>
					<Input.TextField
						type="password"
						placeholder="비밀번호를 입력해 주세요."
						{...register('password')}
						error={errors?.password?.message}
						width={500}
					/>
				</Input>
			</Flex>
			<LoginButton type="submit" width={500}>
				로그인
			</LoginButton>
			<Spacer size={16} />
			<Text typo="p" color="var(--text-color)">
				서비스 이용을 위해서 보안 상 로그인이 필요합니다.
			</Text>

			<Spacer size={400} />
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	padding-top: 5rem;
`;

const LoginButton = styled(Button)<{ width: number }>`
	margin-top: 1.5rem;
	width: 340px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default SignInForm;
