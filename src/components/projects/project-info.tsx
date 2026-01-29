import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";

interface ProjectInfoProps {
  data: Project;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Tenant:</strong> {data.tenant}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
    </div>
  );
}
