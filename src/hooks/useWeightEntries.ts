import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './useAuth';
import type { WeightEntry } from '../types';

export function useWeightEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'weightEntries'),
      orderBy('entry_date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<WeightEntry, 'id'>),
      }));
      setEntries(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  async function addEntry(weight_value: number, entry_date: string) {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'weightEntries'), {
      weight_value,
      entry_date,
      created_at: serverTimestamp(),
    });
  }

  async function updateEntry(id: string, weight_value: number, entry_date: string) {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid, 'weightEntries', id), {
      weight_value,
      entry_date,
    });
  }

  async function deleteEntry(id: string) {
    if (!user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'weightEntries', id));
  }

  return { entries, loading, addEntry, updateEntry, deleteEntry };
}
