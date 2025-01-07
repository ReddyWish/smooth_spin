import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

type CheckboxWithLabelProps<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  message: string;
};

export function CheckboxWithLabel<T>({
  fieldTitle,
  nameInSchema,
  message,
}: CheckboxWithLabelProps<T>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-4 shadow">
          <div className="flex gap-5 items-center">
            <span>{fieldTitle}:</span>
            <FormControl>
              <Checkbox
                id={nameInSchema}
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <div className="space-y-1 leading-none">
            <FormLabel>{message}</FormLabel>
          </div>
        </FormItem>
      )}
    />
  );
}
