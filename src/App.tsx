import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './app/providers';
import AppRouter from './pages';
import './main.css';
export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProviders>
  );
}
