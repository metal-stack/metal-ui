import {
  FilesystemLayout,
  FilesystemLayoutConstraints,
  GPTType,
  RaidLevel,
} from "@metal-stack/api/js/metalstack/api/v2/filesystem_pb";
import FilesystemInfo from "./filesystem-info";
import { InfoGrid } from "../info-grid/info-grid";
import { TimestampPill } from "../ui/timestamp-pill";

interface FilesystemLayoutInfoProps {
  data: FilesystemLayout;
}

function ConstraintsInfo({
  data,
}: {
  data?: FilesystemLayoutConstraints;
}) {
  if (!data) {
    return null;
  }

  const rows = [];

  if (data.sizes && data.sizes.length) {
    rows.push({
      label: "Apply to sizes:",
      value: data.sizes.join(", "),
      fullWidth: true,
    });
  }

  if (data.images && Object.keys(data.images).length) {
    const images = Object.entries(data.images).map(
      ([os, version]) => `${os}:${version}`
    );
    rows.push({
      label: "Apply to images:",
      value: images.join(", "),
      fullWidth: true,
    });
  }

  if (!rows.length) {
    return null;
  }

  return (
    <div className="ml-4">
      <strong>Constraints:</strong>
      <InfoGrid rows={rows} />
    </div>
  );
}

export default function FilesystemLayoutInfo({
  data,
}: FilesystemLayoutInfoProps) {
  const metaFields = [];
  if (data.meta?.labels?.labels) {
    const labels = Object.entries(data.meta.labels.labels).map(
      ([key, value]) => `${key}=${value}`
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

  const filesystemElements = data.filesystems.map((fs, index) => (
    <div key={index}>
      <div className="ml-4">
        <FilesystemInfo data={[fs]} />
      </div>
    </div>
  ));

  const diskElements = data.disks.map((disk, diskIndex) => {
    const partitions = disk.partitions.map((part, partIndex) => (
      <div key={partIndex} className="mb-2 p-2 border rounded">
        <InfoGrid
          rows={[
            { label: "Number:", value: part.number },
            { label: "Label:", value: part.label },
            { label: "Size:", value: `${part.size} MiB` },
            ...(part.gptType !== undefined
              ? [{ label: "GPT Type:", value: GPTType[part.gptType] }]
              : []),
          ]}
        />
      </div>
    ));

    return (
      <div key={diskIndex} className="ml-4">
        <InfoGrid
          rows={[
            { label: "Device:", value: disk.device },
            {
              label: "Partitions:",
              value: partitions.length ? partitions : "-",
              fullWidth: true,
            },
          ]}
        />
      </div>
    );
  });

  const raidElements = data.raid.map((raid, index) => (
    <div key={index} className="ml-4">
      <InfoGrid
        rows={[
          { label: "Array Name:", value: raid.arrayName },
          {
            label: "Devices:",
            value: raid.devices.join(", "),
          },
          {
            label: "Level:",
            value: RaidLevel[raid.level],
          },
          {
            label: "Spares:",
            value: raid.spares,
          },
          {
            label: "Create Options:",
            value: raid.createOptions?.join(", ") || "-",
            fullWidth: true,
          },
        ]}
      />
    </div>
  ));

  const volumeGroupElements = data.volumeGroups.map((vg, index) => (
    <div key={index} className="ml-4">
      <InfoGrid
        rows={[
          { label: "Name:", value: vg.name },
          {
            label: "Devices:",
            value: vg.devices.join(", "),
          },
          {
            label: "Tags:",
            value: vg.tags?.join(", ") || "-",
            fullWidth: true,
          },
        ]}
      />
    </div>
  ));

  const logicalVolumeElements = data.logicalVolumes.map((lv, index) => (
    <div key={index} className="ml-4">
      <InfoGrid
        rows={[
          { label: "Name:", value: lv.name },
          { label: "Volume Group:", value: lv.volumeGroup },
          { label: "Size:", value: `${lv.size} MiB` },
          {
            label: "LVM Type:",
            value: lv.lvmType,
          },
        ]}
      />
    </div>
  ));

  return (
    <div className="flex flex-col gap-2">
      <InfoGrid rows={metaFields} />
      <InfoGrid
        rows={[
          { label: "ID:", value: data.id },
          { label: "Name:", value: data.name },
          { label: "Description:", value: data.description },
          {
            label: "Filesystems",
            value: filesystemElements.length ? (
              <div className="flex flex-col gap-2">{filesystemElements}</div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Disks",
            value: diskElements.length ? (
              <div className="flex flex-col gap-2">{diskElements}</div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "RAID Arrays",
            value: raidElements.length ? (
              <div className="flex flex-col gap-2">{raidElements}</div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Volume Groups",
            value: volumeGroupElements.length ? (
              <div className="flex flex-col gap-2">{volumeGroupElements}</div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Logical Volumes",
            value: logicalVolumeElements.length ? (
              <div className="flex flex-col gap-2">
                {logicalVolumeElements}
              </div>
            ) : (
              "-"
            ),
            fullWidth: true,
          },
          {
            label: "Constraints",
            value: data.constraints ? (
              <ConstraintsInfo data={data.constraints} />
            ) : (
              "-"
            ),
            fullWidth: true,
          },
        ]}
      />
    </div>
  );
}
