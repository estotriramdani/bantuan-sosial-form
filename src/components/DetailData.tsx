import React, { FC } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmissionParams } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { buttonVariants } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const BoxDetail: FC<{ label: string; value: string | number }> = ({ label, value }) => {
  return (
    <div className="mb-2">
      <p className="font-medium text-left text-primary">{label}</p>
      <p className="text-left">{value}</p>
    </div>
  );
};

interface Props {
  handleDetail: (data: SubmissionParams) => void;
  selectedData?: SubmissionParams;
  submission: SubmissionParams;
}

const DetailData: React.FC<Props> = ({ handleDetail, selectedData, submission }) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: 'default', size: 'sm' })}
        onClick={() => {
          handleDetail(submission);
        }}
      >
        Detail
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle className="mb-3">Detail Data {selectedData?.nama}</DialogTitle>
          {selectedData && (
            <DialogDescription className="h-[80vh] overflow-auto pr-2">
              <Tabs defaultValue="informasi-dasar">
                <TabsList>
                  <TabsTrigger value="informasi-dasar">Informasi Dasar</TabsTrigger>
                  <TabsTrigger value="informasi-alamat-penghasilan">Alamat dan Penghasilan</TabsTrigger>
                </TabsList>
                <TabsContent value="informasi-dasar">
                  <BoxDetail label="Nama" value={selectedData?.nama} />
                  <BoxDetail label="NIK" value={selectedData?.nik} />
                  <BoxDetail label="No. Kartu Keluarga" value={selectedData?.noKk} />
                  <div className="mb-2">
                    <p className="mb-2 font-medium text-primary">Foto KTP</p>
                    <img alt="foto ktp" src={selectedData?.fotoKtpString} className="w-full" />
                  </div>
                  <div className="mb-2">
                    <p className="mb-2 font-medium text-primary">Foto KK</p>
                    <img alt="foto kk" src={selectedData?.fotoKkString} className="w-full" />
                  </div>
                  <BoxDetail label="Umur" value={selectedData?.umur} />
                  <BoxDetail label="Jenis Kelamin" value={selectedData?.jenisKelamin} />
                </TabsContent>
                <TabsContent value="informasi-alamat-penghasilan">
                  <div className="grid grid-cols-2">
                    <BoxDetail label="Provinsi" value={selectedData?.provinsi} />
                    <BoxDetail label="Kab/Kota" value={selectedData?.kabupaten} />
                    <BoxDetail label="Kecamatan" value={selectedData?.kecamatan} />
                    <BoxDetail label="Kelurahan/Desa" value={selectedData?.kelurahan} />
                    <div className="col-span-2">
                      <BoxDetail label="Alamat" value={selectedData?.alamat} />
                    </div>
                    <BoxDetail label="RT" value={selectedData?.rt} />
                    <BoxDetail label="RW" value={selectedData?.rw} />
                  </div>
                  <BoxDetail
                    label="Penghasilan Sebelum Pandemi"
                    value={formatCurrency(selectedData?.penghasilanSebelumPandemi)}
                  />
                  <BoxDetail
                    label="Penghasilan Setelah Pandemi"
                    value={formatCurrency(selectedData?.penghasilanSetelahPandemi)}
                  />
                  <BoxDetail label="Alasan membutuhkan bantuan" value={selectedData.alasan} />
                </TabsContent>
              </Tabs>
            </DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailData;
