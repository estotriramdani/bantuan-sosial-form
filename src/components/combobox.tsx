/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronsUpDown, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

// interface IOption { value: string; label: string }

interface Props {
  value: string;
  setValue: (value: string) => void;
  data: { value: string; label: string }[];
  onSelect?: (value: string) => void;
  allowCustomValue?: boolean;
}

export const ComboBox: React.FC<Props> = ({ onSelect, setValue, value, data, allowCustomValue }) => {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const foundSelected = data.find((item) => item.value?.toLowerCase() === value?.toLowerCase());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
          {value && allowCustomValue && !foundSelected && value}
          {value && foundSelected && foundSelected?.label}
          {!value && 'Pilih...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className="max-h-[200px] overflow-y-auto">
          <CommandInput onValueChange={(e) => setTempValue(e)} placeholder="Cari..." />
          <CommandEmpty>
            <strong>{tempValue}</strong>. Tidak ditemukan.
            {allowCustomValue && (
              <div className="mt-2">
                <Button
                  size="icon"
                  title="Tambahkan"
                  onClick={() => {
                    setValue(tempValue);
                    setOpen(false);
                  }}
                >
                  <Plus />
                </Button>
              </div>
            )}
          </CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue?.toLowerCase() === value?.toLowerCase() ? '' : currentValue);
                  onSelect?.(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value?.toLowerCase() === item.value?.toLowerCase() ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
