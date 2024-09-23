export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  let bigint;
  if (hex.length === 3) {
    bigint = parseInt(
      hex
        .split("")
        .map((c) => c + c)
        .join(""),
      16
    );
  } else if (hex.length === 6) {
    bigint = parseInt(hex, 16);
  } else {
    throw new Error("Invalid HEX color format.");
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
