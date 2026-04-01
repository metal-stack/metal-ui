import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";
import { CopyText } from "../ui/copy-text";

interface NetworkInfoProps {
  data: Network;
}

export default function NetworkInfo({ data }: NetworkInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: <CopyText text={data.id} /> },
        { label: "Network:", value: data.name },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        { label: "Project:", value: data.project },
        { label: "Partition:", value: data.partition },
        { label: "Namespace:", value: data.namespace },
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
