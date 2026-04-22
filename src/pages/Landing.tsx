import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brand}>Hexis</span>
        <div className={styles.headerLinks}>
          <Link to="/login" className={styles.loginLink}>Sign in</Link>
          <Link to="/signup" className={styles.signupLink}>Get started</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.headline}>
            Track your weight.<br />See the trend.
          </h1>
          <p className={styles.subheadline}>
            Hexis makes it simple to log your weight and visualize your progress
            over time — nothing more, nothing less.
          </p>
          <Link to="/signup" className={styles.ctaButton}>
            Start tracking for free
          </Link>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📈</div>
            <h2 className={styles.featureTitle}>Progress charts</h2>
            <p className={styles.featureText}>
              Interactive line charts with 1W, 1M, 3M, 1Y, and all-time views so
              you can spot long-term trends at a glance.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h2 className={styles.featureTitle}>Quick logging</h2>
            <p className={styles.featureText}>
              Log your weight in seconds. Pick a date, enter a number, done.
              No complicated workflows or extra metrics.
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h2 className={styles.featureTitle}>Your data, private</h2>
            <p className={styles.featureText}>
              Each account is completely isolated. Only you can see and
              manage your weight entries.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Hexis</p>
      </footer>
    </div>
  );
}
