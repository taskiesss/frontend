/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/app/_components/common/Container";
import CommunityList from "@/app/_components/Community/CommunityList";
import { searchCommunities } from "@/app/_lib/Search/Search";
import { PageCommunityResponse } from "@/app/_types/CommunitySearch";
import React from "react";

type Props = {
  searchParams: Promise<{
    page?: string | "0";
  }>;
};

let paginations: PageCommunityResponse;

export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  const { page } = params;
  const pageNumber = Number(page) ? Number(page) : 1;
  try {
    paginations = await searchCommunities({ page: pageNumber - 1, size: 10 });
  } catch (e: any) {
    console.error(e.message);
  }
  return (
    <Container className="py-6">
      {paginations?.content && paginations?.content.length > 0 ? (
        <CommunityList communities={paginations} />
      ) : (
        <div className=" grid place-items-center min-h-screen">
          <span className="text-[var(--accent-color)] text-3xl">
            There is no Communities...
          </span>
        </div>
      )}
    </Container>
  );
}
