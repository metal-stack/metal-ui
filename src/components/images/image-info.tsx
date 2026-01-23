import {
  Image,
  ImageClassification,
  ImageFeature,
} from "@metal-stack/api/js/metalstack/api/v2/image_pb";

interface ImageInfoProps {
  data: Image;
}

export default function ImageInfo({ data }: ImageInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>URL:</strong> {data.url}
      </div>
      <div>
        <strong>Image classification:</strong>{" "}
        {ImageClassification[data.classification]}
      </div>
      <div className="flex flex-col">
        <strong>Image features:</strong>
        {data.features && data.features.length > 0 ? (
          <>
            {data.features.map((features, index) => (
              <div key={index}>{ImageFeature[features]}</div>
            ))}
          </>
        ) : undefined}
      </div>
    </div>
  );
}
