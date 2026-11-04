import React from "react";
import classes from "./info-grid.module.css";

type InfoRow = {
  label: React.ReactNode;
  value: React.ReactNode;
  fullWidth?: boolean;
};

type InfoGridProps = {
  rows: InfoRow[];
  /** Default-Fallback für leere Werte */
  emptyValue?: React.ReactNode;
};

export function InfoGrid({ rows, emptyValue = "—" }: InfoGridProps) {
  const renderValue = (value: React.ReactNode) => {
    if (value === null || value === undefined || value === "") {
      return emptyValue;
    }
    return value;
  };

  return (
    <div className={classes.grid}>
      {rows.map((row, idx) => {
        const key = typeof row.label === "string" ? row.label : idx;
        const full = row.fullWidth ? ` ${classes.full}` : "";
        return (
          <React.Fragment key={key}>
            <div className={classes.label + full}>{row.label}</div>
            <div className={classes.value + full}>{renderValue(row.value)}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
