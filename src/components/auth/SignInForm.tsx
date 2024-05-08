import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigninSchema, signInSchema } from './schema';
import { signIn } from '../../service/auth';
import { useSetUser } from '../../hooks';
import { Button, Flex, Input, Spacer, Text } from '..';
import routes from '../../constants/routes';

const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setFocus,
	} = useForm<SigninSchema>({ resolver: zodResolver(signInSchema), shouldFocusError: true });

	const navigate = useNavigate();
	const { setCurrentUser } = useSetUser();

	const onSubmit = async (data: SigninSchema) => {
		try {
			const userData = await signIn(data);

			setCurrentUser({ ...userData });
			toast.success('성공적으로 로그인 되었습니다');
			navigate(routes.HOME, { replace: true });
		} catch (e) {
			setFocus('email');
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
			<Flex direction="column" gap="1rem">
				<Input label="이메일" bottomText={errors?.email?.message} width={350}>
					<Input.TextField
						type="text"
						placeholder="이메일을 입력해 주세요."
						{...register('email')}
						error={errors?.email?.message}
						width={350}
					/>
				</Input>

				<Input label="비밀번호" bottomText={errors?.password?.message} width={350}>
					<Input.TextField
						type="password"
						placeholder="비밀번호를 입력해 주세요."
						{...register('password')}
						error={errors?.password?.message}
						width={350}
					/>
				</Input>
			</Flex>
			<LoginButton type="submit" width={350}>
				로그인
			</LoginButton>
			<Spacer size={16} />
			<Text typo="p" color="var(--text-color)">
				서비스 이용을 위해 로그인이 필요합니다.
			</Text>
			<Spacer size={300} />
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	padding-top: 10rem;
`;

const LoginButton = styled(Button)<{ width: number }>`
	margin-top: 1.5rem;
	min-width: 280px;
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
