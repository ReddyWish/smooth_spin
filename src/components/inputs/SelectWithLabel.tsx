import { SelectHTMLAttributes } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

type DataObj = {
  id: string;
  description: string;
};

type SelectWithLabelProps<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  data: DataObj[];
  className?: string;
};

export function SelectWithLabel<T>({
  fieldTitle,
  nameInSchema,
  data,
  className,
}: SelectWithLabelProps<T>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                id={nameInSchema}
                className={`w-full max-w-xs ${className}`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {data.map((item, index) => (
                <SelectItem key={index} value={item.id}>
                  {item.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
