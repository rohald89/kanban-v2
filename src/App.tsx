import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import useTheme from './hooks/useTheme';

import Landing from './pages/Landing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
