/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/app/_components/common/Container";
import FreelancerList from "@/app/_components/Freelancer/FreelancerList";
import { searchFreelancers } from "@/app/_lib/Search/Search";
import { PageFreelancerResponse } from "@/app/_types/FreelancerSearch";
import React from "react";

type Props = {
  searchParams: Promise<{
    page?: string | "0";
  }>;
};

let paginations: PageFreelancerResponse;

// paginations = {
//   content: [
//     {
//       id: "1",
//       name: "John Doe",
//       title: "Senior Python Developer",
//       description: "Experienced developer with expertise in Python and Django.",
//       skills: ["Python", "Django"],
//       rate: 4.8,
//       pricePerHour: 50,
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//       title: "Full-Stack Developer",
//       description: "Skilled in both front-end and back-end development.",
//       skills: ["JavaScript", "React", "Node.js"],
//       rate: 4.5,
//       pricePerHour: 45,
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
//     },
//     {
//       id: "3",
//       name: "Mike Johnson",
//       title: "Data Scientist",
//       description: "Expert in data analysis and machine learning.",
//       skills: ["Python", "Machine Learning", "Data Analysis"],
//       rate: 4.7,
//       pricePerHour: 60,
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
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
//   totalElements: 100,
//   totalPages: 10,
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
          <FreelancerList freelancers={paginations} />
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
