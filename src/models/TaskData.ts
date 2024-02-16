import z from 'zod'

//半角が含まれていないか
const isFullWidth: (value: string) => boolean = (value: string) => {
    const regExp = /[\x20-\x7E]/
    return !regExp.test(value)
}

//日付になっているか
const isDate: (value: string) => boolean = (value: string) => {
    return !isNaN(Date.parse(value))
}

//今日以降の日付か
const isFutureDate: (value: string) => boolean = (value: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const inputDate = new Date(value)
    return inputDate >= today
}

export const TaskDataSchema = z.object({
    id: z.number().optional(),
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

export type TaskData = z.infer<typeof TaskDataSchema>
