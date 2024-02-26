import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import { Router } from './routes/Router.tsx'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

export function App() {
    const queryClient = new QueryClient()
    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Router />
                    </BrowserRouter>
                </QueryClientProvider>
            </RecoilRoot>
        </>
    )
}
