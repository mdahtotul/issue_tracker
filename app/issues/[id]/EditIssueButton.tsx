import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <div>
      <Link href={`/issues/${issueId}/edit`}>
        <Button className="cursor-pointer">
          <Pencil2Icon /> Edit Issue
        </Button>
      </Link>
    </div>
  );
}
