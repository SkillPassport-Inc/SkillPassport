import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';

export default function ProtectedRoute({ allowedRoles }) {
  const user = useAppStore((state) => state.user);

  // 1. Unauthenticated users cannot enter any protected page
  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Strict Role-Based Control: Developers cannot enter recruiter pages & vice-versa
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'recruiter') {
      return <Navigate to="/recruiter" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <Outlet />;
}
