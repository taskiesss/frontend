import { timeAgo } from "@/app/_helpers/helper";
import userprofile from "@/public/images/userprofile.jpg";
import Image from "next/image";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
type Props = { communityId: string };

const post = {
  postID: "string",
  postOwner: {
    freelancerName: "Andrew Gamal",
    profilePicture: userprofile,
    freelancerId: "string",
  },
  postTitle: "Frontend Development Update",
  postContent:
    "Hi mates,\nWe've received the critical updates for the login feature. Please test the new update in staging and provide feedback by tomorrow.",
  isLiked: true,
  numberOfLikes: 0,
  date: "2025-04-15T13:08:08.813Z",
  numberOfComments: 0,
};

function PostList({ communityId }: Props) {
  return (
    <main className="flex flex-col w-9/12 justify-between bg-[var(--foreground-color)] rounded-2xl py-8 px-6">
      {/* PostList Component Content */}
      <div className="flex gap-4 w-full">
        <div className="w-fit self-start">
          <div className="relative w-16 aspect-square rounded-full overflow-hidden">
            <Image
              src={post.postOwner.profilePicture}
              alt={`${post.postOwner.freelancerName} img`}
              fill
              className="object-cover rounded-full overflow-hidden"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
        {/* post content */}
        <div className="flex flex-col w-full self-start">
          <div className="flex flex-col pb-4">
            <h2 className="text-lg font-semibold ">
              {post.postOwner.freelancerName}
            </h2>
            <p className="text-sm opacity-80">{timeAgo(post.date)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold ">{post.postTitle}</h3>
            <p className="text-lg whitespace-pre-wrap">{post.postContent}</p>
          </div>
          {/* Likes and Comments Section */}
          <div className="flex items-center gap-6 pt-4 ">
            <LikeButton
              numberOfLikes={post.numberOfLikes}
              communityId={communityId}
            />
            <CommentButton
              numberOfComments={post.numberOfComments}
              communityId={communityId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostList;
