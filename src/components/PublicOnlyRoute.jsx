import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';

export default function PublicOnlyRoute() {
  const user = useAppStore((state) => state.user);

  // If user is already authenticated, redirect them to their respective role dashboard
  if (user.isAuthenticated) {
    if (user.role === 'recruiter') {
      return <Navigate to="/recruiter" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}
