import { getTicket } from '@/lib/queries/getTicket';
import { BackButton } from '@/components/BackButton';
import { getCustomer } from '@/lib/queries/getCustomer';

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Customer ID and Ticket ID are required to load ticket form
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }
    //New Ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer with ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      //return ticket form
      console.log(customer);
    }

    //Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Ticket with ID #{ticketId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      //Return Ticket Form
      console.log('ticket', ticket);
      console.log('customer', customer);
    }
  } catch (error) {}
}
