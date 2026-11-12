import { Machine } from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { Section, SectionGrid } from "../ui/section/section";
import { InfoGrid } from "../info-grid/info-grid";
import MachineAllocationInfo from "./machine-allocation-info";
import SizeInfo from "../sizes/size-info";
import MachineHardwareInfo from "./machine-hardware-info";
import MachineBiosInfo from "./machine-bios";
import MachineStatusInfo from "./machine-status-info";
import MachineEventsInfo from "./machine-events-info";

interface MachineInfoProps {
  data: Machine;
}

export default function MachineInfo({ data }: MachineInfoProps) {
  return (
    <SectionGrid>
      <Section title="Overview">
        <InfoGrid
          rows={[
            { label: "Partition:", value: data.partition?.id },
            { label: "Rack:", value: data.rack },
          ]}
        />
      </Section>
      {data.status && <MachineStatusInfo data={data.status} title="Status" />}
      {data.bios && <MachineBiosInfo data={data.bios} title="Bios" />}
      {data.size && <SizeInfo data={data.size} title="Size" />}
      {data.hardware && <MachineHardwareInfo data={data.hardware} />}
      {data.allocation && <MachineAllocationInfo data={data.allocation} />}
      {data.recentProvisioningEvents && (
        <MachineEventsInfo data={data.recentProvisioningEvents} />
      )}
    </SectionGrid>
  );
}
