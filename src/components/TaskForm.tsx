import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTask, getTask, updateTask, TaskData } from '../apis/api'

interface TaskFormProps {
    mode: number
    id?: number
    handleClose?: () => void
}

export const TaskForm: FC<TaskFormProps> = ({ id, mode, handleClose }) => {
    const today = new Date()
    const formattedToday = today.toISOString().slice(0, 10)

    const queryClient = useQueryClient()

    const { data, isLoading } = id
        ? useQuery(['task', id], () => getTask(id))
        : { data: undefined, isLoading: false }

    const { handleSubmit, register, watch, setValue } = useForm<TaskData>()

    const status = watch('status')

    const taskMutation = useMutation(
        (data: TaskData) => (id ? updateTask(id, data) : createTask(data)),
        {
            onSuccess: () => {
                handleClose && handleClose()
                !id && (setValue('title', ''), setValue('description', ''))
                queryClient.invalidateQueries('tasks')
                queryClient.invalidateQueries('task')
            },
        },
    )

    useEffect(() => {
        if (data) {
            setValue('status', data.status)
        }
    }, [data])

    if (isLoading || (mode === 1 && status === undefined)) {
        return <CircularProgress />
    }

    const onSubmit: SubmitHandler<TaskData> = (data) => {
        taskMutation.mutate(data)
    }

    const toggleStatus = () => {
        setValue('status', status === 1 ? 0 : 1)
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ marginLeft: 26, marginTop: 1.5 }}
                    >
                        登録
                    </Button>
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
                    <Box sx={{ marginBottom: 2 }}>
                        <Button type="submit" variant="contained" size="large">
                            更新
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default TaskForm
