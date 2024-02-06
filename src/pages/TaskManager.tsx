import TaskList from '../components/TaskList.tsx'
import TaskForm from '../components/TaskForm.tsx'
import { Box } from '@mui/material'

function TaskManager() {
    return (
        <>
            <Box sx={{ alignItems: 'flex-start', marginBottom: 3 }}>
                <TaskForm isNewTask={true} />
            </Box>
            <Box>
                <TaskList />
            </Box>
        </>
    )
}

export default TaskManager
