import {
    DataGrid,
    GridApi,
    GridColDef,
    GridRowModel,
    GridRowParams,
} from '@mui/x-data-grid'
import { FC, MutableRefObject } from 'react'
import { Box, Button } from '@mui/material'
import { TaskDialog } from './TaskDialog'
import { UseMutationResult } from 'react-query'

interface TaskListDisplayProps {
    deleteMutation: UseMutationResult<void, unknown, void, unknown>
    apiRef: MutableRefObject<GridApi>
    open: boolean
    handleClose: () => void
    selectedId?: number
    dataGridRows: GridRowModel[]
    columns: GridColDef[]
}

export const TaskListDisplay: FC<TaskListDisplayProps> = ({
    deleteMutation,
    apiRef,
    open,
    handleClose,
    selectedId,
    dataGridRows,
    columns,
}) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    color="warning"
                    variant="contained"
                    size="large"
                    onClick={() => deleteMutation.mutate()}
                >
                    削除
                </Button>
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
                selectedId={selectedId ? selectedId : null}
            />
        </>
    )
}

export default TaskListDisplay
