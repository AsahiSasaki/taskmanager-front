import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteTask, getTasks } from '../apis/api'
import { useState } from 'react'
import { GridRowModel, useGridApiRef } from '@mui/x-data-grid'

//タスク一覧取得
export const useTasks = () => {
    const { isLoading, data } = useQuery('tasks', getTasks)
    return { isLoading, data }
}

//タスク詳細ダイアログ表示
export const useTaskDialog = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [open, setOpen] = useState(false)
    const handleClickOpen = (id: number) => {
        setSelectedId(id)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    return { selectedId, open, handleClickOpen, handleClose }
}

//タスク削除
export const useDeleteTask = () => {
    //チェックを入れている行を取得する
    const apiRef = useGridApiRef()
    const queryClient = useQueryClient()

    const deleteTasks = async () => {
        const selectedRows = apiRef.current.getSelectedRows()
        const deletePromises: Promise<void>[] = []
        selectedRows.forEach((v: GridRowModel) => {
            deletePromises.push(deleteTask(v.id))
        })
        await Promise.all(deletePromises)
    }

    const deleteMutation = useMutation(() => deleteTasks(), {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
    })
    return { apiRef, deleteMutation }
}
