import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTask, getTask, updateTask } from '../apis/api'
import { TaskData, TaskDataSchema } from '../models/TaskData'
import { zodResolver } from '@hookform/resolvers/zod'

export const useTaskForm = (
    id?: number,
    handleClose?: () => void,
    open?: boolean,
) => {
    const today = new Date()
    const formattedToday = today.toISOString().slice(0, 10)

    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery(['task', id], () => getTask(id!), {
        enabled: !!id,
    })

    const { handleSubmit, register, watch, setValue, formState, reset } =
        useForm<TaskData>({
            resolver: zodResolver(TaskDataSchema),
            mode: 'onBlur',
        })

    const taskMutation = useMutation(
        (data: TaskData) => (id ? updateTask(id, data) : createTask(data)),
        {
            onSuccess: () => {
                handleClose && handleClose()
                queryClient.invalidateQueries('tasks')
                reset()
            },
        },
    )

    const status = watch('status')

    useEffect(() => {
        if (data) {
            setValue('title', data.title)
            setValue('description', data.description)
            setValue('deadline', data.deadline)
            setValue('status', data.status)
        }
        if (!open) {
            setValue('status', undefined)
        }
    }, [data, open])

    const onSubmit: SubmitHandler<TaskData> = (data) => {
        taskMutation.mutate(data)
    }

    const toggleStatus = () => {
        setValue('status', status === 1 ? 0 : 1)
    }

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        data,
        formattedToday,
        toggleStatus,
        status,
        formState,
        setValue,
        isLoading,
    }
}

export default useTaskForm
