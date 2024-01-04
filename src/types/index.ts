import { z } from 'zod';
import { formSchema } from '@/data';

export interface IProvince {
  id: string;
  name: string;
}

export interface IRegency {
	id: string;
	province_id: string;
	name: string;
}

export interface IDistrict {
	id: string;
	regency_id: string;
	name: string;
}

export interface IVillage {
	id: string;
	district_id: string;
	name: string;
}

export interface SubmissionParams extends z.infer<typeof formSchema> {
	id: string;
  alasan: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  kelurahan: string;
	fotoKtpString: string;
	fotoKkString: string;
}