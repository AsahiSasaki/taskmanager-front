import { Box, CircularProgress } from '@mui/material'
import { useTaskForm } from '../hooks/useTaskForm.ts'
import { TaskForm } from '../components/TaskForm.tsx'
import { useTaskList } from '../hooks/useTaskList.tsx'
import { TaskList } from '../components/TaskList.tsx'
import { TaskDialog } from '../components/TaskDialog.tsx'

export function TaskManager() {
    const {
        register,
        onSubmit,
        data,
        formattedToday,
        toggleStatus,
        status,
        formState,
        setValue,
    } = useTaskForm()

    const {
        isLoading,
        deleteMutation,
        apiRef,
        open,
        handleClose,
        selectedId,
        dataGridRows,
        columns,
    } = useTaskList()

    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            <Box sx={{ marginBottom: 3 }}>
                <TaskForm
                    mode={0}
                    register={register}
                    onSubmit={onSubmit}
                    data={data}
                    formattedToday={formattedToday}
                    toggleStatus={toggleStatus}
                    status={status}
                    formState={formState}
                    setValue={setValue}
                />
            </Box>
            <Box>
                <TaskList
                    deleteMutation={deleteMutation}
                    apiRef={apiRef}
                    dataGridRows={dataGridRows}
                    columns={columns}
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
