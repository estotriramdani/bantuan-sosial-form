import * as z from 'zod';

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_FILE_EXTS = ['jpg', 'jpeg', 'png', 'bmp'];

export const imageValidation = z
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

export const formSchema = z.object({
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
  alamat: z.string().min(1, { message: 'Wajib' }).max(255, { message: 'Alamat maksimal 255 karakter' }),
  rt: z.string().max(3, { message: 'RT maksimal 3 karakter. Contoh: 001, 01, atau 1.' }),
  rw: z.string().max(3, { message: 'RW maksimal 3 karakter. Contoh: 001, 01, atau 1.' }),
  penghasilanSebelumPandemi: z.number().min(1, { message: 'Wajib diisi' }),
  penghasilanSetelahPandemi: z.number().min(1, { message: 'Wajib diisi' }),
});
