import { Skeleton } from "@/components";
import { Card, Flex, Heading } from "@radix-ui/themes";

export default function LoadingIssueDetails() {
  return (
    <div>
      <Heading className="max-w-xl">
        <Skeleton />
      </Heading>
      <Flex className="gap-3 my-2">
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton count={3} />
      </Card>
    </div>
  );
}
