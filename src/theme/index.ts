import { Theme, theme } from "@chakra-ui/react";

const customTheme: Theme = {
  ...theme,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
};

export default customTheme;
