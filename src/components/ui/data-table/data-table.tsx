import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { tileBg } from "@/theme";
import { Paper, Table, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DataTablePagination } from "../pagination/table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
  /** Render without own border/rounding, for use inside a flush Section */
  bare?: boolean;
  getRowId?:
    | ((
        originalRow: TData,
        index: number,
        parent?: Row<TData> | undefined,
      ) => string)
    | undefined;
  /** When set, rows are clickable and navigate to the returned detail page */
  getRowHref?: (originalRow: TData) => string;
}

export function DataTable<TData, TValue>({
  columns,
  initialData,
  bare,
  getRowId,
  getRowHref,
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const [data] = useState(() => initialData);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div>
      <Paper
        withBorder
        bg={tileBg}
        radius={bare ? 0 : "lg"}
        style={{
          overflow: "hidden",
          ...(bare && { borderWidth: "1px 0 0 0" }),
        }}
      >
        <Table highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  style={getRowHref ? { cursor: "pointer" } : undefined}
                  onClick={
                    getRowHref
                      ? (e) => {
                          // let modifier/non-primary clicks and inner links/buttons
                          // behave natively, and don't navigate on text selection
                          if (
                            e.defaultPrevented ||
                            e.button !== 0 ||
                            e.metaKey ||
                            e.ctrlKey ||
                            e.shiftKey ||
                            e.altKey ||
                            (e.target as HTMLElement).closest(
                              "a, button, input",
                            ) ||
                            window.getSelection()?.toString()
                          ) {
                            return;
                          }
                          navigate(getRowHref(row.original));
                        }
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length} h={96} ta="center">
                  <Text c="dimmed">No results.</Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
      {table.getPageCount() > 1 && (
        <div
          style={bare ? { padding: "0 var(--mantine-spacing-md)" } : undefined}
        >
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}
