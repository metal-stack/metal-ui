import { IP, IPType } from "@metal-stack/api/js/metalstack/api/v2/ip_pb";

interface IPInfoProps {
  data: IP;
}

export default function IPInfo({ data }: IPInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>IP:</strong> {data.ip}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Project:</strong> {data.project}
      </div>
      <div>
        <strong>Network:</strong> {data.network}
      </div>
      <div>
        <strong>Type:</strong> {IPType[data.type]}
      </div>
      <div>
        <strong>Namespace:</strong> {data.namespace}
      </div>
    </div>
  );
}
