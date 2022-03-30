import { forwardRef } from "react";
import { Box, Spinner } from "@chakra-ui/react";

export const NotebookSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
);

export const NotebookContainer = forwardRef<
  HTMLDivElement,
  { children: false | JSX.Element }
>(({ children }, ref) => (
  <Box
    ref={ref}
    className="voxel-Notebook"
    w={[280, 480, 640]}
    h={[280, 480, 640]}
    position="relative"
  >
    {children}
  </Box>
));
NotebookContainer.displayName = "NotebookContainer";

const Loader = () => (
  <NotebookContainer>
    <NotebookSpinner />
  </NotebookContainer>
);

export default Loader;
