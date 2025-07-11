import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SigninSchema, signInSchema, Button, Flex, Input, Spacer, HighlightText } from '..';
import { signIn } from '../../service/auth';
import { useLoading, useSetUser } from '../../hooks';
import { routes } from '../../constants';

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
				queryClient.setQueryData(['auth'], userData);
				toast.success('성공적으로 로그인 되었습니다');
				navigate(routes.OVERVIEW);
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
			<Header direction={'row'} gap={'8px'} margin={'0 0 16px'} width={'100%'}>
				<Logo>
					<img src="/nasa.svg" />
				</Logo>
			</Header>
			<Flex direction={'column'} gap={'16px'} width={'100%'}>
				<Input label={'이메일'} bottomText={errors?.email?.message}>
					<Input.TextField type="text" placeholder="example@email.com" {...register('email')} error={errors?.email?.message} />
				</Input>

				<Input label={'비밀번호'} bottomText={errors?.password?.message}>
					<Input.TextField type="password" placeholder="********" {...register('password')} error={errors?.password?.message} />
				</Input>
			</Flex>
			<LoginButton type="submit">{isLoading ? <Loading /> : '로그인'}</LoginButton>
			<Spacer size={16} />

			<Description>
				<HighlightText color={'var(--color-blue-200)'} bgColor={'var(--white)'} fontSize={'var(--fz-sm)'} textAlign="start">
					이 서비스는 특정 회사를 위한 것으로 제한적인 서비스의 테스트를 원하는 경우,{' '}
					<TestAccountLink to={'https://kwonkyle.vercel.app'} target="_blank">
						해당 페이지의 이메일
					</TestAccountLink>{' '}
					로 요청주세요
				</HighlightText>
			</Description>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto 64px;
	padding: 5em var(--padding-md) 0;
	max-width: 360px;
	width: 100%;

	@media screen and (min-width: 640px) {
		padding-top: 10em;
	}
`;

const Header = styled(Flex)`
	width: 100%;
`;

const Logo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-sm) * 1.2);
	background-color: var(--color-gray-opacity-50);
	border-radius: var(--radius);
	border: 1px solid var(--color-gray-200);

	img {
		display: block;
		width: 100%;
		height: 100%;
	}
`;

const LoginButton = styled(Button)`
	margin-top: 32px;
	min-width: 270px;
	min-height: 48px;
	width: 100%;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);
	transition: background-color 0.15s ease-in-out;

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

const Description = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: calc(var(--padding-sm) * 0.75);
	background-color: var(--color-blue-50);
	border-radius: var(--radius);
	line-height: 1.75;
	cursor: pointer;
`;

const TestAccountLink = styled(Link)`
	padding: calc(var(--padding-sm) * 0.5);
	color: var(--color-white);
	background-color: var(--color-blue-300);
	border-radius: var(--radius);
	transition: background-color 0.15s ease-in-out;

	&:hover {
		background-color: var(--color-blue-200);
	}
`;

export default SignInForm;
