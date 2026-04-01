import {
  MachineProvisioningEvent,
  MachineProvisioningEventState,
  MachineProvisioningEventType,
  MachineRecentProvisioningEvents,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";
import { timestampDate } from "@bufbuild/protobuf/wkt";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table/data-table";
import { InfoGrid } from "../info-grid/info-grid";
import { TimeStampPill } from "../ui/timeStamp-pill";

interface MachineEventsInfoProps {
  data: MachineRecentProvisioningEvents;
}

const eventsColumn: ColumnDef<MachineProvisioningEvent>[] = [
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => MachineProvisioningEventType[row.original.event],
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) =>
      row.original.time ? (
        <TimeStampPill date={timestampDate(row.original.time)} />
      ) : (
        "-"
      ),
  },
];

export default function MachineEventsInfo({ data }: MachineEventsInfoProps) {
  return (
    <InfoGrid
      rows={[
        {
          label: "Last Event:",
          value: data.lastEventTime ? (
            <TimeStampPill date={timestampDate(data.lastEventTime)} />
          ) : (
            undefined
          ),
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
            <div className="mt-2 p-2 border border-red-500 rounded bg-red-50">
              <div>
                <strong>Time:</strong>{" "}
                {data.lastErrorEvent.time ? (
                  <TimeStampPill date={timestampDate(data.lastErrorEvent.time)} />
                ) : (
                  "—"
                )}
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
