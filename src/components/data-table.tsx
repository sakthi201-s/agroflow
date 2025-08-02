'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Button} from './ui/button';
import {Download} from 'lucide-react';
import {exportToCsv} from '@/lib/csv';
import React from 'react';

type Column<TData> = {
  header: string;
  accessorKey: keyof TData;
  cell?: (props: { getValue: () => any, row: { original: TData } }) => React.ReactNode;
};

interface DataTableProps<TData> {
  columns: Column<TData>[];
  data: TData[];
  tableName: string;
}

export function DataTable<TData>({
  columns,
  data,
  tableName
}: DataTableProps<TData>) {
  return (
    <div className="space-y-4">
       <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() => exportToCsv(`${tableName.toLowerCase().replace(/\s+/g, '_')}_export`, data)}
        >
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell
                        ? column.cell({ getValue: () => row[column.accessorKey], row: { original: row } })
                        : String(row[column.accessorKey])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
