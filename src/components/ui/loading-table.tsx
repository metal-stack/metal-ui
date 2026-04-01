import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface LoadingTableProps {
  rows?: number
  columns?: number
}

export function LoadingTable({ rows = 5, columns = 4 }: LoadingTableProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-4">
              {[...Array(columns)].map((_, colIndex) => (
                <Skeleton
                  key={colIndex}
                  className={`h-4 flex-1 ${colIndex === 0 ? "w-32" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
