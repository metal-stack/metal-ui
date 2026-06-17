import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Meta } from "@metal-stack/api/js/metalstack/api/v2/common_pb";
import { Badge } from "../ui/badge";
import { formatDate } from "@/lib/date-formatting";
import { timestampDate } from "@bufbuild/protobuf/wkt";

interface IdentityCardProps {
  header: React.ReactNode;
  meta?: Meta;
  className?: string;
}

const renderLabels = (
  labels:
    | {
        [key: string]: string;
      }
    | undefined,
) => {
  if (!labels || Object.keys(labels).length === 0) {
    return "—";
  }
  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(labels).map(([key, value]) => (
        <Badge key={key} variant="secondary" className="text-xs">
          {key}: {value}
        </Badge>
      ))}
    </div>
  );
};

export function IdentityCard({ header, meta, className }: IdentityCardProps) {
  return (
    <Card className={cn("overflow-visible", className)}>
      <CardContent className="space-y-3">
        {header}

        {meta && (
          <>
            <div className="pt-2 border-t">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Meta
              </span>
            </div>

            {/* Labels */}
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>Labels:</span>
              </div>
              {renderLabels(meta.labels?.labels)}
            </div>

            {/* Timestamps */}
            {(meta.createdAt || meta.updatedAt) && (
              <div className="flex flex-wrap gap-2 text-xs">
                {meta.createdAt && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Created:</span>
                    <Badge variant="secondary">
                      {formatDate(timestampDate(meta.createdAt))}
                    </Badge>
                  </div>
                )}
                {meta.updatedAt && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground">Updated:</span>
                    <Badge variant="secondary">
                      {formatDate(timestampDate(meta.updatedAt))}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Generation */}
            {meta.generation ? (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Generation:</span>
                <Badge variant="secondary">{meta.generation}</Badge>
              </div>
            ) : null}

            {/* Deletion Task ID */}
            {meta.deletionTaskId ? (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Deletion Task ID:</span>
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {meta.deletionTaskId}
                </code>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
