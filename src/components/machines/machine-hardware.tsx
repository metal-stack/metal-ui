import { MachineHardware } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface MachineHardwareInfoProps {
  data: MachineHardware;
}

export default function MachineHardwareInfo({
  data,
}: MachineHardwareInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong></strong>
      </div>
    </div>
  );
}
