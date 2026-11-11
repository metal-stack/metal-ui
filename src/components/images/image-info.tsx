import { Section } from "@/components/ui/section/section";
import { Badge, Group } from "@mantine/core";
import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";
import { InfoGrid } from "../info-grid/info-grid";

interface ImageInfoProps {
  data: Image;
  title?: string;
}

export default function ImageInfo({ data, title = "Details" }: ImageInfoProps) {
  return (
    <Section title={title}>
      <InfoGrid
        rows={[
          { label: "ID:", value: data.id },
          { label: "Name:", value: data.name },
          { label: "Description:", value: data.description },
          { label: "URL:", value: data.url },
          {
            label: "Classification:",
            value: ImageClassification[data.classification],
          },
          {
            label: "Features:",
            value: data.features.length ? (
              <Group gap="xs">
                {data.features.map((feature) => (
                  <Badge key={feature} variant="light">
                    {ImageFeature[feature]}
                  </Badge>
                ))}
              </Group>
            ) : undefined,
          },
        ]}
      />
    </Section>
  );
}
