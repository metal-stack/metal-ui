import { Image } from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { toast } from "sonner";
import { CopyIcon, FingerprintPattern } from "lucide-react";
import ImageClassificationBadge from "./image-classification-badge";
import { IdentityCard } from "../identity-card/identity-card";
import ImageFeatureBadge from "./image-feature-badge";

interface ImageInfoProps {
  data: Image;
}

export default function ImageInfo({ data }: ImageInfoProps) {
  const handleCopyUUID = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied id");
  };

  const identityHeader = (
    <>
      {/* UUID */}
      <div className="flex items-center gap-2 text-sm">
        <FingerprintPattern className="size-4 shrink-0 text-muted-foreground" />
        <span className="text-muted-foreground">ID:</span>
        <button
          onClick={handleCopyUUID}
          className="font-mono text-xs flex items-center gap-1"
          aria-label="Copy ID"
          title={data.id}
        >
          {data.id}
          <CopyIcon className="size-3" />
        </button>
      </div>

      {/* Name */}
      {data.$typeName && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Name:</span>
          <span>{data.name}</span>
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Description:</span>
          {data.description}
        </div>
      )}

      {/* URL */}
      {data.url && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">URL:</span>
          {data.url}
        </div>
      )}

      {/* Classification */}
      {data.classification && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Classification:</span>
          <ImageClassificationBadge type={data.classification} withLabel />
        </div>
      )}

      {/* Features */}
      {data.features && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Classification:</span>
          {data.features.map((feature) => (
            <ImageFeatureBadge type={feature} withLabel />
          ))}
        </div>
      )}
    </>
  );

  return <IdentityCard header={identityHeader} meta={data.meta} />;
}
