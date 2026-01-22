import {} from "@metal-stack/api/js/metalstack/api/v2/size_pb";
import { Collapsible, CollapsibleContent } from "@radix-ui/react-collapsible";
import { useState } from "react";
import { CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Partition } from "@metal-stack/api/js/metalstack/api/v2/partition_pb";

interface PartitionInfoProps {
  data?: Partition;
  asCollapse?: boolean;
}

export default function PartitionInfo({
  data,
  asCollapse,
}: PartitionInfoProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="flex flex-col gap-2">
      <div>
        <strong>ID:</strong> {data?.id || "-"}
      </div>
      <div>
        <strong>Description:</strong> {data?.description || "-"}
      </div>
      <div className="flex flex-col">
        <strong>DNS-Server:</strong>
        {data?.dnsServer && data.dnsServer.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.dnsServer.map((dnsServer, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>IP: {dnsServer.ip}</div>
              </div>
            ))}
          </ul>
        ) : (
          "-"
        )}
      </div>
      <div className="flex flex-col">
        <strong>NTP-Server:</strong>
        {data?.ntpServer && data.ntpServer.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.ntpServer.map((ntpServer, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Address: {ntpServer.address}</div>
              </div>
            ))}
          </ul>
        ) : (
          "-"
        )}
      </div>
      <div className="flex flex-col">
        <strong>Mgmt-Services:</strong>
        {data?.mgmtServiceAddresses && data.mgmtServiceAddresses.length > 0 ? (
          <ul className="list-disc list-inside">
            {data.mgmtServiceAddresses.map((mgmtServiceAddress, index) => (
              <div key={index} className="ml-4 mb-2">
                <div>Address: {mgmtServiceAddress}</div>
              </div>
            ))}
          </ul>
        ) : (
          "-"
        )}
      </div>
    </div>
  );

  if (asCollapse) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-sm font-semibold">Partition: </h4>
          {data ? (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          ) : (
            "-"
          )}
        </div>
        <CollapsibleContent className="border border-border rounded-md p-4">
          {content}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return content;
}
