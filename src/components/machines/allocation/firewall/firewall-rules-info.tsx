import { Section } from "@/components/ui/section/section";
import { ColumnDef } from "@tanstack/react-table";
import {
  FirewallEgressRule,
  FirewallIngressRule,
  FirewallRules,
  IPProtocol,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { DataTable } from "@/components/ui/data-table/data-table";

interface FirewallRulesInfoProps {
  data: FirewallRules;
}

const egressColumns: ColumnDef<FirewallEgressRule>[] = [
  {
    accessorKey: "protocol",
    header: "Protocol",
    cell: ({ row }) => IPProtocol[row.original.protocol],
  },
  {
    accessorKey: "ports",
    header: "Ports",
    cell: ({ row }) => row.original.ports.join(", "),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => row.original.to.join(", "),
  },
  { accessorKey: "comment", header: "Comment" },
];

const ingressColumns: ColumnDef<FirewallIngressRule>[] = [
  {
    accessorKey: "protocol",
    header: "Protocol",
    cell: ({ row }) => IPProtocol[row.original.protocol],
  },
  {
    accessorKey: "ports",
    header: "Ports",
    cell: ({ row }) => row.original.ports.join(", "),
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => row.original.from.join(", "),
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => row.original.to.join(", "),
  },
  { accessorKey: "comment", header: "Comment" },
];

export default function FirewallRulesInfo({ data }: FirewallRulesInfoProps) {
  return (
    <>
      <Section title="Firewall egress rules" flush fullWidth>
        <DataTable bare initialData={data.egress} columns={egressColumns} />
      </Section>
      <Section title="Firewall ingress rules" flush fullWidth>
        <DataTable bare initialData={data.ingress} columns={ingressColumns} />
      </Section>
    </>
  );
}
