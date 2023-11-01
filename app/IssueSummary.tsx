import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const items: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"4"}>
      {items.map((_, idx) => (
        <Card key={idx}>
          <Flex direction={"column"}>
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${_?.status}`}
            >
              {_?.label}
            </Link>
          </Flex>
          <Text size={"5"} className="font-bold">
            {_?.value}
          </Text>
        </Card>
      ))}
    </Flex>
  );
}
