import { useEffect } from 'react';
import styled from '@emotion/styled';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from './schema';
import { Button, Input, Spacer, Text } from '..';
import { signIn } from '../../service/auth';
import useSetUser from '../../hooks/useSetUser';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';

type SigninSchema = z.infer<typeof signInSchema>;

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
			navigate(routes.HOME);
		} catch (e) {
			reset();
			console.error(e);
		}
	};

	useEffect(() => {
		setFocus('email');
	}, [setFocus]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Input label="이메일" bottomText={errors?.email?.message}>
				<Input.TextField
					type="text"
					placeholder="이메일을 입력해 주세요."
					{...register('email')}
					error={errors?.email?.message}
					width={500}
				/>
			</Input>
			<Spacer size={16} />
			<Input label="비밀번호" bottomText={errors?.password?.message}>
				<Input.TextField
					type="password"
					placeholder="비밀번호를 입력해 주세요."
					{...register('password')}
					error={errors?.password?.message}
					width={500}
				/>
			</Input>
			<LoginButton type="submit" width={500} onClick={() => {}}>
				로그인
			</LoginButton>
			<Spacer size={16} />
			<Text typo="p" color="var(--text-color)">
				서비스 이용을 위해서 보안 상 로그인이 필요합니다.
			</Text>
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
