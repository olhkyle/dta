import { BaseSyntheticEvent } from 'react';
import { z } from 'zod';

export type RegisterSchema = z.infer<typeof registerSchema>;

export type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => void | Promise<void>;

export const registerSchema = z.object({
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
	workspace: z.string().min(1, { message: '1자 이상의 작업 공간 이름을 입력해 주세요.' }),
	businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}-\d$/, { message: '000-00-00000-0 형식으로 작성합니다.' }),
	payment: z.string().regex(/^[0-9,]+$/, { message: '숫자만 입력 가능합니다.' }),
	remittanceType: z.string(),
	memo: z.string(),
});
