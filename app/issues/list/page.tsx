import { IssueStatusBadge } from "@/components/";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueActions from "./IssueActions";

type Props = {
  searchParams: { status: Status; orderBy: keyof Issue };
};

export default async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Start Date",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const f_status = searchParams.status;
  const allStatus = Object.values(Status);
  const status = allStatus.includes(f_status) ? f_status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((_, idx) => (
              <Table.ColumnHeaderCell key={idx} className={_?.className}>
                <Link
                  href={{
                    query: { ...searchParams, orderBy: _?.value },
                  }}
                >
                  {_?.label}
                </Link>
                {_?.value === searchParams.orderBy ? (
                  <ArrowUpIcon className="inline-block" />
                ) : (
                  <ArrowDownIcon className="inline-block" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic"; // by default 30s cache
// export const revalidate = 10;  // 10 is the seconds to refresh content in this page
