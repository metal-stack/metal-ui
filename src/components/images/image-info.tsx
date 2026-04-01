import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";

interface ImageInfoProps {
  data: Image;
}

export default function ImageInfo({ data }: ImageInfoProps) {
  return (
    <InfoGrid
      rows={[
        { label: "ID:", value: data.id },
        { label: "Name:", value: data.name },
        { label: "Description:", value: data.description },
        { label: "URL:", value: data.url },
        {
          label: "Image classification:",
          value: ImageClassification[data.classification],
        },
        {
          label: "Image features",
          value: (
            <div className="flex flex-col gap-1 ml-4">
              {data.features.map((feature, index) => (
                <div key={index}>{ImageFeature[feature]}</div>
              ))}
            </div>
          ),
          fullWidth: true,
        },
        {
          label: "Created at:",
          value: data.meta?.createdAt ? (
            <TimeStampPill date={timestampDate(data.meta.createdAt)} />
          ) : undefined,
        },
        {
          label: "Updated at:",
          value: data.meta?.updatedAt ? (
            <TimeStampPill date={timestampDate(data.meta.updatedAt)} />
          ) : undefined,
        },
      ]}
    />
  );
}
