import { customers } from '@/db/schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.firstName.min(1, 'First Name is required'),
  lastName: (schema) => schema.lastName.min(1, 'Last Name is required'),
  address1: (schema) => schema.address1.min(1, 'Address is required'),
  city: (schema) => schema.city.min(1, 'City is required'),
  email: (schema) => schema.email.email('Email is required'),
  zip: (schema) => schema.zip.regex(/^\d{5}(-\d{4})?$/, 'Invalid Zip code'),
  phone: (schema) =>
    schema.phone.regex(/^\d{3}-\d{3}-\d{4}$/, 'Invalid phone number'),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type insertCustomerSchemaType = typeof insertCustomerSchema._type;

export type selectCustomerSchemaType = typeof selectCustomerSchema._type;
