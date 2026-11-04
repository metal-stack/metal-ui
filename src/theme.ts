import { createTheme, type MantineColorsTuple } from "@mantine/core";

const metal: MantineColorsTuple = [
  "#fff6e5",
  "#ffeacc",
  "#fdd29a",
  "#fbb964",
  "#faa437",
  "#f9951a",
  "#f98f09",
  "#de7b00",
  "#c66d00",
  "#ac5d00",
];

export const theme = createTheme({
  primaryColor: "metal",
  primaryShade: { light: 5, dark: 5 },
  colors: { metal },
  defaultRadius: "md",
  autoContrast: true,
  luminanceThreshold: 0.4,
  fontFamily: "Inter, system-ui, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', ui-monospace, monospace",
});
