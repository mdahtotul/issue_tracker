import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import { authOptions } from "@/authOptions";
import { getServerSession } from "next-auth";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

type Props = {
  params: { id: string };
};

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!issue) notFound();
  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap={"5"}
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <EditIssueButton issueId={issue?.id} />
            <DeleteIssueButton issueId={issue?.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}
