import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface ProjectInfoProps {
  data: Project;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
  return (
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
  );
}
