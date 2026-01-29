import { FirewallRules } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import EgressRulesInfo from "./egress-rules-info";
import IngressRulesInfo from "./ingress-rule-info";

interface FirewallRulesInfoProps {
  data: FirewallRules;
}

export default function FirewallRulesInfo({ data }: FirewallRulesInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <strong>Egress:</strong>
        {data.egress.map((rule, index) => (
          <EgressRulesInfo key={index} data={rule} />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <strong>Ingress:</strong>
        {data.ingress.map((rule, index) => (
          <IngressRulesInfo key={index} data={rule} />
        ))}
      </div>
    </div>
  );
}
