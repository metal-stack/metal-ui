import {
  Anchor,
  createTheme,
  NavLink,
  type MantineColorsTuple,
} from "@mantine/core";

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
  components: {
    NavLink: NavLink.extend({
      defaultProps: {
        style: { borderRadius: "var(--mantine-radius-md)", padding: 0 },
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: { c: "inherit", underline: "never" },
    }),
  },
  fontFamily: "Inter, system-ui, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', ui-monospace, monospace",
});

/** Background of the page area behind the tiles. */
export const pageBg =
  "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))";
/** Background of tiles (sections, tables) on top of the page area. */
export const tileBg =
  "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))";
