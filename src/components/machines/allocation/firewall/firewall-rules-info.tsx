import { Stack } from "@mantine/core";
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
            <Stack gap="xs">
              {data.egress.map((rule, index) => (
                <EgressRulesInfo key={index} data={rule} />
              ))}
            </Stack>
          ) : undefined,
          fullWidth: data.egress.length > 0,
        },
        {
          label: "Ingress",
          value: data.ingress.length ? (
            <Stack gap="xs">
              {data.ingress.map((rule, index) => (
                <IngressRulesInfo key={index} data={rule} />
              ))}
            </Stack>
          ) : undefined,
          fullWidth: data.ingress.length > 0,
        },
      ]}
    />
  );
}
