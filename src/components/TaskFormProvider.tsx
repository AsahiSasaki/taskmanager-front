import { CircularProgress } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createTask, getTask, updateTask } from '../apis/api'
import { TaskData, TaskDataSchema } from '../models/TaskData'
import TaskFormDisplay from './TaskFormDisplay'
import { atom, useRecoilState } from 'recoil'
import { zodResolver } from '@hookform/resolvers/zod'

interface TaskFormProviderProps {
    mode: number
    id?: number
    handleClose?: () => void
}

export const updateFunctionState = atom({
    key: 'updateFunction',
    default: () => {},
})

export const formIsValidState = atom({
    key: 'formIsValid',
    default: false,
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

    const { handleSubmit, register, watch, setValue, formState } =
        useForm<TaskData>({
            resolver: zodResolver(TaskDataSchema),
            mode: 'onBlur',
        })

    const status = watch('status')
    const formData = watch()

    const [, setUpdateFunction] = useRecoilState(updateFunctionState)
    const [, setFormIsValid] = useRecoilState(formIsValidState)

    const taskMutation = useMutation(
        (data: TaskData) => {
            console.log('Title', data.title)
            console.log('Description', data.description)
            console.log('Deadline', data.deadline)
            console.log('Status', data.status)
            return id ? updateTask(id, data) : createTask(data)
        },
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
            setValue('title', data.title)
            setValue('description', data.description)
            setValue('deadline', data.deadline)
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

    useEffect(() => {
        setFormIsValid(formState.isValid)
    }, [formState.isValid])

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
            formState={formState}
            setValue={setValue}
        />
    )
}

export default TaskFormProvider
