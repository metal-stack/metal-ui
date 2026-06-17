import {
  MachineChassisIdentifyLEDState,
  MachineCondition,
  MachineLiveliness,
  MachineStatus,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { InfoGrid } from "../info-grid/info-grid";
import {
  CheckCircle,
  Lock,
  HelpCircle,
  Activity,
  XCircle,
  Lightbulb,
  ZapOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MachineStatusInfoProps {
  data: MachineStatus;
}

function MachineConditionBadge({
  condition,
}: {
  condition?: MachineCondition;
}) {
  if (!condition) {
    return "-";
  }

  let Icon = HelpCircle;
  let iconClassName = "";
  switch (condition.state) {
    case 3: // AVAILABLE
      Icon = CheckCircle;
      iconClassName = "text-green-600";
      break;
    case 2: // LOCKED
      Icon = Lock;
      iconClassName = "text-yellow-600";
      break;
    case 0: // UNSPECIFIED
      Icon = HelpCircle;
      iconClassName = "text-red-600";
      break;
    case 1: // TAINTED
      Icon = Lock;
      iconClassName = "text-yellow-600";
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className={cn("flex items-center gap-1", iconClassName)}>
          <Icon className="size-3" />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(condition.state as any) ? "AVAILABLE" : ""}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div>
          <strong>Description: </strong>
          {condition.description}
        </div>
        <div>
          <strong>Issuer: </strong>
          {condition.issuer}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MachineLEDBadge({ led }: { led?: MachineChassisIdentifyLEDState }) {
  if (!led) {
    return "-";
  }

  const Icon = led.value ? Lightbulb : ZapOff;
  const iconClassName = led.value
    ? "text-yellow-500"
    : "text-muted-foreground opacity-50";

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className="flex items-center gap-1">
          <Icon className={cn("size-3", iconClassName)} />
          {led.value ? "ON" : "OFF"}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div>
          <strong>LED State: </strong>
          {led.value}
        </div>
        <div>
          <strong>Description: </strong>
          {led.description}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MachineLivelinessBadge({
  liveliness,
}: {
  liveliness?: MachineLiveliness;
}) {
  if (!liveliness) {
    return "-";
  }
  let iconClassName = "";
  let Icon = HelpCircle;
  switch (liveliness) {
    case MachineLiveliness.ALIVE:
      Icon = Activity;
      iconClassName = "text-green-600";
      break;
    case MachineLiveliness.DEAD:
      Icon = XCircle;
      iconClassName = "text-red-600";
      break;
    case MachineLiveliness.UNKNOWN:
      Icon = HelpCircle;
      iconClassName = "text-yellow-600";
      break;
  }
  return (
    <Badge variant="outline" className={cn("flex items-center gap-1", iconClassName)}>
      <Icon className="size-3" />
      {MachineLiveliness[liveliness] || "UNKNOWN"}
    </Badge>
  );
}

export default function MachineStatusInfo({ data }: MachineStatusInfoProps) {
  return (
    <InfoGrid
      rows={[
        {
          label: "metal-hammer Version:",
          value: data.metalHammerVersion,
        },
        {
          label: "Liveliness:",
          value: <MachineLivelinessBadge liveliness={data.liveliness} />,
        },
        {
          label: "Condition:",
          value: <MachineConditionBadge condition={data.condition} />,
        },
        {
          label: "LED:",
          value: <MachineLEDBadge led={data.ledState} />,
        },
      ]}
    />
  );
}
