import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

interface ProjectInfoProps {
  data: Project;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "UUID:", value: <CopyableText text={data.uuid} variant="inline" /> },
          { label: "Name:", value: data.name },
          { label: "Tenant:", value: <CopyableText text={data.tenant} variant="inline" /> },
          {
            label: "Description:",
            value: data.description || "—",
          },
          {
            label: "Avatar URL:",
            value: data.avatarUrl ? <CopyableText text={data.avatarUrl} variant="block" /> : "—",
          },
        ]}
      />
    </div>
  );
}
