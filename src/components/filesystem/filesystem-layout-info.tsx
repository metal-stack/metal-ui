import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";
import InfoCollapsible from "../info-collapsible/info-collapsible";

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
        {data.filesystems && data.filesystems.length > 0 ? (
          <div className="ml-2 flex flex-col gap-2">
            {data.filesystems.map((filesystem, index) => (
              <InfoCollapsible key={index} title="Filesystem">
                <FilesystemInfo data={filesystem} />
              </InfoCollapsible>
            ))}
          </div>
        ) : (
          "-"
        )}
      </div>
      {/* TODO: add all fields here */}
    </div>
  );
}
