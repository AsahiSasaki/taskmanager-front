import { Box, Button, TextField } from '@mui/material'
import { FC } from 'react'
import { TaskData } from '../models/TaskData'
import { FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form'

interface TaskFormDisplayProps {
    mode: number
    register: UseFormRegister<TaskData>
    onSubmit: () => void
    data?: TaskData
    formattedToday?: string
    status?: number
    toggleStatus?: () => void
    formState: FormState<TaskData>
    setValue: UseFormSetValue<TaskData>
}

export const TaskFormDisplay: FC<TaskFormDisplayProps> = ({
    mode,
    status,
    register,
    onSubmit,
    toggleStatus,
    data,
    formattedToday,
    formState,
    setValue,
}) => {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ marginLeft: mode === 0 ? -50 : 0 }}
        >
            <Box sx={{ marginTop: mode === 0 ? 0 : 2, marginBottom: 2 }}>
                <TextField
                    label="タスク名"
                    fullWidth
                    multiline
                    {...register('title')}
                    defaultValue={data?.title}
                    sx={{ width: 400 }}
                    error={Boolean(formState.errors.title)}
                    helperText={formState.errors.title?.message}
                    onBlur={(e) => {
                        setValue('title', e.currentTarget.value, {
                            shouldValidate: true,
                        })
                    }}
                />
            </Box>
            <Box sx={{ marginBottom: 2 }}>
                <TextField
                    label="タスク内容"
                    fullWidth
                    multiline
                    {...register('description')}
                    defaultValue={data?.description}
                    sx={{ width: 400 }}
                    error={Boolean(formState.errors.description)}
                    helperText={formState.errors.description?.message}
                    onBlur={(e) => {
                        setValue('description', e.currentTarget.value, {
                            shouldValidate: true,
                        })
                    }}
                />
            </Box>
            {mode === 0 ? (
                <Box>
                    <TextField
                        type="date"
                        label="期日"
                        {...register('deadline')}
                        defaultValue={data?.deadline ?? formattedToday}
                        placeholder="Deadline"
                        error={Boolean(formState.errors.deadline)}
                        onBlur={(e) => {
                            setValue('deadline', e.currentTarget.value, {
                                shouldValidate: true,
                            })
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ marginLeft: 26, marginTop: 1.5 }}
                    >
                        登録
                    </Button>
                    {formState.errors.deadline && (
                        <div
                            style={{
                                fontFamily: 'Roboto, Helvetica, Arial',
                                fontSize: '0.75rem',
                                fontWeight: '400',
                                color: '#d32f2f',
                                position: 'relative',
                                top: '3px',
                                left: '-95px',
                            }}
                        >
                            {formState.errors.deadline.message}
                        </div>
                    )}
                </Box>
            ) : (
                <>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            type="date"
                            label="期日"
                            {...register('deadline')}
                            defaultValue={data?.deadline ?? formattedToday}
                            placeholder="Deadline"
                            error={Boolean(formState.errors.deadline)}
                            helperText={formState.errors.deadline?.message}
                            onBlur={(e) => {
                                setValue('deadline', e.currentTarget.value, {
                                    shouldValidate: true,
                                })
                            }}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Button
                            {...register('status')}
                            onClick={toggleStatus}
                            style={{
                                backgroundColor:
                                    status === 0 ? '#FFC4B5' : '#C4E3FF',
                                color: status === 0 ? '#FF0000' : '#0000FF',
                            }}
                        >
                            {status === 1 ? '完了' : '未完了'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default TaskFormDisplay
