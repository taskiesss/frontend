/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import JobList from "../../_components/Job/JobList";
import Container from "../../_components/common/Container";
import { PageJobResponse } from "../../_types/JobSearch";
import { searchJobs } from "../../_lib/Search/Search";

let paginations: PageJobResponse;

type Props = {
  searchParams: Promise<{
    page?: string | "0";
  }>;
};

export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  const { page } = params;
  const pageNumber = Number(page) ? Number(page) : 1;
  try {
    paginations = await searchJobs({ page: pageNumber - 1, size: 10 });
  } catch (e: any) {
    console.error(e.message);
  }
  return (
    <Container className="py-6">
      {paginations?.content && paginations?.content.length > 0 ? (
        <Container className="w-full px-3 sm:px-5 lg:px-7 xl:px-16">
          <JobList jobs={paginations} />
        </Container>
      ) : (
        <div className=" grid place-items-center min-h-screen">
          <span className="text-[var(--accent-color)] text-3xl">
            There is no Jobs...
          </span>
        </div>
      )}
    </Container>
  );
}
