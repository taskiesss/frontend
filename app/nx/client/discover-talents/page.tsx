/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/app/_components/common/Container";
import Spinner from "@/app/_components/common/Spinner";
import FreelancerList from "@/app/_components/Freelancer/FreelancerList";
import { searchFreelancers } from "@/app/_lib/Search/Search";
import { PageFreelancerResponse } from "@/app/_types/FreelancerSearch";
import React, { Suspense } from "react";

type Props = {
  searchParams: Promise<{
    page?: string | "0";
  }>;
};

let paginations: PageFreelancerResponse;

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const { page } = params;
  const pageNumber = Number(page) ? Number(page) : 1;
  try {
    paginations = await searchFreelancers({ page: pageNumber - 1, size: 10 });
  } catch (e: any) {
    console.error(e.message);
  }
  return (
    <Container className="py-6">
      {paginations?.content && paginations?.content.length > 0 ? (
        <Container className="w-full px-3 sm:px-5 lg:px-7 xl:px-16">
          <Suspense fallback={<Spinner />}>
            <FreelancerList freelancers={paginations} />
          </Suspense>
        </Container>
      ) : (
        <div className=" grid place-items-center min-h-screen">
          <span className="text-[var(--accent-color)] text-3xl">
            There are no Freelancers...
          </span>
        </div>
      )}
    </Container>
  );
}
