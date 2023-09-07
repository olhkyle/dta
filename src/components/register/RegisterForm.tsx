import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, Flex, Input, Spacer, Text } from '..';
import { RegisterSchema, registerSchema } from './schema';

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema), shouldFocusError: true });

	const [selectedDay, setSelectedDay] = useState<Date | undefined>();

	const onSubmit = async () => {};

	useEffect(() => {
		setFocus('workerName');
	}, [setFocus]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Text typo="h2" color="var(--text-color)">
				일용직 등록
			</Text>
			<Spacer size={8} />
			<Input label="성 명" bottomText={errors?.workerName?.message}>
				<Input.TextField type="text" placeholder="이 름" {...register('workerName')} error={errors?.workerName?.message} width={300} />
			</Input>
			<Flex alignItems="center" gap="0.5rem">
				<Input label="주민번호 앞 자리" bottomText={errors?.registrationNumberFront?.message} rightText="−">
					<Input.TextField
						type="text"
						placeholder="주민번호 앞 6자리"
						{...register('registrationNumberFront')}
						error={errors?.registrationNumberFront?.message}
						width={300}
					/>
				</Input>
				<Input label="주민번호 뒷 자리" bottomText={errors?.registrationNumberBack?.message}>
					<Input.TextField
						type="text"
						placeholder="주민번호 뒤 7자리"
						{...register('registrationNumberBack')}
						error={errors?.registrationNumberBack?.message}
						width={300}
					/>
				</Input>
			</Flex>

			<DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

			<Flex gap="1rem">
				<Input label="지급 금액" bottomText={errors?.paymentAmount?.message} rightText="원">
					<Input.TextField
						type="text"
						placeholder="지급 금액"
						{...register('paymentAmount')}
						error={errors?.paymentAmount?.message}
						width={300}
					/>
				</Input>
			</Flex>
			<Flex gap="1rem">
				<Input label="송금 금액" bottomText={errors?.remittanceAmount?.message} rightText="원">
					<Input.TextField
						type="text"
						placeholder="송금 금액"
						{...register('remittanceAmount')}
						error={errors?.remittanceAmount?.message}
						width={300}
					/>
				</Input>
			</Flex>
			<Input label="메모/기타" bottomText={errors?.memo?.message}>
				<Input.TextField
					type="text"
					placeholder="기타 필요한 사항을 기입하세요."
					{...register('memo')}
					error={errors?.memo?.message}
					width={600}
				/>
			</Input>
			<RegisterButton type="submit" width={600}>
				등록하기
			</RegisterButton>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin: 0 auto;
	padding-top: 5rem;
`;

const RegisterButton = styled(Button)<{ width: number }>`
	margin-top: 1.5rem;
	width: 400px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default RegisterForm;
