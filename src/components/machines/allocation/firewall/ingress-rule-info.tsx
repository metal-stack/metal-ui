import { InfoGrid } from "@/components/info-grid/info-grid";
import {
  FirewallIngressRule,
  IPProtocol,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface IngressRulesInfoProps {
  data: FirewallIngressRule;
}

export default function IngressRulesInfo({ data }: IngressRulesInfoProps) {
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
