import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Spinner } from '../components/Spinner';
import { useWeightEntries } from '../hooks/useWeightEntries';
import type { WeightEntry } from '../types';
import styles from './History.module.css';

export function History() {
  const { entries, loading, updateEntry, deleteEntry } = useWeightEntries();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editWeight, setEditWeight] = useState('');
  const [editDate, setEditDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  function startEdit(entry: WeightEntry) {
    setEditingId(entry.id);
    setEditWeight(String(entry.weight_value));
    setEditDate(entry.entry_date);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: string) {
    const value = parseFloat(editWeight);
    if (isNaN(value) || value <= 0) return;
    setSaving(true);
    try {
      await updateEntry(id, value, editDate);
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteEntry(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.heading}>History</h1>

        {loading ? (
          <Spinner />
        ) : entries.length === 0 ? (
          <p className={styles.muted}>No entries yet.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Weight (lbs)</th>
                  <th className={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) =>
                  editingId === entry.id ? (
                    <tr key={entry.id} className={styles.editRow}>
                      <td className={styles.td}>
                        <input
                          className={styles.editInput}
                          type="date"
                          value={editDate}
                          max={today}
                          onChange={(e) => setEditDate(e.target.value)}
                        />
                      </td>
                      <td className={styles.td}>
                        <input
                          className={styles.editInput}
                          type="number"
                          step="0.1"
                          min="0"
                          value={editWeight}
                          onChange={(e) => setEditWeight(e.target.value)}
                        />
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.saveBtn}
                            onClick={() => saveEdit(entry.id)}
                            disabled={saving}
                          >
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button className={styles.cancelBtn} onClick={cancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={entry.id} className={styles.row}>
                      <td className={styles.td}>{formatDate(entry.entry_date)}</td>
                      <td className={styles.td}>{entry.weight_value}</td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.editBtn}
                            onClick={() => startEdit(entry)}
                          >
                            Edit
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(entry.id)}
                            disabled={deletingId === entry.id}
                          >
                            {deletingId === entry.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
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
