import { Section } from "@/components/ui/section/section";
import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface NetworkInfoProps {
  data: Network;
  title?: string;
}

export default function NetworkInfo({
  data,
  title = "Details",
}: NetworkInfoProps) {
  return (
    <Section title={title}>
      <InfoGrid
        rows={[
          { label: "Network:", value: data.id },
          { label: "Name:", value: data.name },
          { label: "Description:", value: data.description },
          { label: "Project:", value: data.project },
          { label: "Partition:", value: data.partition },
          { label: "Namespace:", value: data.namespace },
        ]}
      />
    </Section>
  );
}
