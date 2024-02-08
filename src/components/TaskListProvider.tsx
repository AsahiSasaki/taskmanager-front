import { FC } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { useTasks, useDeleteTask, useTaskDialog } from '../hooks/hooks'
import TaskListDisplay from './TaskListDisplay'
import { GridRenderCellParams } from '@mui/x-data-grid'

export const TaskListProvider: FC = () => {
    //タスク一覧取得フック
    const { isLoading, data } = useTasks()
    //タスク詳細ダイアログフック
    const { selectedId, open, handleClickOpen, handleClose } = useTaskDialog()
    //タスク削除フック
    const { apiRef, deleteMutation } = useDeleteTask()

    if (isLoading) {
        return <CircularProgress />
    }

    //表示する列を定義
    const columns = [
        { field: 'title', headerName: 'タスク名', width: 200 },
        { field: 'description', headerName: 'タスク内容', width: 300 },
        { field: 'status', headerName: 'ステータス', width: 150 },
        { field: 'deadline', headerName: '期日', width: 150 },
        {
            field: 'editBtn',
            headerName: '詳細',
            sortable: false,
            width: 90,
            disableClickEventBubbling: true,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        handleClickOpen(params.row.id)
                    }}
                >
                    詳細
                </Button>
            ),
        },
    ]

    //表示データを定義
    const dataGridRows = (() =>
        data?.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status === 1 ? '完了' : '未完了',
            deadline: item.deadline,
        })) ?? [])()

    return (
        <>
            <TaskListDisplay
                deleteMutation={deleteMutation}
                apiRef={apiRef}
                open={open}
                handleClose={handleClose}
                selectedId={Number(selectedId)}
                dataGridRows={dataGridRows}
                columns={columns}
            />
        </>
    )
}

export default TaskListProvider
