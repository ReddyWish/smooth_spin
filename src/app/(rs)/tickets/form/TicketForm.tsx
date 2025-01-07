'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/zod-schemas/ticket';
import {
  type insertCustomerSchemaType,
  selectCustomerSchemaType,
} from '@/zod-schemas/customer';
import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { CheckboxWithLabel } from '@/components/inputs/CheckboxWithLabel';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel';

type TicketFormProps = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
};

export default function TicketForm({ customer, ticket }: TicketFormProps) {
  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id || '(New)',
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title || '',
    description: ticket?.description || '',
    completed: ticket?.completed || false,
    tech: ticket?.tech || 'new-ticket@example.com',
  };

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  async function submitForm(data: insertTicketSchemaType) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? 'Edit' : 'New'} Ticket{' '}
          {ticket?.id ? `# ${ticket.id}` : 'Form'}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <div className=" flex flex-col gap-4 w-full max-w-xs">
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Title"
              nameInSchema="title"
            />
            <InputWithLabel<insertTicketSchemaType>
              fieldTitle="Tech"
              nameInSchema="tech"
              readOnly={true}
            />
            <CheckboxWithLabel<insertTicketSchemaType>
              fieldTitle="Completed"
              nameInSchema="completed"
              message="Yes"
            />
            <div>
              <div className="mt-4 space-y-2">
                <h3 className="text-lg">Customer Info</h3>
                <hr className="w-4/5" />
                <p>
                  {customer.firstName} {customer.lastName}
                </p>
                <p>{customer.address1}</p>
                {customer.address2 ? <p>{customer.address2}</p> : null}
                <p>
                  {customer.city}, {customer.zip}
                </p>
                <hr className="w-4/5" />
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <TextAreaWithLabel<insertTicketSchemaType>
              fieldTitle="Description"
              nameInSchema="description"
              className="h-96"
            />
            <Button type="submit" variant="default" title="Save">
              Save
            </Button>
            <Button
              type="button"
              variant="destructive"
              title="Reset"
              onClick={() => form.reset(defaultValues)}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
