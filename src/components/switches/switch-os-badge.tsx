import {
  SwitchOS,
  SwitchOSVendor,
} from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { Badge, Tooltip } from "@mantine/core";

interface SwitchOSBadgeProps {
  os?: SwitchOS;
}

export default function SwitchOSBadge({ os }: SwitchOSBadgeProps) {
  if (!os) {
    return "-";
  }

  let icon;
  switch (os.vendor) {
    case SwitchOSVendor.SWITCH_OS_VENDOR_SONIC:
      icon = "🦔";
      break;
    case SwitchOSVendor.SWITCH_OS_VENDOR_CUMULUS:
      icon = "🐢";
      break;
    default:
      icon = "❓";
  }

  return (
    <Tooltip
      label={
        <>
          <div>
            <strong>OS version: </strong>
            {os.version}
          </div>
          <div>
            <strong>Metal Core version: </strong>
            {os.metalCoreVersion}
          </div>
        </>
      }
    >
      <Badge>{icon}</Badge>
    </Tooltip>
  );
}
