import { MachineBios } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface MachineBiosInfoProps {
  data: MachineBios;
}

export default function MachineBiosInfo({ data }: MachineBiosInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "Vendor:", value: data.vendor },
        { label: "Version:", value: data.version },
        { label: "Date:", value: data.date },
      ]}
    />
  );
}
