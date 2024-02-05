import { Route, Routes } from 'react-router-dom'
import TaskManager from '../pages/TaskManager'

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<TaskManager />} />
        </Routes>
    )
}

export default Router
