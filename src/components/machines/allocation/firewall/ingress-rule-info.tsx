import {
  FirewallIngressRule,
  IPProtocol,
} from "@metal-stack/api/js/metalstack/api/v2/machine_pb";

interface IngressRulesInfoProps {
  data: FirewallIngressRule;
}

export default function IngressRulesInfo({ data }: IngressRulesInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>IP protocol:</strong> {IPProtocol[data.protocol]}
      </div>
      <div>
        <strong>Ports: </strong>
        {data.ports.join(", ")}
      </div>
      <div>
        <strong>To: </strong>
        {data.to.join(", ")}
      </div>
      <div>
        <strong>Comment:</strong> {data.comment}
      </div>
    </div>
  );
}
