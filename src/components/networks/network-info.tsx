import { Network } from "@metal-stack/api/js/metalstack/api/v2/network_pb";

interface NetworkInfoProps {
  data: Network;
}

export default function NetworkInfo({ data }: NetworkInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Network:</strong> {data.name}
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
        <strong>Partition:</strong> {data.partition}
      </div>
      <div>
        <strong>Namespace:</strong> {data.namespace}
      </div>
    </div>
  );
}
