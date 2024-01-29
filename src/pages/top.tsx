import { QueryClient, QueryClientProvider } from 'react-query';
import TaskList from '../components/TaskList.tsx'
import TaskForm from '../components/TaskForm.tsx';

function Top() {
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

export default Top