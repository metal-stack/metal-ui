import { ImageClassification } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { Badge } from "../ui/badge";
import { Check, CircleQuestionMark, Eye, Hourglass } from "lucide-react";

interface Props {
  type: ImageClassification;
  withLabel: boolean;
}

export default function ImageClassificationBadge({ type, withLabel }: Props) {
  const label = ImageClassification[type];

  switch (type) {
    case ImageClassification.UNSPECIFIED:
      return (
        <Badge variant="outline">
          <CircleQuestionMark className="size-3 text-gray-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
    case ImageClassification.PREVIEW:
      return (
        <Badge variant="outline">
          <Eye className="size-3 text-orange-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
    case ImageClassification.SUPPORTED:
      return (
        <Badge variant="outline">
          <Check className="size-3 text-green-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
    case ImageClassification.DEPRECATED:
      return (
        <Badge variant="outline">
          <Hourglass className="size-3 text-red-400" />
          {withLabel ? ` ${label}` : ""}
        </Badge>
      );
  }
}
