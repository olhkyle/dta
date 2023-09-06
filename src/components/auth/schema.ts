import { z } from 'zod';

const signInSchema = z.object({
	email: z.string().nonempty('이메일을 입력해 주세요').email({ message: '이메일을 입력해 주세요' }),
	password: z
		.string()
		.min(1, { message: '비밀번호를 입력해 주세요' })
		.regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/, {
			message: `숫자, 소문자를 포함한 최소 8자, 최대 15자의 비밀번호를 입력해 주세요.`,
		}),
});

export { signInSchema };
