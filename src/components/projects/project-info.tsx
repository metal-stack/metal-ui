import { Section } from "@/components/ui/section/section";
import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface ProjectInfoProps {
  data: Project;
  title?: string;
}

export default function ProjectInfo({
  data,
  title = "Details",
}: ProjectInfoProps) {
  return (
    <Section title={title}>
      <InfoGrid
        rows={[
          { label: "Name:", value: data.name },
          { label: "Tenant:", value: data.tenant },
          {
            label: "Description:",
            value: data.description || "—",
          },
        ]}
      />
    </Section>
  );
}
