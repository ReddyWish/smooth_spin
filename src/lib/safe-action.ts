import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';
import type { NeonDbError } from '@neondatabase/serverless';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    console.error(e);
    if (e.constructor.name === 'NeonDBError') {
      const { code, detail } = e as NeonDbError;
      if (code === '23505') {
        return `Unique entry required. ${detail}`;
      }
    }
    if (e.constructor.name === 'NeonDBError') {
      return 'Database error: Your data did not save. Support will be notified';
    }
    return e.message;
  },
});
