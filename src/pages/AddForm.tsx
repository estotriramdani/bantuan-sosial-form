import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

const AddFormPage = () => {
  return (
    <main className="">
      <div className="mx-auto w-full lg:w-[500px]">
        <ModeToggle />
        <Button>Click me</Button>
      </div>
    </main>
  );
};

export default AddFormPage;
