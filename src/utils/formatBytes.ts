export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";
  const kilobyteMultiplier = 1024;
  const decimalPlaces = decimals >= 0 ? decimals : 0;
  const sizes: string[] = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];
  const index = Math.floor(Math.log(bytes) / Math.log(kilobyteMultiplier));
  return `
      ${parseFloat(
        (bytes / Math.pow(kilobyteMultiplier, index)).toFixed(decimalPlaces)
      )} ${sizes[index]}
    `;
};
