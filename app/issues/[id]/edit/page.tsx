import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "../../IssueFormSkeleton";
const IssueForm = dynamic(
  () => import("@/components/IssueComponent/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

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
