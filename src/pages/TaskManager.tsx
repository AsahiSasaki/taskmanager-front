import { Box, CircularProgress } from '@mui/material'
import { useTaskForm } from '../hooks/UseTaskForm.ts'
import TaskForm from '../components/TaskForm.tsx'
import { useTaskList } from '../hooks/UseTaskList.tsx'
import TaskList from '../components/TaskList.tsx'
import { TaskDialog } from '../components/TaskDialog.tsx'

function TaskManager() {
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
                <TaskDialog
                    open={open}
                    handleClose={handleClose}
                    selectedId={selectedId ? selectedId : null}
                />
            </Box>
        </>
    )
}

export default TaskManager
