import { FC, useEffect } from 'react'
import { TaskData, getTask, updateTask } from '../apis/api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

interface TaskDetailsProps {
    id: number
    handleClose: () => void
}

export const TaskDetails: FC<TaskDetailsProps> = ({ id, handleClose }) => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(['task', id], () => getTask(id))

    const { handleSubmit, register, watch, setValue } = useForm<TaskData>()

    const status = watch('status')

    const updateMutation = useMutation(
        (data: TaskData) => updateTask(id, data),
        {
            onSuccess: () => {
                handleClose()
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

    if (isLoading || status === undefined) {
        return <CircularProgress />
    }

    const onSubmit: SubmitHandler<TaskData> = (data) => {
        updateMutation.mutate(data)
    }

    const toggleStatus = () => {
        setValue('status', status === 1 ? 0 : 1)
    }

    return (
        <>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                    <TextField
                        label="タスク名"
                        fullWidth
                        multiline
                        {...register('title')}
                        defaultValue={data?.title}
                        placeholder="Title"
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="タスク内容"
                        fullWidth
                        multiline
                        {...register('description')}
                        defaultValue={data?.description}
                        placeholder="Description"
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        type="date"
                        label="期日"
                        {...register('deadline')}
                        defaultValue={data?.deadline}
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
                <Box>
                    <Button type="submit" variant="contained">
                        更新
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default TaskDetails
