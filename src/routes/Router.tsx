import { Route, Routes } from 'react-router-dom'
import { TaskManager } from '../pages/TaskManager'

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<TaskManager />} />
        </Routes>
    )
}

