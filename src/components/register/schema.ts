import { BaseSyntheticEvent } from 'react';
import { z } from 'zod';

type RegisterSchema = z.infer<typeof registerSchema>;
type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => void | Promise<void>;

const registerSchema = z.object({
	workerName: z
		.string()
		.min(2, { message: '2자 이상의 이름을 입력해 주세요.' })
		.regex(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣()|]+$/, { message: '한글 혹은 영문으로 입력 가능합니다.' }),
	registrationNumberFront: z
		.string()
		.max(6, { message: '최대 6자리까지 입력 가능합니다.' })
		.regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다.' }),
	registrationNumberBack: z
		.string()
		.max(7, { message: '최대 7자리까지 입력 가능합니다.' })
		.regex(/^[0-9]+$/, { message: '숫자만 입력 가능합니다.' }),
	workedDate: z
		.date({
			required_error: '날짜를 선택해 주세요',
			invalid_type_error: '올바른 형식으로 날짜를 선택해 주세요',
		})
		.refine(date => date <= new Date(), '미래의 날짜를 선택할 수 없습니다.'),
	workspace: z.string().min(1, { message: '1자 이상의 작업 공간 이름을 입력해 주세요.' }),
	businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}-\d$/, { message: '000-00-00000-0 형식으로 작성합니다.' }),
	payment: z.string({ required_error: '금액을 입력해 주세요' }).regex(/^[0-9,]+$/, { message: '숫자만 입력 가능합니다.' }),
	remittanceType: z.string(),
	memo: z.string(),
});

export type { RegisterSchema, SubmitHandler };
export { registerSchema };
