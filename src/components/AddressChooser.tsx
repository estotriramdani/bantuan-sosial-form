import React, { useContext } from 'react';
import { ComboBox } from './combobox';
import AppContext from '@/context/AppContext';

const AddressChooser = () => {
  const ctx = useContext(AppContext);
  const [value, setValue] = React.useState('');

  return (
    <div>
      <ComboBox
        data={ctx?.provinces?.map((prov) => ({ value: prov.id, label: prov.name })) || []}
        setValue={setValue}
        value={value}
      />
    </div>
  );
};

export default AddressChooser;
