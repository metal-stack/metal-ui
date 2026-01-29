import { SwitchReplaceMode } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import { Badge } from "../ui/badge";

interface SwitchReplaceModeProps {
  mode: SwitchReplaceMode;
}

export default function SwitchReplaceModeBadge({
  mode,
}: SwitchReplaceModeProps) {
  let label;
  switch (mode) {
    case SwitchReplaceMode.OPERATIONAL:
      label = "🟢 Operational";
      break;
    case SwitchReplaceMode.REPLACE:
      label = "⚙️ Manual";
      break;
    case SwitchReplaceMode.UNSPECIFIED:
      label = "❓ Unspecified";
      break;
    default:
      label = "❓ Unknown";
  }

  return <Badge variant="outline">{label}</Badge>;
}
