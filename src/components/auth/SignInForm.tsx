import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigninSchema, signInSchema } from './schema';
import { signIn } from '../../service/auth';
import { useLoading, useSetUser } from '../../hooks';
import { Button, Flex, Input, Spacer, Text } from '..';
import routes from '../../constants/routes';
import { useQueryClient } from '@tanstack/react-query';

const SignInForm = () => {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setFocus,
	} = useForm<SigninSchema>({ resolver: zodResolver(signInSchema), shouldFocusError: true });

	const navigate = useNavigate();
	const { setCurrentUser } = useSetUser();

	const { Loading, isLoading, startTransition } = useLoading();

	const onSubmit = async (data: SigninSchema) => {
		try {
			const userData = await startTransition(signIn(data));

			if (userData) {
				setCurrentUser(userData);
				navigate(routes.OVERVIEW);
				queryClient.setQueryData(['auth'], userData);
				toast.success('성공적으로 로그인 되었습니다');
			}
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
			<Header direction="row" gap="8px" margin={'0 0 16px 0'} width={'100%'}>
				<div>
					<img src="/nasa.svg" />
				</div>
			</Header>
			<Flex direction="column" gap="16px" width="100%">
				<Input label="이메일" bottomText={errors?.email?.message}>
					<Input.TextField type="text" placeholder="이메일을 입력해 주세요." {...register('email')} error={errors?.email?.message} />
				</Input>

				<Input label="비밀번호" bottomText={errors?.password?.message}>
					<Input.TextField
						type="password"
						placeholder="비밀번호를 입력해 주세요."
						{...register('password')}
						error={errors?.password?.message}
					/>
				</Input>
			</Flex>
			<LoginButton type="submit">{isLoading ? Loading() : '로그인'}</LoginButton>
			<Spacer size={16} />
			<Text typo="sm" color="var(--text-color)">
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
	padding: 10em 16px 0;
	max-width: 360px;
	width: 100%;
`;

const Header = styled(Flex)`
	width: 100%;

	div {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 12px;
		background-color: var(--color-gray-opacity-50);
		border-radius: var(--radius);
		border: 1px solid var(--color-gray-200);

		img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
`;

const LoginButton = styled(Button)`
	margin-top: 32px;
	min-width: 270px;
	width: 100%;
	min-height: 48px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);
	transition: background 0.15s ease-in-out;

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

export default SignInForm;
