import React from "react";

type InfoRow = {
  label: React.ReactNode;
  value: React.ReactNode;
  fullWidth?: boolean;
};

type InfoGridProps = {
  rows: InfoRow[];
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  responsive?: boolean;
  /** Default-Fallback für leere Werte */
  emptyValue?: React.ReactNode;
};

export function InfoGrid({
  rows,
  className,
  labelClassName = "font-semibold",
  valueClassName = "",
  responsive = true,
  emptyValue = "—",
}: InfoGridProps) {
  const gridCols = responsive
    ? "grid-cols-1 sm:grid-cols-[auto_1fr]"
    : "grid-cols-[auto_1fr]";

  const renderValue = (value: React.ReactNode) => {
    if (value === null || value === undefined || value === "") {
      return emptyValue;
    }

    return value;
  };

  return (
    <div className={`grid ${gridCols} gap-2 sm:gap-x-4 ${className ?? ""}`}>
      {rows.map((row, idx) => {
        const key = typeof row.label === "string" ? row.label : idx;

        if (row.fullWidth) {
          return (
            <React.Fragment key={key}>
              <div className={`${labelClassName} sm:col-span-2`}>
                {row.label}
              </div>
              <div
                className={`warp-break-word sm:col-span-2 ${valueClassName}`}
              >
                {renderValue(row.value)}
              </div>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={key}>
            <div className={labelClassName}>{row.label}</div>
            <div className={`wrap-break-word ${valueClassName}`}>
              {renderValue(row.value)}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
