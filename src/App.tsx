import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import TaskList from './components/TaskList.tsx'
import { StrictMode } from 'react';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <TaskList/>
      </QueryClientProvider>
    </>
  )
}

export default App
