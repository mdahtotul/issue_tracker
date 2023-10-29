import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="gap-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text> {issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
}
