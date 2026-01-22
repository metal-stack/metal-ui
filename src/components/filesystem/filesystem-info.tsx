import { Filesystem } from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";

interface FilesystemInfoProps {
  data: Filesystem;
}

export default function FilesystemInfo({ data }: FilesystemInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Path:</strong> {data.path}
      </div>
      <div>
        <strong>Label:</strong> {data.label}
      </div>
      <div className="flex flex-col">
        <strong>Mount options:</strong>
        {data.mountOptions && data.mountOptions.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.mountOptions.map((option, index) => (
              <div key={index} className="ml-4 mb-2">
                {option}
              </div>
            ))}
          </ul>
        ) : undefined}
      </div>
      <div className="flex flex-col">
        <strong>Create options:</strong>
        {data.createOptions && data.createOptions.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.createOptions.map((option, index) => (
              <div key={index} className="ml-4 mb-2">
                {option}
              </div>
            ))}
          </ul>
        ) : undefined}
      </div>
    </div>
  );
}
