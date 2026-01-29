type ByteUnit = "B" | "KB" | "MB" | "GB" | "TB";

const UNITS: ByteUnit[] = ["B", "KB", "MB", "GB", "TB"];
const BASE = 1024n;

export function formatBytesBigInt(bytes: bigint, decimals = 2): string {
  if (bytes === 0n) return "0 B";

  let unitIndex = 0;
  let value = bytes;

  while (value >= BASE && unitIndex < UNITS.length - 1) {
    value /= BASE;
    unitIndex++;
  }

  // Dezimalstellen "simulieren"
  const factor = 10n ** BigInt(decimals);
  const precise = (bytes * factor) / BASE ** BigInt(unitIndex);

  const integerPart = precise / factor;
  const decimalPart = precise % factor;

  return `${integerPart}.${decimalPart
    .toString()
    .padStart(decimals, "0")} ${UNITS[unitIndex]}`;
}
