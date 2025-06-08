/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import ProtectedPage from "@/app/_components/common/ProtectedPage";
import { getMyCommunities } from "@/app/_lib/FreelancerProfile/myCommunities";
import MyCommunityList from "@/app/_components/Freelancer/FreelancerCommunityList";
import Container from "@/app/_components/common/Container";
import Link from "next/link";

// Type guard for error with message
const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  );
};

export default async function MyCommunitiesPage() {
  const token = (await cookies()).get("token")?.value;

  try {
    const communities = await getMyCommunities(token);

    return (
      <Container>
        <div className="px-4 py-8 flex flex-col">
          <h1 className="text-4xl font-bold mb-8">My Communities</h1>

          <MyCommunityList
            adminCommunities={communities.adminOf}
            memberCommunities={communities.memberOf}
          />

          <Link
            href="/nx/freelancer/community-post"
            className="bg-[var(--btn-color)] text-[var(--accent-color)] px-4 py-2 my-14 rounded flex items-center gap-2 hover:bg-[var(--button-hover-background-color)] max-w-fit"
          >
            Create Community
          </Link>
        </div>
      </Container>
    );
  } catch (error: any) {
    if (isErrorWithMessage(error)) {
      if (error.message === "Unauthorized" || error.message === "Forbidden") {
        return (
          <ProtectedPage message="You need to be logged in to view your communities. Please log in." />
        );
      }
    }

    throw new Error(error.message);
  }
}
