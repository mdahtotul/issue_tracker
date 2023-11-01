import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueCharts from "./IssueCharts";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await getStatusCount("OPEN");
  const inProgress = await getStatusCount("IN_PROGRESS");
  const closed = await getStatusCount("CLOSED");
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueCharts open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

const getStatusCount = async (status: Status) => {
  return await prisma.issue.count({ where: { status: status } });
};

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
