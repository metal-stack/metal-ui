import { Stack } from "@mantine/core";
import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { InfoGrid } from "../info-grid/info-grid";

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
            <Stack gap={4} ml="md">
              {data.features.map((feature, index) => (
                <div key={index}>{ImageFeature[feature]}</div>
              ))}
            </Stack>
          ),
          fullWidth: true,
        },
      ]}
    />
  );
}
