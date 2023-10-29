import IssueForm from "@/components/IssueComponent/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) notFound();

  return (
    <>
      <IssueForm issue={issue} />
    </>
  );
}
