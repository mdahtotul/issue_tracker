import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await getStatusCount("OPEN");
  const inProgress = await getStatusCount("IN_PROGRESS");
  const closed = await getStatusCount("CLOSED");
  return (
    <>
      <LatestIssues />;
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}

const getStatusCount = async (status: Status) => {
  return await prisma.issue.count({ where: { status: status } });
};
