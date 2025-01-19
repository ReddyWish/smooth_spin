import CustomerSearch from '@/app/(rs)/customers/CustomerSearch';
import { getCustomerSearchResults } from '@/lib/queries/getCustomerSearchResults';
import CustomerTable from '@/app/(rs)/customers/CustomerTable';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Customer Search',
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  //query database
  const results = await getCustomerSearchResults(searchText);

  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <>
          <CustomerTable data={results} />
        </>
      ) : (
        <p className="mt-4">No results found</p>
      )}
    </>
  );
}
