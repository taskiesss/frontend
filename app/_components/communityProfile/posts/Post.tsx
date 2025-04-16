import { timeAgo } from "@/app/_helpers/helper";
import { PostResponse } from "@/app/_types/CommunityPostsResponse";
import Image from "next/image";
import Link from "next/link";
import CommentButton from "./CommentButton";
import DeletePostButton from "./DeletePostButton";
import LikeButton from "./LikeButton";

type Props = {
  index: number;
  communityId: string;
  post: PostResponse;
  canDelete: boolean;
};

function Post({ communityId, post, index, canDelete }: Props) {
  return (
    <main
      key={index}
      className="flex flex-col w-9/12 justify-between bg-[var(--foreground-color)] rounded-2xl py-8 px-6"
    >
      {/* Post Component Content */}
      <div className="flex gap-4 w-full">
        {/* delete button */}
        {canDelete && (
          <DeletePostButton communityId={communityId} postId={post.postID} />
        )}
        <Link
          href={`/nx/freelancer/profile/${post.postOwner.id}`}
          className="w-fit self-start"
        >
          <div className="relative w-16 aspect-square rounded-full overflow-hidden">
            <Image
              src={post.postOwner.profilePicture}
              alt={`${post.postOwner.name} img`}
              fill
              className="object-cover rounded-full overflow-hidden"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </Link>
        {/* post content */}
        <div className="flex flex-col w-full self-start">
          <div className="flex flex-col pb-4">
            <Link
              href={`/nx/freelancer/profile/${post.postOwner.id}`}
              className="hover:text-[var(--button-hover-background-color)] hover:underline text-lg font-semibold"
            >
              <p>{post.postOwner.name}</p>
            </Link>
            <p className="text-sm opacity-80">{timeAgo(post.date)}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold ">{post.postTitle}</h3>
            <p className="text-lg whitespace-pre-wrap">{post.postContent}</p>
          </div>
          {/* Likes and Comments Section */}
          <div className="flex items-center gap-6 pt-4 ">
            <LikeButton
              isLikedpost={post.isLiked}
              numberOfLikes={post.numberOfLikes}
              postId={post.postID}
              communityId={communityId}
            />
            <CommentButton
              canDelete={canDelete}
              postId={post.postID}
              numberOfComments={post.numberOfComments}
              communityId={communityId}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Post;
