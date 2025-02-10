import React from "react";
import JobList from "../_components/Job/JobList";
import Container from "../_components/common/Container";
import { PageJobResponse } from "../_types/JobSearch";

let paginations: PageJobResponse;

paginations = {
  content: [
    {
      id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dda4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dfa4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dda4d-c986-44k9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
  ],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalElements: 50,
  totalPages: 5,
  last: false,
  size: 10,
  number: 0,
  sort: {
    sorted: false,
    unsorted: true,
    empty: false,
  },
  numberOfElements: 10,
  first: true,
  empty: false,
};

type Props = { searchParams: string };

export default function page({}: Props) {
  return (
    <Container className="py-6">
      {paginations?.content ? (
        <JobList jobs={paginations} />
      ) : (
        <div className="flex flex-row place-content-center justify-center">
          <span className="text-[var(--accent-color)] text-3xl text-center">
            There is no Jobs...
          </span>
        </div>
      )}
    </Container>
  );
}
