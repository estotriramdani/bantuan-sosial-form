/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher } from '@/lib/services';
import { IDistrict, IProvince, IRegency, IVillage } from '@/types';
import React, { createContext, useState } from 'react';
import useSWR from 'swr';

interface IAppContext {
  province: IProvince | null;
  regency: IRegency | null;
  district: IDistrict | null;
  village: IVillage | null;
  handleChangeAddress: (type: string, value: any) => void;
  provinces?: IProvince[];
  regencies?: IRegency[];
  districts?: IDistrict[];
  villages?: IVillage[];
}

const AppContext = createContext<IAppContext>({
  district: null,
  province: null,
  regency: null,
  village: null,
  handleChangeAddress: () => null,
});

export default AppContext;

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [province, setProvince] = useState<IProvince | null>(null);
  const [regency, setRegency] = useState<IRegency | null>(null);
  const [district, setDistrict] = useState<IDistrict | null>(null);
  const [village, setVillage] = useState<IVillage | null>(null);

  const { data: provinces } = useSWR<IProvince[]>(
    `${import.meta.env.VITE_APP_WILAYAH_API_URL}/provinces.json`,
    fetcher,
  );

  const { data: regencies } = useSWR<IRegency[]>(
    `${import.meta.env.VITE_APP_WILAYAH_API_URL}/regencies/${province?.id}.json`,
    province?.id ? fetcher : null,
  );

  const { data: districts } = useSWR<IDistrict[]>(
    `${import.meta.env.VITE_APP_WILAYAH_API_URL}/districts/${regency?.id}.json`,
    regency?.id ? fetcher : null,
  );

  const { data: villages } = useSWR<IVillage[]>(
    `${import.meta.env.VITE_APP_WILAYAH_API_URL}/villages/${district?.id}.json`,
    district?.id ? fetcher : null,
  );

  const handleChangeAddress = (type: string, value: any) => {
    switch (type) {
      case 'province':
        setProvince(value);
        setRegency(null);
        setDistrict(null);
        setVillage(null);
        break;
      case 'regency':
        setRegency(value);
        setDistrict(null);
        setVillage(null);
        break;
      case 'district':
        setDistrict(value);
        setVillage(null);
        break;
      case 'village':
        setVillage(value);
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        province,
        regency,
        district,
        village,
        handleChangeAddress,
        provinces,
        regencies,
        districts,
        villages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
