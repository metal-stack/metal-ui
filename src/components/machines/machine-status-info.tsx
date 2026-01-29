import {
  MachineChassisIdentifyLEDState,
  MachineCondition,
  MachineLiveliness,
  MachineState,
  MachineStatus,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";

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

  let color = "";
  let icon = "";
  switch (condition.state) {
    case MachineState.AVAILABLE:
      color = "green";
      icon = "✔️";
      break;
    case MachineState.LOCKED:
      color = "yellow";
      icon = "🔒";
      break;
    case MachineState.UNSPECIFIED:
      color = "red";
      icon = "❓";
      break;
    case MachineState.RESERVED:
      color = "blue";
      icon = "💼";
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline">
          {icon}
          {MachineState[condition.state]}
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

  let icon = led.value ? "💡" : "❌";

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline">
          {icon}
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
  let color = "";
  let icon = "";
  switch (liveliness) {
    case MachineLiveliness.ALIVE:
      color = "green";
      icon = "🟢";
      break;
    case MachineLiveliness.DEAD:
      color = "red";
      icon = "🔴";
      break;
    case MachineLiveliness.UNKNOWN:
      color = "yellow";
      icon = "❓";
      break;
  }
  return (
    <Badge
      variant="outline"
      className={`text-${color}-600 border-${color}-600`}
    >
      {icon}
      {MachineLiveliness[liveliness]}
    </Badge>
  );
}

export default function MachineStatusInfo({ data }: MachineStatusInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>metal-hammer Version:</strong> {data.metalHammerVersion}
      </div>
      <div>
        <strong>Liveliness:</strong>
        {data.liveliness}
      </div>
      <div>
        <strong>Condition:</strong>
        <MachineConditionBadge condition={data.condition} />
      </div>
      <div>
        <strong>LED:</strong>
        <MachineLEDBadge led={data.ledState} />
      </div>
      <div>
        <strong>Liveliness:</strong>
        <MachineLivelinessBadge liveliness={data.liveliness} />
      </div>
    </div>
  );
}
