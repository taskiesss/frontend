/* eslint-disable @typescript-eslint/no-explicit-any */

import Container from "@/app/_components/common/Container";
import JobList from "@/app/_components/Job/JobList";
import { searchJobs } from "@/app/_lib/Search/Search";
import { PageJobResponse } from "@/app/_types/JobSearch";

let paginations: PageJobResponse;

// paginations = {
//   content: [
//     {
//       id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
//       title: "Full Stack Developer",
//       description: "Seeking a skilled React developer...",
//       experienceLevel: "Intermediate",
//       skills: ["React", "HTML", "CSS", "JavaScript"],
//       pricePerHour: 29.99,
//       postedDate: "2024-02-02",
//       projectLength: "_1_to_3_months",
//       rate: 4,
//       isSaved: false,
//     },
//     {
//       id: "884dda4d-c986-44c9-bba8-d1bef62d1c91",
//       title: "Full Stack Developer",
//       description: "Seeking a skilled React developer...",
//       experienceLevel: "Intermediate",
//       skills: ["React", "HTML", "CSS", "JavaScript"],
//       pricePerHour: 29.99,
//       postedDate: "2025-02-08T13:26:04.837+00:00",
//       projectLength: "_1_to_3_months",
//       rate: 4,
//       isSaved: false,
//     },
//     {
//       id: "884dfa4d-c986-44c9-bba8-d1bef62d1c91",
//       title: "Full Stack Developer",
//       description: "Seeking a skilled React developer...",
//       experienceLevel: "Intermediate",
//       skills: ["React", "HTML", "CSS", "JavaScript"],
//       pricePerHour: 29.99,
//       postedDate: "2024-02-02",
//       projectLength: "_1_to_3_months",
//       rate: 4,
//       isSaved: false,
//     },
//     {
//       id: "884dda4d-c986-44k9-bba8-d1bef62d1c91",
//       title: "Full Stack Developer",
//       description: "Seeking a skilled React developer...",
//       experienceLevel: "Intermediate",
//       skills: ["React", "HTML", "CSS", "JavaScript"],
//       pricePerHour: 29.99,
//       postedDate: "2024-02-02",
//       projectLength: "_1_to_3_months",
//       rate: 4,
//       isSaved: false,
//     },
//   ],
//   pageable: {
//     sort: {
//       sorted: false,
//       unsorted: true,
//       empty: false,
//     },
//     offset: 0,
//     pageNumber: 0,
//     pageSize: 10,
//     paged: true,
//     unpaged: false,
//   },
//   totalElements: 50,
//   totalPages: 5,
//   last: false,
//   size: 10,
//   number: 0,
//   sort: {
//     sorted: false,
//     unsorted: true,
//     empty: false,
//   },
//   numberOfElements: 10,
//   first: true,
//   empty: false,
// };

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
  } catch (e: any) {
    throw new Error(e.message);
  }
}
