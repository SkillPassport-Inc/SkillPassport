import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';

export default function DashboardLayout({ variant = 'developer' }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar variant={variant} />
      <main
        style={{
          flex: 1,
          marginLeft: 'var(--sp-sidebar-width)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar />
        <div
          style={{
            flex: 1,
            padding: 'var(--sp-space-2xl)',
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
