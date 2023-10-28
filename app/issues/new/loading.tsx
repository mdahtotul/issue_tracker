import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

export default function LoadingNewIssue() {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height={"20rem"} />
    </Box>
  );
}
