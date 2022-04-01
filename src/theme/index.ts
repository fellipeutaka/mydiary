import { extendTheme, Theme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: Theme) => ({
      body: {
        bg: mode("#ffffff", "#000000")(props),
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "#f0f0f0",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#747373",
      },
    }),
  },
});

export default theme;
