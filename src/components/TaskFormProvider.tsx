import { CircularProgress } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTask, getTask, updateTask, TaskData } from '../apis/api'
import TaskFormDisplay from './TaskFormDisplay'
import { atom, useRecoilState } from 'recoil' // Recoilをインポート

interface TaskFormProviderProps {
    mode: number
    id?: number
    handleClose?: () => void
}

export const updateFunctionState = atom({
    key: 'updateFunction',
    default: () => {},
})

export const TaskFormProvider: FC<TaskFormProviderProps> = ({
    id,
    mode,
    handleClose,
}) => {
    const today = new Date()
    const formattedToday = today.toISOString().slice(0, 10)

    const queryClient = useQueryClient()

    const { data, isLoading } = id
        ? useQuery(['task', id], () => getTask(id))
        : { data: undefined, isLoading: false }

    const { handleSubmit, register, watch, setValue } = useForm<TaskData>()

    const status = watch('status')
    const formData = watch()

    const [, setUpdateFunction] = useRecoilState(updateFunctionState)

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

    const formDataRef = useRef(formData)

    useEffect(() => {
        formDataRef.current = formData
    }, [formData])

    useEffect(() => {
        setUpdateFunction(() => () => taskMutation.mutate(formDataRef.current))
    }, [taskMutation.mutate])

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
        <TaskFormDisplay
            mode={mode}
            register={register}
            onSubmit={handleSubmit(onSubmit)}
            data={data}
            formattedToday={formattedToday}
            toggleStatus={toggleStatus}
            status={status}
        />
    )
}

export default TaskFormProvider
