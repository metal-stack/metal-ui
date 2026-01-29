import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";

interface FilesystemLayoutInfoProps {
  data: FilesystemLayout;
}

export default function FilesystemLayoutInfo({
  data,
}: FilesystemLayoutInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id || "-"}
      </div>
      <div>
        <strong>Name:</strong> {data.name || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data.description || "-"}
      </div>
      <div className="flex flex-col">
        <strong>Filesystems:</strong>
        <FilesystemInfo data={data.filesystems} />
      </div>
      {/* TODO: add all fields here */}
    </div>
  );
}
