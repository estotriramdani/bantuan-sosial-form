import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AddFormPage from '@/pages/AddForm';

export default function Home() {
  return (
    <ThemeProvider>
      <AddFormPage />
      <Toaster />
    </ThemeProvider>
  );
}
