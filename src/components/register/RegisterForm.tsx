import { BaseSyntheticEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, Flex, Input, NativeSelect, Spacer, Text } from '..';
import { RegisterSchema, registerSchema } from './schema';
import { addWorker } from '../../service/workData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { unformatCurrencyUnit } from '../../utils/currencyUnit';
import routes from '../../constants/routes';

export interface Worker extends RegisterSchema {
	workedDate: Date | any;
}

export type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => void | Promise<void>;

export type FormSubmitButtonId = 'register' | 'additionalRegister';

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		setValue,
		control,
	} = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema), shouldFocusError: true });

	const navigate = useNavigate();

	const [selectedDay, setSelectedDay] = useState<Date | undefined>();

	const onSubmit: SubmitHandler<RegisterSchema> = async (data, event) => {
		if (event) {
			event.preventDefault();
		}

		const buttonId = ((event?.nativeEvent as any).submitter as HTMLElement)?.id as FormSubmitButtonId;

		try {
			await addWorker({
				...data,
				workedDate: selectedDay ?? new Date(),
				payment: unformatCurrencyUnit(data.payment),
				remittance: unformatCurrencyUnit(data.remittance),
			});

			if (buttonId === 'register') {
				navigate(routes.DETAILS);
			}

			if (buttonId === 'additionalRegister') {
				setValue('workerName', data.workerName);
				setValue('registrationNumberFront', data.registrationNumberFront);
				setValue('registrationNumberBack', data.registrationNumberBack);
				setValue('payment', '', { shouldValidate: true });
				setValue('remittance', '', { shouldValidate: true });
				setValue('memo', '');
				setFocus('payment');
			}

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
				<Input.TextField type="text" placeholder="이 름" {...register('workerName')} error={errors?.workerName?.message} width={280} />
			</Input>
			<CustomFlex alignItems="flex-start" gap="0.5rem">
				<Input label="주민등록번호 앞 자리" bottomText={errors?.registrationNumberFront?.message}>
					<Input.TextField
						type="text"
						placeholder="주민등록번호 앞 6자리"
						{...register('registrationNumberFront')}
						error={errors?.registrationNumberFront?.message}
						width={280}
					/>
				</Input>
				<Input label="주민등록번호 뒷 자리" bottomText={errors?.registrationNumberBack?.message}>
					<Input.TextField
						type="text"
						placeholder="주민등록번호 뒤 7자리"
						{...register('registrationNumberBack')}
						error={errors?.registrationNumberBack?.message}
						width={280}
					/>
				</Input>
			</CustomFlex>

			<DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

			<Controller
				name="payment"
				control={control}
				render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
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
							width={280}
						/>
					</Input>
				)}
			/>

			<CustomFlex alignItems="flex-start" gap="1rem">
				<NativeSelect label="송금 유형" bottomText={errors?.remittanceType?.message}>
					<NativeSelect.Field id="송금 유형" {...register('remittanceType')} error={errors?.remittanceType?.message} width={280} />
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
								width={280}
							/>
						</Input>
					)}
				/>
			</CustomFlex>
			<Input label="메모/기타" bottomText={errors?.memo?.message}>
				<Input.TextField
					type="text"
					placeholder="기타 필요한 사항을 기입하세요."
					{...register('memo')}
					error={errors?.memo?.message}
					width={600}
				/>
			</Input>
			<CustomFlex gap="20px" margin="1.5rem 0 0 0">
				<RegisterButton type="submit" id="register" width={400} aria-label="register-button">
					등록하기
				</RegisterButton>
				<AdditionalRegisterButton type="submit" id="additionalRegister" width={180} aria-label="additional-register-button">
					추가 등록
				</AdditionalRegisterButton>
			</CustomFlex>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin: 0 auto;
	padding-top: 5rem;
	padding-bottom: 5rem;
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;
	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const RegisterButton = styled(Button)<{ width: number }>`
	width: 300px;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

const AdditionalRegisterButton = styled(Button)<{ width: number }>`
	width: 300px;
	color: var(--btn-text-color);
	background-color: var(--color-green-50);

	&:hover {
		background-color: var(--color-green-300);
	}

	@media screen and (min-width: 640px) {
		width: ${({ width }) => `${width}px`};
	}
`;

export default RegisterForm;
