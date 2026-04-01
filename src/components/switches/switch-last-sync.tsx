import { SwitchSync } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { TimeStampPill } from "../ui/timeStamp-pill";

interface SwitchLastSyncProps {
  lastSync?: SwitchSync;
}

export default function SwitchLastSync({ lastSync }: SwitchLastSyncProps) {
  if (!lastSync || !lastSync.time) {
    return "-";
  }

  const date = timestampDate(lastSync.time);

  return (
    <TimeStampPill date={date} className="bg-secondary text-secondary-foreground" />
  );
}
