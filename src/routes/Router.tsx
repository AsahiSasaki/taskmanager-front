import { Route, Routes } from 'react-router-dom';
import Top from '../pages/top';
import TaskDetails from '../pages/TaskDetails';

const Router = () => {
    return (
        <Routes>
            <Route  path="/" element={<Top />} />
            <Route  path="/:id" element={<TaskDetails />} />
        </Routes>
    );
};

export default Router;