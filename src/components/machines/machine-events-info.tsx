import {
  MachineProvisioningEvent,
  MachineProvisioningEventState,
  MachineRecentProvisioningEvents,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { InfoGrid } from "../info-grid/info-grid";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date-formatting";

interface MachineEventsInfoProps {
  data: MachineRecentProvisioningEvents;
}

const eventsColumn: ColumnDef<MachineProvisioningEvent>[] = [
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => MachineProvisioningEventState[row.original.event],
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) =>
      row.original.time
        ? formatDate(timestampDate(row.original.time))
        : "-",
  },
];

export default function MachineEventsInfo({ data }: MachineEventsInfoProps) {
  return (
    <InfoGrid
      rows={[
        {
          label: "Last Event:",
          value: data.lastEventTime
            ? <Badge variant="secondary">{formatDate(timestampDate(data.lastEventTime))}</Badge>
            : undefined,
        },
        {
          label: "Provisioning state:",
          value: data.state
            ? MachineProvisioningEventState[data.state]
            : undefined,
        },
        {
          label: "Last error event:",
          value: data.lastErrorEvent ? (
            <div className="mt-2 p-3 border rounded border-red-300 bg-red-50 text-sm space-y-1">
              <div>
                <strong>Time:</strong>{" "}
                {data.lastErrorEvent.time
                  ? <Badge variant="secondary">{formatDate(timestampDate(data.lastErrorEvent.time))}</Badge>
                  : "—"}
              </div>
              <div>
                <strong>Message:</strong> {data.lastErrorEvent.message || "—"}
              </div>
            </div>
          ) : undefined,
          fullWidth: data.lastErrorEvent !== undefined,
        },
        {
          label: "Provisioning events:",
          value: <DataTable initialData={data.events} columns={eventsColumn} />,
          fullWidth: true,
        },
      ]}
    />
  );
}
