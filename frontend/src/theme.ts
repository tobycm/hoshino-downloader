import { createTheme } from "@mantine/core";

const theme = createTheme({
  colors: {
    specialPink: ["#ffebf7", "#fad5e8", "#f0a6ca", "#e87bb0", "#e05598", "#dc3c89", "#db2e82", "#c2216f", "#ae1963", "#990a56"],
    specialPurple: ["#faecff", "#edd6fa", "#d6a6f0", "#c27be8", "#af54e0", "#a33bdc", "#9e2edb", "#8921c2", "#7b1bae", "#6b1299"],
  },
  primaryColor: "specialPurple",
});

export default theme;
