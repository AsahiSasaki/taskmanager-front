import { Box } from '@mui/material'
import TaskFormProvider from '../components/TaskFormProvider.tsx'
import TaskListProvider from '../components/TaskListProvider.tsx'

function TaskManager() {
    return (
        <>
            <Box sx={{ marginBottom: 3 }}>
                <TaskFormProvider mode={0} />
            </Box>
            <Box>
                <TaskListProvider />
            </Box>
        </>
    )
}

export default TaskManager
