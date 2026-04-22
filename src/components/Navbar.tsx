import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import styles from './Navbar.module.css';

export function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className={styles.nav}>
      <span className={styles.brand}>Hexis</span>
      <div className={styles.links}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          History
        </NavLink>
      </div>
      <div className={styles.right}>
        <button className={styles.themeBtn} onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <span className={styles.displayName}>{user?.displayName}</span>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
