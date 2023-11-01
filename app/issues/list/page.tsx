import Pagination from "@/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

type Props = {
  searchParams: IssueQuery;
};

export default async function IssuesPage({ searchParams }: Props) {
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const f_status = searchParams.status;
  const allStatus = Object.values(Status);
  const status = allStatus.includes(f_status) ? f_status : undefined;

  const where = { status };

  const page = +searchParams.page || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: where });

  return (
    <Flex direction={"column"} gap={"3"}>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
}

export const dynamic = "force-dynamic"; // by default 30s cache
// export const revalidate = 10;  // 10 is the seconds to refresh content in this page

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
