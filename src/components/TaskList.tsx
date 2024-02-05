import { DataGrid, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import { FC } from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import DeleteTask from './DeleteTask'
import { TaskDialog } from './TaskDialog'
import { useTasks, useDeleteTask, useTaskDialog } from '../hooks/hooks'

export const TaskList: FC = () => {
    //タスク一覧取得フック
    const { isLoading, data } = useTasks()
    //タスク詳細ダイアログフック
    const { selectedId, open, handleClickOpen, handleClose } = useTaskDialog()
    //タスク削除フック
    const { apiRef } = useDeleteTask()

    if (isLoading) {
        return <CircularProgress />
    }

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

    const row = []

    for (const item of data ?? []) {
        row.push({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status === 1 ? '完了' : '未完了',
            deadline: item.deadline,
        })
    }

    const dataGridRows = (() =>
        data?.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status === 1 ? '完了' : '未完了',
            deadline: item.deadline,
        })) ?? [])()

    const dataGridRowsFunction = () =>
        data?.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            status: item.status === 1 ? '完了' : '未完了',
            deadline: item.deadline,
        })) ?? []

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DeleteTask apiRef={apiRef} />
            </Box>
            <Box>
                <DataGrid
                    rows={dataGridRows}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    apiRef={apiRef}
                    sx={{
                        '& .rows-incomplete': {
                            background: '#FFC4B5 !important',
                        },
                        height: '420px',
                        width: '940px',
                        fontSize: 18,
                        border: 'none',
                    }}
                    getRowClassName={(params: GridRowParams) =>
                        params.row.status === '未完了' ? 'rows-incomplete' : ''
                    }
                />
            </Box>
            <TaskDialog
                open={open}
                handleClose={handleClose}
                selectedId={selectedId}
            />
        </>
    )
}

export default TaskList
