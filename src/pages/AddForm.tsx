import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AppContext from '@/context/AppContext';
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
import { useContext, useState } from 'react';
import { ALLOWED_FILE_EXTS, formSchema } from '@/data';
import { saveSubmissions } from '@/lib/services';

const AddFormPage = () => {
  const { toast } = useToast();
  const ctx = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [alasan, setAlasan] = useState('');
  const [previewKtp, setPreviewKtp] = useState<string | null>();
  const [previewKk, setPreviewKk] = useState<string | null>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (!ctx.province || !ctx.regency || !ctx.district || !ctx.village) {
        throw Error('Mohon lengkapi alamat');
      }
      if (!alasan) {
        throw Error('Mohon pilih alasan');
      }

      // simulate network request
      const requestTime = Math.random() * 1000 + Math.random() * 1000;

      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(requestTime);

      if (requestTime > 1500) {
        throw new Error('Gagal mengirim isian form. Mohon coba kembali beberapa saat.');
      }

      toast({
        description: 'Form berhasil dikirim',
        variant: 'success',
      });
    await saveSubmissions({
        ...values,
        alasan,
        provinsi: ctx.province.name,
        kabupaten: ctx.regency.name,
        kecamatan: ctx.district.name,
        kelurahan: ctx.village.name,
        fotoKkString: previewKk || '',
        fotoKtpString: previewKtp || '',
      }) ;
      form.reset();
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
                          setPreviewKtp(null);
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
                        className="object-cover w-full rounded-md aspect-video lg:w-1/2"
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
                          setPreviewKk(null);
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
                        className="object-cover w-full rounded-md aspect-video lg:w-1/2"
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
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => form.setValue('umur', e.target.valueAsNumber)}
                      />
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
              <Button variant={isLoading ? 'loading' : 'default'} disabled={isLoading} type="submit">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default AddFormPage;
