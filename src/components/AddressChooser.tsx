import { useContext, useEffect, useState } from 'react';
import { ComboBox } from './combobox';
import AppContext from '@/context/AppContext';

const AddressChooser = () => {
  const ctx = useContext(AppContext);
  const [provinceName, setProvinceName] = useState('');
  const [regencyName, setRegencyName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [villageName, setVillageName] = useState('');

  useEffect(() => {
    if (ctx?.provinces) {
      ctx.handleChangeAddress(
        'province',
        ctx.provinces.find((prov) => prov.name?.toLowerCase() === provinceName),
      );
    }
    if (ctx?.regencies) {
      ctx.handleChangeAddress(
        'regency',
        ctx.regencies.find((reg) => reg.name?.toLowerCase() === regencyName),
      );
    }
    if (ctx?.districts) {
      ctx.handleChangeAddress(
        'district',
        ctx.districts.find((dis) => dis.name?.toLowerCase() === districtName),
      );
    }
    if (ctx?.villages) {
      ctx.handleChangeAddress(
        'village',
        ctx.villages.find((vil) => vil.name?.toLowerCase() === villageName),
      );
    }
  }, [ctx, districtName, provinceName, regencyName, villageName]);

  return (
    <div>
      <div className="mb-3">
        <p className="mb-2 text-sm font-medium">Provinsi</p>
        <ComboBox
          data={ctx?.provinces?.map((prov) => ({ value: prov.name, label: prov.name })) || []}
          setValue={setProvinceName}
          value={provinceName}
        />
      </div>
      {ctx?.regencies && ctx.regencies.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-sm font-medium">Kabupaten/Kota</p>
          <ComboBox
            data={ctx?.regencies?.map((reg) => ({ value: reg.name, label: reg.name })) || []}
            setValue={setRegencyName}
            value={regencyName}
          />
        </div>
      )}
      {ctx?.districts && ctx.districts.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-sm font-medium">Kecamatan</p>
          <ComboBox
            data={ctx?.districts?.map((dis) => ({ value: dis.name, label: dis.name })) || []}
            setValue={setDistrictName}
            value={districtName}
          />
        </div>
      )}
      {ctx?.villages && ctx.villages.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-sm font-medium">Desa/Kelurahan</p>
          <ComboBox
            data={ctx?.villages?.map((vil) => ({ value: vil.name, label: vil.name })) || []}
            setValue={setVillageName}
            value={villageName}
          />
        </div>
      )}
    </div>
  );
};

export default AddressChooser;
