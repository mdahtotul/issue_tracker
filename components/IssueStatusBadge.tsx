import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

type Props = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "InProgress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export default function IssueStatusBadge({ status }: Props) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
