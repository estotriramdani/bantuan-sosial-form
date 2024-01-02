import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import AddFormPage from '@/pages/AddForm';
import { AppContextProvider } from './context/AppContext';

export default function Home() {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <AddFormPage />
      </AppContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}
