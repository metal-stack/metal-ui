import { Section } from "@/components/ui/section/section";
import { MachineBios } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface MachineBiosInfoProps {
  data: MachineBios;
  title?: string;
}

export default function MachineBiosInfo({
  data,
  title = "Details",
}: MachineBiosInfoProps) {
  return (
    <Section title={title}>
      <InfoGrid
        rows={[
          { label: "Vendor:", value: data.vendor },
          { label: "Version:", value: data.version },
          { label: "Date:", value: data.date },
        ]}
      />
    </Section>
  );
}
