import { ImageFeature } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { Badge } from "../ui/badge";
import { CircleQuestionMark, Server, Shield } from "lucide-react";

interface Props {
  type: ImageFeature;
  withLabel: boolean;
}

export default function ImageFeatureBadge({ type, withLabel }: Props) {
  const label = ImageFeature[type];

  switch (type) {
    case ImageFeature.UNSPECIFIED:
      return (
        <Badge variant="outline">
          <CircleQuestionMark className="size-3 text-gray-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
    case ImageFeature.MACHINE:
      return (
        <Badge variant="outline">
          <Server className="size-3 text-blue-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
    case ImageFeature.FIREWALL:
      return (
        <Badge variant="outline">
          <Shield className="size-3 text-red-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
  }
}
