import {
  Machine,
  MachineChassisIdentifyLEDState,
  MachineCondition,
  MachineLiveliness,
  MachineState,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { TimestampPill } from "../ui/timestamp-pill";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { IconCheck, IconX, IconQuestionMark } from "@tabler/icons-react";

interface MachineInfoPreviewProps {
  data: Machine;
}

function MachineConditionBadge({
  condition,
}: {
  condition?: MachineCondition;
}) {
  if (!condition) {
    return (
      <Badge variant="outline">
        <IconQuestionMark className="w-3 h-3 mr-1" />
        Unspecified
      </Badge>
    );
  }

  let colorClass = "";
  let icon = <IconQuestionMark className="w-3 h-3 mr-1" />;

  switch (condition.state) {
    case MachineState.AVAILABLE:
      colorClass = "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      icon = <IconCheck className="w-3 h-3 mr-1" />;
      break;
    case MachineState.LOCKED:
      colorClass = "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200";
      icon = <IconCheck className="w-3 h-3 mr-1" />;
      break;
    case MachineState.RESERVED:
      colorClass = "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      icon = <IconCheck className="w-3 h-3 mr-1" />;
      break;
    case MachineState.UNSPECIFIED:
    default:
      colorClass = "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      icon = <IconX className="w-3 h-3 mr-1" />;
      break;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className={colorClass}>
          {icon}
          {MachineState[condition.state]}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <strong className="block mb-1">Description:</strong>
          <span>{condition.description}</span>
        </div>
        <div className="text-sm mt-1">
          <strong className="block mb-1">Issuer:</strong>
          <span>{condition.issuer}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MachineLEDBadge({ led }: { led?: MachineChassisIdentifyLEDState }) {
  if (!led || !led.value) {
    return <Badge variant="outline">LED OFF</Badge>;
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1" />
          LED ON
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <strong className="block mb-1">LED State:</strong>
          <span>{led.value}</span>
        </div>
        <div className="text-sm mt-1">
          <strong className="block mb-1">Description:</strong>
          <span>{led.description}</span>
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
  if (!liveliness || liveliness === MachineLiveliness.UNKNOWN) {
    return <Badge variant="outline">Unknown</Badge>;
  }

  let colorClass = "";
  switch (liveliness) {
    case MachineLiveliness.ALIVE:
      colorClass = "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
      break;
    case MachineLiveliness.DEAD:
      colorClass = "bg-red-100 text-red-800 border-red-200 hover:bg-red-200";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200";
      break;
  }

  return (
    <Badge variant="outline" className={colorClass}>
      {MachineLiveliness[liveliness]}
    </Badge>
  );
}

export default function MachineInfoPreview({ data }: MachineInfoPreviewProps) {
  const metaFields = [];
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created:",
      value: <TimestampPill timestamp={data.meta.createdAt} variant="secondary" />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated:",
      value: <TimestampPill timestamp={data.meta.updatedAt} variant="secondary" />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  const allocated = data.allocation ? "Yes" : "No";

  const statusFields = [];
  if (data.status?.metalHammerVersion) {
    statusFields.push({
      label: "metal-hammer:",
      value: data.status.metalHammerVersion,
    });
  }
  statusFields.push({
    label: "Liveliness:",
    value: <MachineLivelinessBadge liveliness={data.status?.liveliness} />,
  });
  statusFields.push({
    label: "Condition:",
    value: <MachineConditionBadge condition={data.status?.condition} />,
  });
  statusFields.push({
    label: "LED:",
    value: <MachineLEDBadge led={data.status?.ledState} />,
  });

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      {metaFields.length > 0 && (
        <div className="mb-4 pb-4 border-b">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Metadata
          </div>
          <InfoGrid rows={metaFields} className="grid-cols-2 sm:grid-cols-3" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground mb-1">
            Partition
          </span>
          <span className="text-sm font-medium">{data.partition?.id || "-"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground mb-1">
            Rack
          </span>
          <span className="text-sm font-medium">{data.rack || "-"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground mb-1">
            Size ID
          </span>
          <span className="text-sm font-medium">{data.size?.id || "-"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground mb-1">
            Allocated
          </span>
          <span
            className={`text-sm font-medium ${
              allocated === "Yes" ? "text-green-600" : "text-red-600"
            }`}
          >
            {allocated}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-muted-foreground mb-2">
            System Status
          </span>
          <InfoGrid rows={statusFields} />
        </div>
      </div>
    </div>
  );
}
