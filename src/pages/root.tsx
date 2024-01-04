import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppContextProvider } from '@/context/AppContext';

export default function RootPage() {
  return (
    <ThemeProvider>
      <AppContextProvider>
        <main>
          <div className="w-full mx-auto md:w-3/4 lg:w-1/2">{<Outlet />}</div>
        </main>
      </AppContextProvider>
      <Toaster />
    </ThemeProvider>
  );
}
