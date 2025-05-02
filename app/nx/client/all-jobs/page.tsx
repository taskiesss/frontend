"use server";

import Container from "@/app/_components/common/Container";
import { cookies } from "next/headers";

import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getMyJobs } from "@/app/_lib/Client/AllJobs";
import JobsAndPagination from "@/app/_components/clientJobs/JobsAndPagination";

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { page } = await searchParams;
  const newPage = page ? parseInt(page, 10) : 1;
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  const response = await getMyJobs(token, newPage - 1, 10, "");

  console.log(response);

  // Type guard to narrow response type
  if ("error" in response) {
    throw new Error(`Error loading jobs: ${response.error}`);
  }

  const { content, totalElements, totalPages, size } = response;

  return (
    <Container className="pt-10 flex flex-col gap-8">
      <h1 className="text-4xl">All Jobs Posts</h1>
      <div className="bg-[var(--foreground-color)] rounded-xl p-4">
        {/* <div className="flex items-center gap-5 w-full border-b-2 border-solid border-[var(--border-color)] py-5"></div> */}
        <JobsAndPagination
          jobs={content}
          role="client"
          currentPage={newPage}
          totalPages={totalPages}
          pageSize={size}
          totalElements={totalElements}
        />
      </div>
    </Container>
  );
};

export default Page;
