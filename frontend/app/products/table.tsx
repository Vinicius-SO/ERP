'use client'
import { useState } from "react";
import { ItemsType } from "@/types/items"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Modal } from "../items/components/modal";
import { AddItemForm } from "../items/components/AddItemForm";


const columns: ColumnDef<ItemsType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => {
      const value = info.getValue() as string; // Força o tipo para string
      return (
        <button className="text-blue-700 hover:underline">
          {value}
        </button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  }
]


interface DataTableProps {
  data: ItemsType[];
}

export function ProductsTable({
  data,
}: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState(""); // Estado para o filtro global
  const [pageSize, setPageSize] = useState(7); // Estado para controlar o número de linhas por página

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter, // Passa o filtro global para a tabela
    },
    onGlobalFilterChange: setGlobalFilter, // Atualiza o estado global do filtro
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Ativa a funcionalidade de filtragem
    globalFilterFn: "includesString", // Define o tipo de filtragem (pode ser customizado)
    initialState: {
      pagination: {
        pageSize, // Define o número de linhas por página
      },
    },
  });

  return (
    <div className="w-7/12">
      <div className="flex w-full mb-2 justify-between">
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="w-1/3 px-4 py-1 border rounded-md"
          />
         <Modal>
          {({ setIsOpen }) => (
            <AddItemForm setIsOpen={setIsOpen} />
          )}
        </Modal>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
       <div className="mb-4">
          <label className="mr-2 text-gray-600">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              setPageSize(value); // Atualiza o estado de pageSize
              table.setPageSize(value); // Atualiza a tabela
            }}
            className="border rounded px-2 py-1 text-gray-600"
          >
            {[7, 10, 15, 20].map((size) => (
              <option key={size} value={size} className="text-gray-600">
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}