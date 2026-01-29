import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface NetworkInfoProps {
  data: Network;
}

export default function NetworkInfo({ data }: NetworkInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Network:", value: data.name },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        { label: "Project:", value: data.project },
        { label: "Partition:", value: data.partition },
        { label: "Namespace:", value: data.namespace },
      ]}
    />
  );
}
