import { Badge } from "../ui/badge";
import { Cpu, Cylinder, Gpu, MemoryStick } from "lucide-react";
import { SizeConstraintType } from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { formatBytesBigInt } from "@/lib/size-utilities";

interface Props {
  type: SizeConstraintType;
  withLabel: boolean;
  sizeConfig?: {
    min: bigint;
    max: bigint;
  };
}

export default function SizeConstraintBadge({
  type,
  withLabel,
  sizeConfig,
}: Props) {
  const label = SizeConstraintType[type];

  switch (type) {
    case SizeConstraintType.CORES:
      return (
        <Badge variant="outline">
          <Cpu className="size-3 text-green-400" />
          {withLabel ? ` ${label}` : ""}
          <div>{sizeConfig && `${sizeConfig.min} - ${sizeConfig.max}`}</div>
        </Badge>
      );
    case SizeConstraintType.MEMORY:
      return (
        <Badge variant="outline">
          <MemoryStick className="size-3 text-blue-400" />
          {withLabel ? ` ${label}` : ""}
          <div>
            {sizeConfig &&
              `${formatBytesBigInt(sizeConfig.min)} - ${formatBytesBigInt(sizeConfig.max)}`}
          </div>
        </Badge>
      );
    case SizeConstraintType.STORAGE:
      return (
        <Badge variant="outline">
          <Cylinder className="size-3 text-red-400" />
          {withLabel ? ` ${label}` : ""}
          <div>
            {sizeConfig &&
              `${formatBytesBigInt(sizeConfig.min)} - ${formatBytesBigInt(sizeConfig.max)}`}
          </div>
        </Badge>
      );
    case SizeConstraintType.GPU:
      return (
        <Badge variant="outline">
          <Gpu className="size-3 text-yellow-400" />
          {withLabel ? ` ${label}` : ""}
          <div>{sizeConfig && `${sizeConfig.min} - ${sizeConfig.max}`}</div>
        </Badge>
      );
  }
}
