export const generateColors = (numColors: number): string[] => {
  const colors: string[] = [];
  const tailwindColors = [
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#FBBF24", // Yellow
    "#22C55E", // Green
    "#A855F7", // Purple
    "#EC4899", // Pink
    "#F97316", // Orange
    "#14B8A6", // Teal
    "#6366F1", // Indigo
    "#6B7280", // Gray
  ];

  for (let i = 0; i < numColors; i++) {
    colors.push(tailwindColors[i % tailwindColors.length]);
  }

  return colors;
};
