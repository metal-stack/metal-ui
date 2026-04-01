import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { InfoGrid } from "../info-grid/info-grid";
import { CopyableText } from "../ui/copyable-text";
import { TimestampPill } from "../ui/timestamp-pill";

interface ImageInfoProps {
  data: Image;
}

export default function ImageInfo({ data }: ImageInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  const features = data.features.map((feature, index) => (
    <div key={index}>{ImageFeature[feature]}</div>
  ));

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "ID:", value: <CopyableText text={data.id} variant="inline" /> },
          { label: "Name:", value: data.name },
          { label: "Description:", value: data.description },
          { label: "URL:", value: <CopyableText text={data.url} variant="block" /> },
          {
            label: "Image classification:",
            value: ImageClassification[data.classification],
          },
          {
            label: "Image features",
            value: features.length ? (
              <div className="flex flex-col gap-1 ml-4">{features}</div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Expires at:",
            value: data.expiresAt
              ? <TimestampPill timestamp={data.expiresAt} />
              : "-",
          },
        ]}
      />
    </div>
  );
}
