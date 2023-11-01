import Pagination from "@/components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      Hello world
      <div>
        <Pagination
          itemCount={100}
          pageSize={10}
          currentPage={+searchParams.page}
        />
      </div>
    </div>
  );
}
