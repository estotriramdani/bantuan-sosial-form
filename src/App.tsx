import { ThemeProvider } from './components/theme-provider';
import AddFormPage from './pages/AddForm';

export default function Home() {
  return (
    <ThemeProvider>
      <AddFormPage />
    </ThemeProvider>
  );
}
