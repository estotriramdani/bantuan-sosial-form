/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

// interface IOption { value: string; label: string }

interface Props {
  value: string;
  setValue: (value: string) => void;
  data: any[];
  onSelect?: (value: string) => void;
}

export const ComboBox: React.FC<Props> = ({ onSelect, setValue, value, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
          {value ? data.find((item) => item.value?.toLowerCase() === value?.toLowerCase())?.label : 'Cari...'}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command className='max-h-[200px] overflow-y-auto'>
          <CommandInput onValueChange={(e) => console.log(e)} placeholder="Cari..." />
          <CommandEmpty>Tidak ditemukan.</CommandEmpty>
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
                <Check className={cn('mr-2 h-4 w-4', value?.toLowerCase() === item.value?.toLowerCase() ? 'opacity-100' : 'opacity-0')} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
