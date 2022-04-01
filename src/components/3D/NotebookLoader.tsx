import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import Spinner from "components/General/Spinner";

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
    <Spinner />
  </NotebookContainer>
);

export default Loader;
