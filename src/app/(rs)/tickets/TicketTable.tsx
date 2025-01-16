'use client';

import { TicketSearchResultType } from '@/lib/queries/getTicketSearchResults';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

type TicketTableProps = {
  data: TicketSearchResultType;
};

type RowType = TicketSearchResultType[0];

export default function TicketTable({ data }: TicketTableProps) {
  const router = useRouter();

  const columnHeaderArray: Array<keyof RowType> = [
    'ticketDate',
    'title',
    'tech',
    'firstName',
    'lastName',
    'email',
    'completed',
  ];

  const columnHelper = createColumnHelper<RowType>();

  const columns = columnHeaderArray.map((columnName) => {
    return columnHelper.accessor(
      (row) => {
        const value = row[columnName];
        if (columnName === 'ticketDate' && value instanceof Date) {
          return value.toLocaleDateString('en-Us', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        }
        if (columnName === 'completed') {
          return value ? 'COMPLETED' : 'OPEN';
        }
        return value;
      },
      {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1),
        cell: ({ getValue }) => {
          //presentational
          const value = getValue();
          if (columnName === 'completed') {
            return (
              <div className="grid place-comntent-center">
                {value === 'OPEN' ? (
                  <CircleXIcon className="opcity-25" />
                ) : (
                  <CircleCheckIcon className="text-green-600" />
                )}
              </div>
            );
          }
          return value;
        },
      },
    );
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-secondary">
                  <div>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() =>
                router.push(`/customers/form?ticketId=${row.original.id}`)
              }
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
