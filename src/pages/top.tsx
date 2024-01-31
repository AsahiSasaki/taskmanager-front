import TaskList from '../components/TaskList.tsx'
import TaskForm from '../components/TaskForm.tsx';
import { Box } from '@mui/material';

function Top() {
    return (
        <>
            <Box sx={{ alignItems: 'flex-start', marginBottom: 3 }}>
                <TaskForm />
            </Box>
            <Box>
                <TaskList />
            </Box>
        </>
    )
}

export default Top