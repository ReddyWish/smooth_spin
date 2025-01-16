'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import {
  insertTicketSchema,
  type insertTicketSchemaType,
  type selectTicketSchemaType,
} from '@/zod-schemas/ticket';
import { selectCustomerSchemaType } from '@/zod-schemas/customer';
import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { CheckboxWithLabel } from '@/components/inputs/CheckboxWithLabel';
import { Button } from '@/components/ui/button';
import { TextAreaWithLabel } from '@/components/inputs/TextAreaWithLabel';
import { SelectWithLabel } from '@/components/inputs/SelectWithLabel';
import { useAction } from 'next-safe-action/hooks';
import { saveTicketAction } from '@/app/actions/saveTicketAction';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse';

type TicketFormProps = {
  customer: selectCustomerSchemaType;
  ticket?: selectTicketSchemaType;
  techs?: { id: string; description: string }[];
  isEditable?: boolean;
};

export default function TicketForm({
  customer,
  ticket,
  techs,
  isEditable = true,
}: TicketFormProps) {
  const isManager = Array.isArray(techs);

  const { toast } = useToast();

  const defaultValues: insertTicketSchemaType = {
    id: ticket?.id || '(New)',
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title || '',
    description: ticket?.description || '',
    completed: ticket?.completed || false,
    tech: ticket?.tech.toLowerCase() ?? 'new-ticket@example.com',
  };

  const form = useForm<insertTicketSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess: ({ data }) => {
      //toast user
      toast({
        variant: 'default',
        title: 'Success! ✅',
        description: data?.message,
      });
    },
    onError: ({ error }) => {
      //toast error
      toast({
        variant: 'destructive',
        title: 'Error! 😞',
        description: 'Save Failed',
      });
    },
  });

  async function submitForm(data: insertTicketSchemaType) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Edit Ticket # ${ticket.id}`
            : ticket?.id
              ? `View Ticket # ${ticket.id}`
              : 'New Ticket Form'}
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
              disabled={!isEditable}
            />
            {isManager ? (
              <SelectWithLabel<insertTicketSchemaType>
                fieldTitle="Select"
                nameInSchema="tech"
                data={[
                  {
                    id: 'new-ticket@example.com',
                    description: 'new-ticket@example.com',
                  },
                  ...techs,
                ]}
              />
            ) : (
              <InputWithLabel<insertTicketSchemaType>
                fieldTitle="Tech"
                nameInSchema="tech"
                disabled={true}
              />
            )}
            {ticket?.id ? (
              <CheckboxWithLabel<insertTicketSchemaType>
                fieldTitle="Completed"
                nameInSchema="completed"
                message="Yes"
                disabled={!isEditable}
              />
            ) : null}
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
              disabled={!isEditable}
            />
            {isEditable ? (
              <>
                <Button
                  type="submit"
                  variant="default"
                  title="Save"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Saving
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  title="Reset"
                  onClick={() => {
                    form.reset(defaultValues);
                    resetSaveAction();
                  }}
                >
                  Reset
                </Button>
              </>
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
}
