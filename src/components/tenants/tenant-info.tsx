import { Tenant } from "@metal-stack/api/js/metalstack/api/v2/tenant_pb";

interface TenantsInfoProps {
  data: Tenant;
}

export default function TenantInfo({ data }: TenantsInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Login:</strong> {data.login}
      </div>
      <div>
        <strong>Name:</strong> {data.name}
      </div>
      <div>
        <strong>Description:</strong> {data.description}
      </div>
      <div>
        <strong>Email:</strong> {data.email}
      </div>
    </div>
  );
}
