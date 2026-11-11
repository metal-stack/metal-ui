import { Section } from "@/components/ui/section/section";
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
    <>
      <Section title="Hardware">
        <InfoGrid
          rows={[{ label: "Memory:", value: formatBytesBigInt(data.memory) }]}
        />
      </Section>
      <Section title="CPUs" flush fullWidth>
        <DataTable bare initialData={data.cpus} columns={cpuColumns} />
      </Section>
      <Section title="Block devices" flush fullWidth>
        <DataTable bare initialData={data.disks} columns={blockDeviceColumns} />
      </Section>
      <Section title="GPUs" flush fullWidth>
        <DataTable bare initialData={data.gpus} columns={gpuColumns} />
      </Section>
      <Section title="NICs" flush fullWidth>
        <DataTable bare initialData={data.nics} columns={nicColumns} />
      </Section>
    </>
  );
}
