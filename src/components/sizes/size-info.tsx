import {
  Size,
  SizeConstraintType,
} from "@metal-stack/api/js/metalstack/api/v2/size_pb";

interface SizeInfoProps {
  data: Size;
}

export default function SizeInfo({ data }: SizeInfoProps) {
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
      <div className="flex flex-col">
        <strong>Constraints:</strong>
        {data.constraints && data.constraints.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.constraints.map((constraint, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Type: {SizeConstraintType[constraint.type]}</div>
                <div>Min: {constraint.min}</div>
                <div>Max: {constraint.max}</div>
                <div>Identifier: {constraint.identifier || "-"}</div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="ml-4 mb-2 text-muted-foreground">
            No constraints available.
          </div>
        )}
      </div>
    </div>
  );
}
