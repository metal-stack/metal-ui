import { Project } from "@metal-stack/api/js/metalstack/api/v2/project_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";
import { CopyText } from "../ui/copy-text";

interface ProjectInfoProps {
  data: Project;
}

export default function ProjectInfo({ data }: ProjectInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: <CopyText text={data.uuid} /> },
        { label: "Name:", value: data.name },
        { label: "Tenant:", value: data.tenant },
        {
          label: "Description:",
          value: data.description || "—",
        },
        {
          label: "Created at:",
          value: data.meta?.createdAt ? (
            <TimeStampPill date={timestampDate(data.meta.createdAt)} />
          ) : undefined,
        },
        {
          label: "Updated at:",
          value: data.meta?.updatedAt ? (
            <TimeStampPill date={timestampDate(data.meta.updatedAt)} />
          ) : undefined,
        },
      ]}
    />
  );
}
