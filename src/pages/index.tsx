import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/ui/Dashboard';
import Training from './training/ui/Training';
import Profile from './profile/ui/Profile';
import Login from './login/ui/Login';
import Home from './home/ui/Home';
import SteamCallback from './steamCallback/ui/SteamCallback';
import { ProtectedRoute } from '../app/providers/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/steam/callback" element={<SteamCallback />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route
        path="/training"
        element={<ProtectedRoute element={<Training />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />}
      />
      <Route
        path="/replays"
        element={<ProtectedRoute element={<Profile />} />}
      />
      <Route
        path="/community"
        element={<ProtectedRoute element={<Profile />} />}
      />
    </Routes>
  );
}
