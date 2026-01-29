import { MachineBios } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface MachineBiosInfoProps {
  data: MachineBios;
}

export default function MachineBiosInfo({ data }: MachineBiosInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Vendor:</strong> {data.vendor}
      </div>
      <div>
        <strong>Version:</strong> {data.version}
      </div>
      <div>
        <strong>Date:</strong> {data.date}
      </div>
    </div>
  );
}
