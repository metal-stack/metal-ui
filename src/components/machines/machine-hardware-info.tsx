import {
  MachineBlockDevice,
  MachineHardware,
  MachineNic,
  MetalCPU,
  MetalGPU,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { formatBytesBigInt } from "@/lib/size-utilities";
import { InfoGrid } from "../info-grid/info-grid";

interface MachineHardwareInfoProps {
  data: MachineHardware;
}

const cpuColumns: ColumnDef<MetalCPU>[] = [
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "cores",
    header: "Cores",
  },
  {
    accessorKey: "threads",
    header: "Threads",
  },
];

const blockDeviceColumns: ColumnDef<MachineBlockDevice>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => formatBytesBigInt(row.original.size),
  },
];

const gpuColumns: ColumnDef<MetalGPU>[] = [
  {
    accessorKey: "vendor",
    header: "Vendor",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
];

const nicColumns: ColumnDef<MachineNic>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mac",
    header: "MAC Address",
  },
  { accessorKey: "identifier", header: "Identifier" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "speed", header: "Speed" },
  { accessorKey: "hostname", header: "Hostname" },
];

export default function MachineHardwareInfo({
  data,
}: MachineHardwareInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Memory:", value: formatBytesBigInt(data.memory) },

        {
          label: "CPUs:",
          value: <DataTable initialData={data.cpus} columns={cpuColumns} />,
          fullWidth: true,
        },
        {
          label: "Block Devices:",
          value: (
            <DataTable initialData={data.disks} columns={blockDeviceColumns} />
          ),
          fullWidth: true,
        },
        {
          label: "GPUs:",
          value: <DataTable initialData={data.gpus} columns={gpuColumns} />,
          fullWidth: true,
        },
        {
          label: "NICs:",
          value: <DataTable initialData={data.nics} columns={nicColumns} />,
          fullWidth: true,
        },
      ]}
    />
  );
}
