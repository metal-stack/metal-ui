import { InfoGrid } from "@/components/info-grid/info-grid";
import {
  FirewallEgressRule,
  IPProtocol,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface EgressRulesInfoProps {
  data: FirewallEgressRule;
}

export default function EgressRulesInfo({ data }: EgressRulesInfoProps) {
  return (
    <InfoGrid
      rows={[
        {
          label: "IP protocol:",
          value: IPProtocol[data.protocol],
        },
        {
          label: "Ports:",
          value: data.ports.join(", "),
        },
        {
          label: "To:",
          value: data.to.join(", "),
        },
        {
          label: "Comment:",
          value: data.comment,
        },
      ]}
    />
  );
}
