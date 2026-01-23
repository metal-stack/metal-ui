import { SwitchSync } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { timestampDate, timestampNow } from "@bufbuild/protobuf/wkt";

interface SwitchLastSyncProps {
  lastSync?: SwitchSync;
}

export default function SwitchLastSync({ lastSync }: SwitchLastSyncProps) {
  console.log("lastSync", lastSync);
  if (!lastSync || !lastSync.time) {
    return "-";
  }

  const now = timestampNow();
  const diffMs =
    timestampDate(now).getTime() - timestampDate(lastSync.time).getTime();
  // return in seconds
  return <div>{Math.floor(diffMs / 1000)}s</div>;
}
