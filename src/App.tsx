import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import TaskList from './components/TaskList.tsx'
import TaskForm from './components/TaskForm.tsx';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TaskForm />
        <TaskList/>
      </QueryClientProvider>
    </>
  )
}

export default App
