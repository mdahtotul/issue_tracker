import dynamic from "next/dynamic";
import IssueFormSkeleton from "../IssueFormSkeleton";
const IssueForm = dynamic(
  () => import("@/components/IssueComponent/IssueForm"),
  { ssr: false, loading: () => <IssueFormSkeleton /> }
);

export default function NewIssuePage() {
  return (
    <>
      <IssueForm />
    </>
  );
}
