import { useState, type FormEvent } from 'react';
import { Navbar } from '../components/Navbar';
import { WeightChart } from '../components/WeightChart';
import { Spinner } from '../components/Spinner';
import { useWeightEntries } from '../hooks/useWeightEntries';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const { entries, loading, addEntry } = useWeightEntries();

  const today = new Date().toISOString().split('T')[0];
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const value = parseFloat(weight);
    if (isNaN(value) || value <= 0) {
      setError('Please enter a valid weight.');
      return;
    }

    setSubmitting(true);
    try {
      await addEntry(value, date);
      setWeight('');
      setDate(today);
    } catch {
      setError('Failed to save entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Spinner />;

  const latest = entries[0];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.grid}>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Log Weight</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.label}>
                Weight (lbs)
                <input
                  className={styles.input}
                  type="number"
                  step="0.1"
                  min="0"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 175.5"
                  required
                />
              </label>
              <label className={styles.label}>
                Date
                <input
                  className={styles.input}
                  type="date"
                  value={date}
                  max={today}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </label>
              <button className={styles.button} type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Save entry'}
              </button>
            </form>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Summary</h2>
            {loading ? (
              <p className={styles.muted}>Loading...</p>
            ) : entries.length === 0 ? (
              <p className={styles.muted}>No entries yet. Log your first weight above.</p>
            ) : (
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Latest</span>
                  <span className={styles.statValue}>{latest.weight_value} lbs</span>
                  <span className={styles.statDate}>{formatDate(latest.entry_date)}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Total entries</span>
                  <span className={styles.statValue}>{entries.length}</span>
                </div>
              </div>
            )}
          </section>

        </div>

        <WeightChart entries={entries} />
      </main>
    </div>
  );
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
