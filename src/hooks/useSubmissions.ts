import { SubmissionParams } from '@/types';
import { useEffect, useState } from 'react';

export default function useSubmissions() {
  const [submissions, setSubmissions] = useState<SubmissionParams[]>([]);

  useEffect(() => {
    const existing = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY);
    if (existing) {
      setSubmissions(JSON.parse(existing));
    }
  }, []);

  return submissions;
}
