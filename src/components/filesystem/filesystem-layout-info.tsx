import { Section } from "@/components/ui/section/section";
import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";
import { InfoGrid } from "../info-grid/info-grid";

interface FilesystemLayoutInfoProps {
  data: FilesystemLayout;
  title?: string;
}

export default function FilesystemLayoutInfo({
  data,
  title = "Details",
}: FilesystemLayoutInfoProps) {
  return (
    <>
      <Section title={title}>
        <InfoGrid
          rows={[
            { label: "ID:", value: data.id },
            { label: "Name:", value: data.name },
            { label: "Description:", value: data.description },
          ]}
        />
      </Section>
      <Section title="Filesystems" flush fullWidth>
        <FilesystemInfo data={data.filesystems} />
      </Section>
    </>
  );
}
