import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, Flex, Input, NativeSelect, Spacer, Text } from '..';
import { RegisterSchema, registerSchema } from './schema';
import { addWorker } from '../../service/workData';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { toast } from 'react-toastify';
import { unformatCurrencyUnit } from '../../utils/currencyUnit';

export interface Worker extends RegisterSchema {
	workedDate: Date | any;
}

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		control,
	} = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema), shouldFocusError: true });

	const navigate = useNavigate();

	const [selectedDay, setSelectedDay] = useState<Date | undefined>();

	const onSubmit = async (data: RegisterSchema) => {
		try {
			await addWorker({
				...data,
				workedDate: selectedDay ?? new Date(),
				payment: unformatCurrencyUnit(data.payment),
				remittance: unformatCurrencyUnit(data.remittance),
			});
			navigate(routes.HOME);
			toast.success('성공적으로 등록되었습니다.');
		} catch (e) {
			console.error(e);
			toast.error('등록에 문제가 발생하였습니다.');
		}
	};

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
			<Flex alignItems="flex-start" gap="0.5rem">
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

			<Controller
				name="payment"
				control={control}
				render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => {
					console.log(value);
					return (
						<Input label="지급 금액" bottomText={error?.message} rightText="원">
							<Input.ControlledTextField
								type="text"
								placeholder="지급 금액"
								name={name}
								value={
									value
										? value
												.toString()
												.replace(/,/gi, '')
												.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
										: ''
								}
								onChange={onChange}
								onBlur={onBlur}
								error={error?.message}
								width={300}
							/>
						</Input>
					);
				}}
			/>

			<Flex alignItems="flex-start" gap="1rem">
				<NativeSelect label="송금 유형" bottomText={errors?.remittanceType?.message}>
					<NativeSelect.Field id="송금 유형" {...register('remittanceType')} error={errors?.remittanceType?.message} width={250} />
				</NativeSelect>

				<Controller
					name="remittance"
					control={control}
					render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
						<Input label="송금 금액" bottomText={error?.message} rightText="원">
							<Input.ControlledTextField
								type="text"
								placeholder="송금 금액"
								name={name}
								value={
									value
										? value
												.toString()
												.replace(/,/gi, '')
												.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
										: ''
								}
								onChange={onChange}
								onBlur={onBlur}
								error={error?.message}
								width={300}
							/>
						</Input>
					)}
				/>
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
