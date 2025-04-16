import { getPosts } from "@/app/_lib/CommunityProfile/Posts";
import { PostResponse } from "@/app/_types/CommunityPostsResponse";
import { cookies } from "next/headers";
import ProtectedPage from "../../common/ProtectedPage";
import Post from "./Post";
type Props = { communityId: string };

// const post: PostResponse = {
//   postID: "string",
//   postOwner: {
//     id: "string",
//     name: "Andrew Gamal",
//     profilePicture: "string",
//     role: "string",
//   },
//   postTitle: "Frontend Development Update",
//   postContent:
//     "Hi mates,\nWe've received the critical updates for the login feature. Please test the new update in staging and provide feedback by tomorrow.",
//   isLiked: false,
//   numberOfLikes: 0,
//   date: "2025-04-15T13:08:08.813Z",
//   numberOfComments: 0,
// };

async function PostList({ communityId }: Props) {
  const token = (await cookies()).get("token")?.value;
  const postsResponse = await getPosts(communityId, token);
  if (postsResponse.error) {
    if (
      postsResponse.error === "Forbidden" ||
      postsResponse.error === "Unauthorized user"
    ) {
      return (
        <ProtectedPage message="You are not alloed to do this action. Please log in again" />
      );
    }
    throw new Error("Error loading community profile:", postsResponse.error);
  }

  return (
    <>
      {postsResponse.content.length > 0 &&
        postsResponse.content.map((post: PostResponse, i: number) => (
          <Post key={i} index={i} post={post} communityId={communityId} />
        ))}
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
