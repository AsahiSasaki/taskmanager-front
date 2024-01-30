import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import Router from './routes/Router.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
  return (   
    <>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
