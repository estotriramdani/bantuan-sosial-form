import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_EXTS = ['jpg', 'jpeg', 'png', 'bmp'];

const imageValidation = z
  .instanceof(File, { message: 'Wajib diisi' })
  .refine(
    (file) => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext) return false;
      return ALLOWED_FILE_EXTS.includes(ext);
    },
    { message: 'Hanya dapat menerima gambar' },
  )
  .refine((file) => file.size < MAX_FILE_SIZE, { message: 'Ukuran file maksimal 2MB' });

const formSchema = z.object({
  nama: z.string().min(3, { message: 'Nama wajib diisi' }),
  nik: z.string().min(16, { message: 'NIK minimal 16 digit' }).max(18, { message: 'NIK maksimal 18 digit' }),
  noKk: z
    .string()
    .min(16, { message: 'Nomor Kartu Keluarga minimal 16 digit' })
    .max(18, { message: 'Nomor Kartu Keluarga maksimal 18 digit' }),
  fotoKtp: imageValidation,
});

const AddFormPage = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.fotoKtp);
    toast({
      title: 'Account created.',
      description: JSON.stringify(values),
      variant: 'success',
    });
  }

  return (
    <main className="">
      <div className="mx-auto w-full p-6 lg:w-[500px]">
        <div className="mb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama penerima bantuan sosial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noKk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fotoKtp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto KTP</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            field.onChange(e.target.files?.[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Simpan</Button>
            </form>
          </Form>
        </div>
        <ModeToggle />
      </div>
    </main>
  );
};

export default AddFormPage;
