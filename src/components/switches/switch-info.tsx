import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";

interface SwitchInfoProps {
  data: Switch;
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
    </div>
  );
}
