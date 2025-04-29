import { getPosts } from "@/app/_lib/CommunityProfile/Posts";
import { PostResponse } from "@/app/_types/CommunityPostsResponse";
import { cookies } from "next/headers";
import ProtectedPage from "../../common/ProtectedPage";
import Post from "./Post";
import PostPagination from "./PostPagination";

type Props = {
  communityId: string;
  canDelete: boolean;
  searchParams: { page?: string };
};

async function PostList({ communityId, canDelete, searchParams }: Props) {
  const pagePost = searchParams?.page ? Number(searchParams.page) : 0;
  const currentPage = isNaN(pagePost) || pagePost < 1 ? 1 : pagePost;

  const token = (await cookies()).get("token")?.value;

  const postsResponse = await getPosts(communityId, token, currentPage - 1, 10);
  if (postsResponse.error) {
    if (
      postsResponse.error === "Forbidden" ||
      postsResponse.error === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not allowed to do this action. Please log in again" />
      );
    }
    throw new Error("Error loading community profile:", postsResponse.error);
  }
  // console.log(postsResponse);
  return (
    <>
      {postsResponse?.content.length > 0 && (
        <>
          {postsResponse.content.map((post: PostResponse, i: number) => (
            <Post
              key={i}
              index={i}
              post={post}
              communityId={communityId}
              canDelete={canDelete}
            />
          ))}
          <PostPagination
            page={currentPage}
            totalElements={postsResponse.totalElements}
            size={10}
          />
        </>
      )}
      {postsResponse.content.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center  rounded-lg bg-[var(--foreground-color)]">
          <h2 className="text-xl font-semibold">No Posts Yet</h2>
          <p className="mt-2">Be the first to share something!</p>
        </div>
      )}
    </>
  );
}

export default PostList;
