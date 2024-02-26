import z from 'zod'
import { isFullWidth, isDate, isFutureDate } from '../utils/validationUtils'

export const TaskDataSchema = z.object({
    title: z
        .string()
        .min(1, { message: 'タスク名は必須です' })
        .max(20, { message: '20文字以下で入力してください' }),
    description: z
        .string()
        .max(50, { message: '50文字以下で入力してください' })
        .refine(isFullWidth, {
            message: '半角入力は許可されていません',
        }),
    status: z.number().optional(),
    deadline: z
        .string()
        .refine(isDate, { message: '有効な日付を入力してください' })
        .refine(isFutureDate, {
            message: '過去の日付は許可されていません',
        }),
})

export type TaskData = {
    id?: number
    title: string
    description: string
    status?: number
    deadline: string
}
