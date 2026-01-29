import { FirewallRules } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import EgressRulesInfo from "./egress-rules-info";
import IngressRulesInfo from "./ingress-rule-info";
import { InfoGrid } from "@/components/info-grid/info-grid";

interface FirewallRulesInfoProps {
  data: FirewallRules;
}

export default function FirewallRulesInfo({ data }: FirewallRulesInfoProps) {
  return (
    <InfoGrid
      rows={[
        {
          label: "Egress",
          value: data.egress.length ? (
            <div className="flex flex-col gap-2">
              {data.egress.map((rule, index) => (
                <EgressRulesInfo key={index} data={rule} />
              ))}
            </div>
          ) : undefined,
          fullWidth: data.egress.length > 0,
        },
        {
          label: "Ingress",
          value: data.ingress.length ? (
            <div className="flex flex-col gap-2">
              {data.ingress.map((rule, index) => (
                <IngressRulesInfo key={index} data={rule} />
              ))}
            </div>
          ) : undefined,
          fullWidth: data.ingress.length > 0,
        },
      ]}
    />
  );
}
