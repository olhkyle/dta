import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
	Button,
	DatePicker,
	Flex,
	HighlightText,
	Input,
	NativeSelect,
	Spacer,
	Text,
	RegisterSchema,
	SubmitHandler,
	registerSchema,
} from '..';
import { addWorker, getSpecificWorker } from '../../service/workData';
import { useLoading } from '../../hooks';
import { sleep, unformatCurrencyUnit } from '../../utils';
import { routes } from '../../constants';

export interface Worker extends RegisterSchema {
	workedDate: Date | any; // technical debt
	createdAt?: Date | any;
}

export type FormSubmitButtonId = 'register' | 'additionalRegister';

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
		setValue,
		getValues,
		control,
		watch,
	} = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema), defaultValues: { workedDate: new Date() } });

	const navigate = useNavigate();

	const { Loading, isLoading, startTransition } = useLoading();

	const findSpecificWorker = async () => {
		try {
			if (getValues('workerName').length === 0) {
				toast.warn('일용직 이름을 입력해 주세요.');
				return;
			}

			const { registrationNumberFront, registrationNumberBack } = await startTransition(
				getSpecificWorker({
					workerName: getValues('workerName'),
				}),
			);

			setValue('registrationNumberFront', registrationNumberFront);
			setValue('registrationNumberBack', registrationNumberBack);

			toast.success('성공적으로 정보를 찾았습니다.');
		} catch {
			toast.error('해당 일용직 이름이 없습니다.');
		}
	};

	const onSubmit: SubmitHandler<RegisterSchema> = async (data, event) => {
		if (event) {
			event.preventDefault();
		}

		const buttonId = ((event?.nativeEvent as any).submitter as HTMLElement)?.id as FormSubmitButtonId;

		try {
			if (buttonId === 'additionalRegister') await sleep(500);

			await startTransition(
				addWorker({
					...data,
					payment: unformatCurrencyUnit(data.payment),
					createdAt: new Date(),
				}),
			);

			if (buttonId === 'register') {
				navigate(routes.DETAILS, { state: { month: watch('workedDate')?.getMonth() } });
			}

			if (buttonId === 'additionalRegister') {
				setValue('workerName', data.workerName);
				setValue('registrationNumberFront', data.registrationNumberFront);
				setValue('registrationNumberBack', data.registrationNumberBack);
				setValue('workspace', data.workspace);
				setValue('businessNumber', data.businessNumber);
				setValue('payment', '', { shouldValidate: true });
				setValue('memo', '');
				setFocus('payment');
			}

			toast.success('성공적으로 등록되었습니다.');
		} catch (e) {
			console.error(e);
			toast.error('등록에 문제가 발생하였습니다.');
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Text typo={'h2'} color={'var(--text-color)'}>
				일용직 등록
			</Text>
			<Spacer size={8} />
			<Input
				label={
					<Flex justifyContent={'space-between'} width={'100%'}>
						성 명
						<CheckExistButton type="button" onClick={findSpecificWorker}>
							{isLoading && <Loading />}
							대상 찾기
						</CheckExistButton>
					</Flex>
				}
				bottomText={errors?.workerName?.message}>
				<Input.TextField type={'text'} placeholder={'이 름'} {...register('workerName')} error={errors?.workerName?.message} />
			</Input>
			<CustomFlex alignItems={'flex-start'} gap={'16px'}>
				<Input label={'주민등록번호 앞 자리'} bottomText={errors?.registrationNumberFront?.message}>
					<Input.TextField
						type={'text'}
						placeholder={'000000'}
						{...register('registrationNumberFront')}
						error={errors?.registrationNumberFront?.message}
					/>
				</Input>
				<Input label={'주민등록번호 뒷 자리'} bottomText={errors?.registrationNumberBack?.message}>
					<Input.TextField
						type={'text'}
						placeholder={'0000000'}
						{...register('registrationNumberBack')}
						error={errors?.registrationNumberBack?.message}
					/>
				</Input>
			</CustomFlex>

			<Controller
				name="workedDate"
				control={control}
				render={({ field: { value, onChange } }) => (
					<DatePicker selected={value} setSelected={(date: Date | undefined) => onChange(date)} />
				)}
			/>

			<CustomFlex alignItems={'flex-start'} gap={'16px'}>
				<Input label={'근로 지역'} bottomText={errors?.workspace?.message}>
					<Input.TextField type={'text'} placeholder={'작업 공간 이름'} {...register('workspace')} error={errors?.workspace?.message} />
				</Input>
				<Input label={'사업개시번호'} bottomText={errors?.businessNumber?.message}>
					<Input.TextField
						type={'text'}
						placeholder={'000-00-00000-0'}
						{...register('businessNumber')}
						error={errors?.businessNumber?.message}
					/>
				</Input>
			</CustomFlex>

			<CustomFlex alignItems={'flex-start'} gap={'16px'}>
				<NativeSelect label={'송금 유형'} bottomText={errors?.remittanceType?.message}>
					<NativeSelect.Field
						data={['사업자', '개인']}
						id={'송금 유형'}
						{...register('remittanceType')}
						error={errors?.remittanceType?.message}
					/>
				</NativeSelect>

				<Controller
					name="payment"
					control={control}
					render={({ field: { name, value, onChange, onBlur }, fieldState: { error } }) => (
						<Input label={'지급 금액'} bottomText={error?.message} rightText={'원'}>
							<Input.ControlledTextField
								type={'text'}
								placeholder={'1,000'}
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
							/>
						</Input>
					)}
				/>
			</CustomFlex>
			<Input label={'메모/기타'} bottomText={errors?.memo?.message}>
				<Input.TextField type={'text'} placeholder={'기타 필요한 사항을 기입하세요'} {...register('memo')} error={errors?.memo?.message} />
			</Input>
			<Flex gap={'16px'} margin={'24px 0 0'}>
				<AdditionalRegisterButton type="submit" id="additionalRegister" aria-label="additional-register-button">
					{isLoading ? <Loading /> : '추가 등록'}
				</AdditionalRegisterButton>
				<RegisterButton type="submit" id="register" aria-label="register-button">
					{isLoading ? <Loading /> : '등록하기'}
				</RegisterButton>
			</Flex>
			<Flex justifyContent={'center'} width={'100%'}>
				<HighlightText color={'var(--disabled-text-color)'} bgColor={'var(--outline-color)'} fontSize={'14px'}>
					💡 추가 등록 시 성명, 주민등록번호, 출력일은 바로 이전에 작성한 내용이 유지됩니다.
				</HighlightText>
			</Flex>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 24px;
	margin: 0 auto;
	padding: calc(var(--padding-md) * 5) 0;
	width: 100%;
`;

const CheckExistButton = styled.button`
	display: inline-flex;
	gap: 0.1rem;
	align-items: center;
	padding: calc(var(--padding-md) * 0.3) calc(var(--padding-md) * 0.6);
	border-radius: var(--radius);
	color: var(--color-white);
	background-color: var(--color-orange-100);
	font-weight: var(--fw-medium);

	&:hover {
		background-color: var(--color-orange-200);
	}
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const RegisterButton = styled(Button)`
	width: 100%;
	color: var(--btn-text-color);
	background-color: var(--btn-bg-color);

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

const AdditionalRegisterButton = styled(Button)`
	width: 100%;
	color: var(--btn-text-color);
	background-color: var(--color-green-50);

	&:hover {
		background-color: var(--color-green-300);
	}
`;

export default RegisterForm;
