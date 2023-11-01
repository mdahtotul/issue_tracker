import { IssueStatusBadge } from "@/components/";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

export default function IssueTable({ searchParams, issues }: Props) {
  return (
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
  );
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Start Date",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);
