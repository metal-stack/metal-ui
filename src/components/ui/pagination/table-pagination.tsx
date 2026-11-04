import type { Table } from "@tanstack/react-table";
import { Group, Pagination, Select, Text } from "@mantine/core";

export function DataTablePagination<TData>({ table }: { table: Table<TData> }) {
  const { pageIndex, pageSize } = table.getState().pagination;

  return (
    <Group justify="flex-end" py="xs" gap="sm">
      <Text size="sm" fw={500}>
        Rows per page
      </Text>
      <Select
        aria-label="Rows per page"
        size="xs"
        w={80}
        allowDeselect={false}
        data={["10", "20", "30", "40", "50"]}
        value={String(pageSize)}
        onChange={(value) => value && table.setPageSize(Number(value))}
      />
      <Pagination
        size="sm"
        total={table.getPageCount()}
        value={pageIndex + 1}
        onChange={(page) => table.setPageIndex(page - 1)}
      />
    </Group>
  );
}
