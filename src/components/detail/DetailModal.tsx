import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Input, Text, Button, NativeSelect, Flex, DatePicker, SmallLoading } from '../../components';
import { RegisterSchema, registerSchema, SubmitHandler } from '../../components/register/schema';
import { WorkerWithId } from '../../service/workData';
import { useOverlayFixed, useEditWorkerMutation, useRemoveWorkerMutation } from '../../hooks';
import { useAppSelector } from '../../store/store';
import { QueryRefetch } from '../../store/modalSlice';
import { getIsAdmin } from '../../store/userSlice';
import { unformatCurrencyUnit } from '../../utils/currencyUnit';
import sleep from '../../utils/sleep';

interface DetailModalProps {
	data: WorkerWithId;
	isOpen: boolean;
	onClose: () => void;
	refetch: QueryRefetch;
}

type DisabledState = Record<string, boolean>;

const DetailModal = ({ data: worker, isOpen, onClose, refetch }: DetailModalProps) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<RegisterSchema>({
		mode: 'onChange',
		resolver: zodResolver(registerSchema),
		shouldFocusError: true,
	});

	const [selectedDay, setSelectedDay] = useState<Date | undefined>();
	const [disabled, setDisabled] = useState<DisabledState>({
		workerName: true,
		registrationNumberFront: true,
		registrationNumberBack: true,
		workedDate: true,
		workspace: true,
		businessNumber: true,
		remittanceType: true,
		payment: true,
		memo: true,
	});

	const [isDeleteProcessLoading, setDeleteProcessLoading] = useState(false);
	const navigate = useNavigate();
	const isAdmin = useAppSelector(getIsAdmin);

	useOverlayFixed(isOpen);

	useEffect(() => {
		for (const [key, value] of Object.entries(worker)) {
			if (
				key === 'workerName' ||
				key === 'registrationNumberFront' ||
				key === 'registrationNumberBack' ||
				key === 'workspace' ||
				key === 'businessNumber' ||
				key === 'remittanceType' ||
				key === 'payment' ||
				key === 'memo'
			) {
				setValue(key, value);
			}
		}
		setSelectedDay(worker.workedDate);
	}, []);

	const editMutate = useEditWorkerMutation(worker.id);
	const removeMutate = useRemoveWorkerMutation(worker.id);

	const isAllFieldsDisabled: boolean = Object.values(disabled).every(item => item === false);

	const toggleAllFieldsDisabled = () => {
		if (!isAdmin) {
			toast.warn('Update Feature is Admin Only');
			return;
		}

		const updatedState: DisabledState = {};

		const disabledKeys = Object.keys(disabled);

		for (const key of disabledKeys) {
			updatedState[key] = !disabled[key];
		}

		setDisabled(updatedState);
	};

	const handleRemoveWorkerButton = async (loading = true) => {
		if (!isAdmin) {
			toast.warn('Delete Feature is Admin Only');
			return;
		}

		try {
			if (loading) setDeleteProcessLoading(true);
			await sleep(1000);
			removeMutate({ id: worker.id });

			refetch();
			onClose();
			toast.success('성공적으로 삭제 되었습니다.');
		} catch (e) {
			console.error(e);
		} finally {
			if (loading) setDeleteProcessLoading(false);
		}
	};

	const onSubmit: SubmitHandler<RegisterSchema> = fields => {
		editMutate({
			id: worker.id,
			workedDate: selectedDay,
			...fields,
			payment: unformatCurrencyUnit(fields.payment),
		});

		// TODO: refetch 짝수번째에 되지 않는 간헐적 문제
		refetch();
		onClose();
		toast.success('성공적으로 수정되었습니다.');
	};

	return (
		<>
			<Container>
				<Header>
					<Flex justifyContent="space-between">
						<Text typo="h4" color="var(--text-color)">
							👨🏻‍💻 일용직 수정
						</Text>
						<CloseModalButton type="button" id="modify" onClick={onClose}>
							<MdClose size="24" color="var(--text-color)" />
						</CloseModalButton>
					</Flex>
					<Flex gap="16px">
						<ModifyButton type="button" onClick={toggleAllFieldsDisabled}>
							{isAllFieldsDisabled ? '수정취소' : '수정하기'}
						</ModifyButton>
						<ViewWorkerDetailButton
							type="button"
							onClick={() => {
								onClose();
								navigate(`/worker/${worker.id}`, { state: { worker } });
							}}>
							일용직 상세보기
						</ViewWorkerDetailButton>
					</Flex>
				</Header>
				<Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Input label="성 명" bottomText={errors?.workerName?.message}>
							<Input.TextField
								type="text"
								placeholder="이름을 입력하세요"
								{...register('workerName')}
								error={errors?.workerName?.message}
								disabled={disabled.workerName}
							/>
						</Input>
						<CustomFlex alignItems="flex-start" gap="16px">
							{isAdmin ? (
								<>
									<Input label="주민등록번호 앞 자리" bottomText={errors?.registrationNumberFront?.message}>
										<Input.TextField
											type="text"
											placeholder="주민등록번호 앞 6자리"
											{...register('registrationNumberFront')}
											error={errors?.registrationNumberFront?.message}
											disabled={disabled.registrationNumberFront}
										/>
									</Input>
									<Input label="주민등록번호 뒷 자리" bottomText={errors?.registrationNumberBack?.message}>
										<Input.TextField
											type="text"
											placeholder="주민등록번호 뒤 7자리"
											{...register('registrationNumberBack')}
											error={errors?.registrationNumberBack?.message}
											disabled={disabled.registrationNumberBack}
										/>
									</Input>
								</>
							) : (
								<Flex direction="column" alignItems="flex-start" gap="8px">
									<div css={{ fontSize: '17px', fontWeight: 'var(--fw-medium)' }}>주민등록번호</div>
									<CustomFlex gap="16px">
										<Confidential>Classified</Confidential>
										<Confidential>Classified</Confidential>
									</CustomFlex>
								</Flex>
							)}
						</CustomFlex>

						<DatePicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} disabled={disabled.workedDate} />

						<CustomFlex alignItems="flex-start" gap="16px">
							<Input label="근로 지역" bottomText={errors?.workspace?.message}>
								<Input.TextField
									type="text"
									placeholder="작업 공간 이름"
									{...register('workspace')}
									error={errors?.workspace?.message}
									disabled={disabled.workspace}
								/>
							</Input>
							<Input label="사업개시번호" bottomText={errors?.businessNumber?.message}>
								<Input.TextField
									type="text"
									placeholder="000-00-00000-0"
									{...register('businessNumber')}
									error={errors?.businessNumber?.message}
									disabled={disabled.businessNumber}
								/>
							</Input>
						</CustomFlex>

						<CustomFlex alignItems="flex-start" gap="16px">
							<NativeSelect label="송금 유형" bottomText={errors?.remittanceType?.message}>
								<NativeSelect.Field
									id="송금 유형"
									{...register('remittanceType')}
									error={errors?.remittanceType?.message}
									disabled={disabled.remittanceType}
								/>
							</NativeSelect>
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
											disabled={disabled.payment}
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
								disabled={disabled.memo}
							/>
						</Input>
						{Object.values(disabled).every(val => val === false) && (
							<UpdateButton type="submit" id="update" disabled={!isAllFieldsDisabled} aria-label="update-button">
								수정완료
							</UpdateButton>
						)}
						<Flex direction="column" margin="80px 0">
							<Text color="var(--btn-hover-color)">
								해당 정보가 불필요하다면 <strong css={{ textDecoration: 'underline' }}>삭제하기</strong>를 클릭해 주세요🫨
							</Text>
							<DeleteButton type="button" id="delete" aria-label="delete-button" onClick={handleRemoveWorkerButton}>
								삭제하기
								{isDeleteProcessLoading && <SmallLoading />}
							</DeleteButton>
						</Flex>
					</Form>
				</Body>
			</Container>
			<Overlay onClick={onClose} />
		</>
	);
};

const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 32px 16px;
	min-height: 360px;
	width: 100dvw;
	height: calc(100dvh - var(--nav-height));
	border-radius: var(--radius);
	transform: translate(-50%, -50%);
	background-color: var(--bg-color);
	border: 1px solid var(--outline-color);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
	z-index: 9999;

	@media screen and (min-width: 720px) {
		height: calc(100dvh - 2 * var(--nav-height));
		width: 720px;
		padding: 32px;
	}
`;

const Header = styled.div``;

const CloseModalButton = styled(Button)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	border-radius: 9999px;
	background-color: var(--outline-color);

	&:hover {
		outline: 1px solid var(--text-color);
		outline-offset: 2px;
	}

	@media screen and (min-width: 640px) {
		right: -2.5%;
	}
`;

const ModifyButton = styled(Button)`
	margin-top: 24px;
	padding: 8px 12px;
	color: var(--bg-color);
	background-color: var(--color-green-50);

	&:hover {
		background-color: var(--color-green-200);
	}
`;

const ViewWorkerDetailButton = styled(Button)`
	margin-top: 24px;
	padding: 8px 12px;
	color: var(--bg-color);
	background-color: var(--color-orange-100);

	&:hover {
		background-color: var(--color-orange-200);
	}
`;

const Body = styled.div`
	display: flex;
	justify-content: center;
	gap: 64px;
	margin: 16px 0 16px;
	padding: 16px;
	width: 100%;
	height: calc(100% - 15dvh);
	border: 1px solid #e1e1e1;
	border-radius: var(--radius);
	overflow: scroll;

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	::-webkit-scrollbar {
		display: none;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin: 0 auto;
`;

const CustomFlex = styled(Flex)`
	flex-direction: column;

	@media screen and (min-width: 640px) {
		flex-direction: row;
	}
`;

const Confidential = styled.div`
	margin: 0;
	padding: 12px 16px;
	min-width: 250px;
	width: 100%;
	font-size: var(--fz-rp);
	font-weight: var(--fw-medium);
	line-height: 24px;
	border: none;
	border-radius: var(--radius);
	background-color: var(--outline-color);
	backdrop-filter: blur(4px);
	color: var(--color-gray-500);
`;

const UpdateButton = styled(Button)`
	margin: 16px auto 0;
	min-width: 300px;
	width: 100%;
	color: var(--btn-text-color);
	background-color: var(--color-green-300);

	&:hover {
		background-color: var(--color-green-200);
	}
`;

const DeleteButton = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;
	margin: 16px auto;
	min-width: 300px;
	width: 100%;
	color: var(--bg-color);
	border: 1px solid var(--text-color);
	background-color: var(--btn-bg-color);
	transition: all 0.1s ease-in-out;

	&:hover {
		background-color: var(--btn-hover-bg-color);
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	backdrop-filter: blur(3px);
	background-color: var(--backdrop-blur-bg-color);
	z-index: var(--overlay-index);
`;

export default DetailModal;
