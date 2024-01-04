import { SubmissionParams } from '@/types';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const saveSubmissions = async (params: SubmissionParams) => {
  const existing = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, JSON.stringify([params]));
  }
  const parsed = JSON.parse(existing || '[]');

  localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, JSON.stringify([...parsed, params]));

  return params;
};
