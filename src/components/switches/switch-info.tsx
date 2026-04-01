import { Switch } from "@metal-stack/api/js/metalstack/api/v2/switch_pb";
import SwitchReplaceModeBadge from "./switch-replace-mode";
import SwitchOSBadge from "./switch-os-badge";
import SwitchConnectedMachinesInfo from "./switch-connected-machines";
import { InfoGrid } from "../info-grid/info-grid";
import { TimestampPill } from "../ui/timestamp-pill";
import { CopyButton } from "@/components/ui/copy-button";
import { StatusPill } from "../ui/status-pill";

interface SwitchInfoProps {
  data: Switch;
}

function SwitchNicDisplay({ nic }: { nic: any }) {
  const rows = [];
  rows.push({ label: "Name:", value: nic.name });
  rows.push({ label: "Identifier:", value: nic.identifier });
  rows.push({
    label: "MAC:",
    value: <span className="font-mono">{nic.mac}</span>,
  });
  if (nic.vrf) {
    rows.push({ label: "VRF:", value: nic.vrf });
  }
  if (nic.state?.actual) {
    rows.push({
      label: "Actual State:",
      value: nic.state.actual,
    });
  }
  if (nic.state?.desired) {
    rows.push({
      label: "Desired State:",
      value: nic.state.desired,
    });
  }
  if (nic.bgpFilter?.cidrs?.length) {
    rows.push({
      label: "BGP Filter CIDRs:",
      value: nic.bgpFilter.cidrs.join(", "),
      fullWidth: true,
    });
  }
  if (nic.bgpFilter?.vnis?.length) {
    rows.push({
      label: "BGP Filter VNIs:",
      value: nic.bgpFilter.vnis.join(", "),
      fullWidth: true,
    });
  }
  if (nic.bgpPortState) {
    rows.push({
      label: "BGP Neighbor:",
      value: nic.bgpPortState.neighbor,
    });
    rows.push({
      label: "BGP Peer Group:",
      value: nic.bgpPortState.peerGroup,
    });
    rows.push({
      label: "BGP VRF:",
      value: nic.bgpPortState.vrfName,
    });
    rows.push({
      label: "BGP State:",
      value: (
        <StatusPill
          status={nic.bgpPortState.bgpState === "up" ? "online" : "offline"}
          label={nic.bgpPortState.bgpState}
        />
      ),
    });
    if (nic.bgpPortState.bgpTimerUpEstablished) {
      rows.push({
        label: "BGP Timer Up:",
        value: (
          <TimestampPill timestamp={nic.bgpPortState.bgpTimerUpEstablished} />
        ),
      });
    }
    rows.push({
      label: "Sent Prefixes:",
      value: nic.bgpPortState.sentPrefixCounter,
    });
    rows.push({
      label: "Accepted Prefixes:",
      value: nic.bgpPortState.acceptedPrefixCounter,
    });
  }

  return <InfoGrid rows={rows} />;
}

function SwitchSyncDisplay({ sync, label }: { sync: any; label: string }) {
  if (!sync) {
    return null;
  }

  return (
    <div className="ml-4">
      <strong>{label}:</strong>
      <InfoGrid
        rows={[
          {
            label: "Time:",
            value: sync.time ? <TimestampPill timestamp={sync.time} /> : "-",
          },
          {
            label: "Duration:",
            value: `${sync.duration?.seconds || 0}s`,
          },
          {
            label: "Error:",
            value: sync.error || "-",
          },
        ]}
      />
    </div>
  );
}

export default function SwitchInfo({ data }: SwitchInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`,
    );
    metaFields.push({ label: "Labels:", value: labels.join(", ") });
  }
  if (data.meta?.createdAt) {
    metaFields.push({
      label: "Created at:",
      value: <TimestampPill timestamp={data.meta.createdAt} />,
    });
  }
  if (data.meta?.updatedAt) {
    metaFields.push({
      label: "Updated at:",
      value: <TimestampPill timestamp={data.meta.updatedAt} />,
    });
  }
  if (data.meta?.generation !== undefined) {
    metaFields.push({ label: "Generation:", value: data.meta.generation });
  }

  const nicElements = data.nics.map((nic, index) => (
    <div key={index} className="ml-4">
      <strong className="flex items-center gap-2">
        NIC {index + 1}: {nic.name}
        <CopyButton
          text={nic.identifier || ""}
          variant="ghost"
          size="sm"
          className="h-6 w-6"
        />
      </strong>
      <div className="mt-2">
        <SwitchNicDisplay nic={nic} />
      </div>
    </div>
  ));

  const rows = [];
  rows.push({ label: "ID:", value: data.id });
  rows.push({ label: "Description:", value: data.description || "—" });
  rows.push({ label: "Partition:", value: data.partition });
  rows.push({ label: "Rack:", value: data.rack || "—" });
  rows.push({
    label: "Replace mode:",
    value: <SwitchReplaceModeBadge mode={data.replaceMode} />,
  });
  rows.push({
    label: "Mgmt IP:",
    value: <span className="font-mono">{data.managementIp}</span>,
  });
  rows.push({ label: "Mgmt User:", value: data.managementUser || "—" });
  rows.push({
    label: "Console Command:",
    value: data.consoleCommand || "—",
  });
  rows.push({ label: "OS:", value: <SwitchOSBadge os={data.os} /> });
  if (nicElements.length) {
    rows.push({
      label: "NICs",
      value: <div className="flex flex-col gap-2">{nicElements}</div>,
      fullWidth: true,
    });
  }
  rows.push({
    label: "Connected Machines:",
    value: (
      <SwitchConnectedMachinesInfo
        connectedMachines={data.machineConnections}
      />
    ),
    fullWidth: true,
  });
  if (data.lastSync) {
    rows.push({
      label: "Last Sync",
      value: <SwitchSyncDisplay sync={data.lastSync} label="Last Sync" />,
      fullWidth: true,
    });
  }
  if (data.lastSyncError) {
    rows.push({
      label: "Last Sync Error",
      value: (
        <SwitchSyncDisplay sync={data.lastSyncError} label="Last Sync Error" />
      ),
      fullWidth: true,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid rows={rows} />
    </div>
  );
}
