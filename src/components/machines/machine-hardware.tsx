import {
  MachineBlockDevice,
  MachineHardware,
  MachineNic,
  MetalCPU,
  MetalGPU,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";

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
    <div className="flex flex-col gap-2">
      <div>
        <strong>Memory:</strong> {data.memory}
      </div>
      <div>
        <strong>CPUs:</strong>
        <DataTable initialData={data.cpus} columns={cpuColumns} />
      </div>
      <div>
        <strong>Block Devices:</strong>
        <DataTable initialData={data.disks} columns={blockDeviceColumns} />
      </div>
      <div>
        <strong>GPUs:</strong>
        <DataTable initialData={data.gpus} columns={gpuColumns} />
      </div>
      <div>
        <strong>NICs:</strong>
        <DataTable initialData={data.nics} columns={nicColumns} />
      </div>
    </div>
  );
}
