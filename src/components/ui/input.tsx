import * as React from 'react';
import CurrencyInputComponent, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: number;
  decimalsLimit?: number;
  onValueChange?:
    | ((
        value: string | undefined,
        name?: string | undefined,
        values?: CurrencyInputOnChangeValues | undefined,
      ) => void)
    | undefined;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  return (
    <CurrencyInputComponent
      id={props.id}
      name={props.name}
      prefix={props.prefix}
      placeholder={props.placeholder}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.className,
      )}
      defaultValue={1000}
      decimalsLimit={2}
      onValueChange={props.onValueChange}
    />
  );
};

export { Input };
