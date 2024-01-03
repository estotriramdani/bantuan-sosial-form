import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput, Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import AddressChooser from '@/components/AddressChooser';
import { ComboBox } from '@/components/combobox';
import { useState } from 'react';

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
  fotoKk: imageValidation,
  umur: z.number().min(18, { message: 'Umur minimum 18' }),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  provinsi: z.string().min(3, { message: 'Provinsi wajib diisi' }),
  kabupaten: z.string().min(3, { message: 'Kabupaten/Kota wajib diisi' }),
  kecamatan: z.string().min(3, { message: 'Kecamatan wajib diisi' }),
  kelurahan: z.string().min(3, { message: 'Kelurahan/Desa wajib diisi' }),
  alamat: z.string().min(1, { message: 'Wajib' }).max(255, { message: 'Alamat maksimal 255 karakter' }),
  rt: z.string().max(3, { message: 'RT maksimal 3 karakter. Contoh: 001, 01, atau 1.' }),
  rw: z.string().max(3, { message: 'RW maksimal 3 karakter. Contoh: 001, 01, atau 1.' }),
  penghasilanSebelumPandemi: z.number().min(1, { message: 'Wajib diisi' }),
  penghasilanSetelahPandemi: z.number().min(1, { message: 'Wajib diisi' }),
});

const AddFormPage = () => {
  const { toast } = useToast();
  const [alasan, setAlasan] = useState('');
  const [previewKtp, setPreviewKtp] = useState<string | null>();
  const [previewKk, setPreviewKk] = useState<string | null>();

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
      <div className="w-full mx-auto md:w-3/4 lg:w-1/2">
        <div className="p-6 shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold">Form Pengajuan Bantuan Sosial</h2>
            <ModeToggle />
          </div>

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
                            const extension = e.target.files?.[0].name.split('.').pop()?.toLowerCase();
                            if (ALLOWED_FILE_EXTS.includes(extension || '')) {
                              setPreviewKtp(URL.createObjectURL(e.target.files?.[0]));
                            }
                          }
                        }}
                      />
                    </FormControl>
                    {previewKtp && (
                      <img
                        src={previewKtp}
                        alt="Foto KTP"
                        className="object-cover w-full rounded-md aspect-video"
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fotoKk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Kartu Keluarga</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            field.onChange(e.target.files?.[0]);
                            const extension = e.target.files?.[0].name.split('.').pop()?.toLowerCase();
                            if (ALLOWED_FILE_EXTS.includes(extension || '')) {
                              setPreviewKk(URL.createObjectURL(e.target.files?.[0]));
                            }
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {previewKk && (
                      <img
                        src={previewKk}
                        alt="Foto KTP"
                        className="object-cover w-full rounded-md aspect-video"
                      />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="umur"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Jenis Kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AddressChooser />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Alamat" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RT</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RW</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penghasilanSebelumPandemi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penghasilan Sebelum Pandemi</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        id="penghasilanSebelumPandemi"
                        name="penghasilanSebelumPandemi"
                        prefix="Rp"
                        defaultValue={0}
                        decimalsLimit={2}
                        onValueChange={(value) => field.onChange(+(value || '0'))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penghasilanSetelahPandemi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penghasilan Sebelum Pandemi</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        id="penghasilanSetelahPandemi"
                        name="penghasilanSetelahPandemi"
                        prefix="Rp"
                        defaultValue={0}
                        decimalsLimit={2}
                        onValueChange={(value) => field.onChange(+(value || '0'))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="text-sm font-medium">Alasan membutuhkan bantuan</FormLabel>
                <FormDescription>Pilih salah satu atau tulis sendiri.</FormDescription>
                <ComboBox
                  data={[
                    {
                      value: 'Kehilangan pekerjaan',
                      label: 'Kehilangan pekerjaan',
                    },
                    {
                      value: 'Kepala keluarga terdampak atau korban Covid-19',
                      label: 'Kepala keluarga terdampak atau korban Covid-19',
                    },
                    {
                      value: 'Tergolong fakir/miskin semenjak sebelum Covid-19',
                      label: 'Tergolong fakir/miskin semenjak sebelum Covid-19',
                    },
                  ]}
                  setValue={setAlasan}
                  value={alasan}
                  allowCustomValue
                />
              </FormItem>
              <Button type="submit">Simpan</Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default AddFormPage;
