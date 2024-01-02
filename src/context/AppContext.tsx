import { fetcher } from '@/lib/services';
import { IProvince } from '@/types';
import React, { createContext, useState } from 'react';
import useSWR from 'swr';

const AppContext = createContext({});

export default AppContext;

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provinceData, setProvinceData] = useState<IProvince>();

  const { data: provinces } = useSWR<IProvince[]>(
    `${import.meta.env.VITE_APP_WILAYAH_API_URL}/provinces.json`,
    fetcher,
  );

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
