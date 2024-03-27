import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { TaskData, TaskDataSchema } from '../models/taskData'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    DefaultApi,
    TaskPutBody,
    TaskPutBodyStatusEnum,
} from '../apis/resource/api'

const api = new DefaultApi()

export const useTaskForm = (
    selectedId?: number,
    open?: boolean,
    handleClose?: () => void,
) => {
    const today = new Date()
    const formattedToday = today.toISOString().slice(0, 10)

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(
        ['task', selectedId],
        async () => {
            const response = await api.getTaskByID(selectedId!)
            return response.data
        },
        {
            enabled: !!selectedId,
        },
    )

    const { handleSubmit, register, watch, setValue, formState, reset } =
        useForm<TaskData>({
            resolver: zodResolver(TaskDataSchema),
            mode: 'onBlur',
        })

    const taskMutation = useMutation(
        (data: TaskData) => {
            let status: TaskPutBodyStatusEnum | undefined
            if (data.status !== undefined) {
                status =
                    data.status === 0
                        ? TaskPutBodyStatusEnum.NUMBER_0
                        : TaskPutBodyStatusEnum.NUMBER_1
            }
            const taskDataWithEnumStatus: TaskPutBody = {
                ...data,
                status: status,
            }
            return selectedId
                ? api
                      .updateTask(selectedId, taskDataWithEnumStatus)
                      .then((response) => response)
                : api
                      .createTask(taskDataWithEnumStatus)
                      .then((response) => response)
        },
        {
            onSuccess: () => {
                handleClose && handleClose()
                queryClient.invalidateQueries('tasks')
                queryClient.invalidateQueries('task')
                reset()
            },
        },
    )

    const status = watch('status')

    useEffect(() => {
        if (data) {
            data && setValue('title', data.title || '')
            data && setValue('description', data.description || '')
            data && setValue('deadline', data.deadline || '')
            data && setValue('status', data.status)
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
        reset,
    }
}
