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
    }),
  },
});

export default theme;
