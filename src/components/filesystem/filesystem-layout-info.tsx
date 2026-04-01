import { FilesystemLayout } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyText } from "../ui/copy-text";

interface FilesystemLayoutInfoProps {
  data: FilesystemLayout;
}

export default function FilesystemLayoutInfo({
  data,
}: FilesystemLayoutInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: <CopyText text={data.id} /> },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        {
          label: "Filesystems",
          value: <FilesystemInfo data={data.filesystems} />,
          fullWidth: true,
        },
      ]}
    />
  );
}
