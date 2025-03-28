/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/app/_components/common/Container";
import CustomeSelection from "@/app/_components/common/CustomeSelection";
import Spinner from "@/app/_components/common/Spinner";
import AdvancedSearchButton from "@/app/_components/Freelancer/AdvancedSearchButton";
import FreelancerList from "@/app/_components/Freelancer/FreelancerList";
import { searchFreelancers } from "@/app/_lib/Search/Search";
import { PageFreelancerResponse } from "@/app/_types/FreelancerSearch";
import { Suspense } from "react";

export const revalidate = 3600;

export interface PageProps {
  pathName?: string;
  searchParams: Promise<{
    skills?: string;
    experience?: string;
    minRate?: string;
    maxRate?: string;
    query?: string;
    page?: string | "1";
    rate?: string;

    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
}

let paginations: PageFreelancerResponse;

const Page = async ({ searchParams }: PageProps) => {
  // Await the promise to get the query parameters.
  const params = await searchParams;
  const {
    query,
    skills,
    experience,
    page,
    rate,
    minRate,
    maxRate,

    "Sort by": sortBy,
    "Sort direction": sortDirection,
  } = params;

  const experienceArr = experience?.split(",");
  // Show advanced filters if advanced=true in the query.

  const decodedSearch = query ? decodeURIComponent(query) : "";

  // Convert comma‑separated filter strings to arrays.
  const skillArr = skills ? skills.split(",") : [];

  try {
    const hourlyRateMinNumber = minRate ? Number(minRate) : undefined;
    const hourlyRateMaxNumber = maxRate ? Number(maxRate) : undefined;
    const pageNumber = Number(page) ? Number(page) : 1;
    const rating = rate ? Number(rate) : undefined;

    const request = {
      search: decodedSearch,
      skills: skillArr,
      experienceLevel: experienceArr,
      hourlyRateMin: hourlyRateMinNumber,
      hourlyRateMax: hourlyRateMaxNumber,
      page: pageNumber - 1,
      size: 10,
      sortBy: sortBy,
      sortDirection: sortDirection,
      rate: rating,
    };

    console.log("Freelancer search request:", request);
    const res = await searchFreelancers(request);
    paginations = res;
  } catch (error: any) {
    console.error("Freelancer search failed:", error.message);
  }

  const SortByOptions = [
    { label: "Rate", value: "rate" },
    { label: "Price Per Hour", value: "pricePerHour" },
  ];
  const DirectionOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
  ];

  return (
    <Container>
      <div className="h-screen grid grid-cols-[0.75fr_3fr] grid-rows-[min-content_min-content_1fr]">
        {/* Top navigation */}

        {/* Sorting controls */}
        <div className="col-span-2 bg-[var(--background-color)] flex gap-10 py-4 justify-end">
          <Suspense fallback={<Spinner />}>
            <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
            <CustomeSelection options={DirectionOptions}>
              Sort direction
            </CustomeSelection>
          </Suspense>
        </div>

        {/* Advanced search panel or button */}
        <AdvancedSearchButton />

        {/* Freelancer results */}
        {paginations?.content && paginations?.content.length > 0 ? (
          <Suspense fallback={<Spinner />}>
            <FreelancerList freelancers={paginations} />
          </Suspense>
        ) : (
          <div className=" grid place-items-center min-h-screen">
            <span className="text-[var(--accent-color)] text-3xl">
              There are no Freelancers...
            </span>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
