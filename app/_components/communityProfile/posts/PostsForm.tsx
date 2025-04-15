/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PostingaPost } from "@/app/_lib/CommunityProfile/Posts";
import defaultProfile from "@/public/images/userprofile.jpg";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import ProtectedPage from "../../common/ProtectedPage";

type Props = { communityId: string };

function PostsForm({ communityId }: Props) {
  const userProfile = useSelector(
    (state: any) => state.user.currentUser.profilePic
  );
  const [isForbidden, setIsForbidden] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Close the textarea when clicking outside of it
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName !== "TEXTAREA" &&
        target.tagName !== "INPUT" &&
        target.tagName !== "BUTTON"
      ) {
        setIsClicked(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  // Handle form submission
  const handleAction = async (formData: FormData) => {
    const reqbody = {
      postTitle: formData.get("postTitle"),
      postContent: formData.get("postContent"),
    };

    if (!reqbody.postTitle || !reqbody.postContent) {
      return;
    }

    startTransition(async () => {
      const token = Cookies.get("token");
      const response = await PostingaPost(communityId, reqbody, token);
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
          return;
        }
        throw new Error("Error posting:", response.error);
      }
    });
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in" />
    );
  }

  return (
    <main className="w-9/12 bg-[var(--foreground-color)] rounded-2xl px-5 py-6">
      <form action={handleAction} className="flex flex-col w-full gap-4 px-2">
        <div className="flex gap-4 items-start w-full">
          {/* Profile Image */}
          <div className="w-fit self-start">
            <div className="relative w-16 aspect-square rounded-full overflow-hidden">
              <Image
                src={userProfile || defaultProfile}
                alt="my profile"
                fill
                className="object-cover rounded-full overflow-hidden"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
          {/* Post Input Fields */}
          <div className="flex-col flex gap-2 w-full">
            <input
              type="text"
              name="postTitle"
              onFocus={() => setIsClicked(true)}
              className=" bg-[--foreground-color] border-b-2 border-solid focus:outline-none text-[var(--text-color)] placeholder:text-[var(--text-color)] placeholder:opacity-80 py-1  w-full self-start text-lg focus:border-b-[var(--hover-color)]"
              placeholder="Add a Subject"
            />
            <textarea
              rows={isClicked ? 4 : 2}
              onFocus={() => setIsClicked(true)}
              name="postContent"
              className="w-full resize-none focus:outline-none bg-[--foreground-color]  placeholder:text-[var(--text-color)] placeholder:opacity-60 py-2 text-lg 
            "
              placeholder="Write something..."
            />
          </div>
        </div>
        <div className="self-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[var(--btn-color)] rounded-xl px-5 py-3 font-semibold text-xl hover:bg-[var(--button-hover-background-color)] transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--button-hover-background-color)] disabled:hover:text-[var(--text-color)]"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default PostsForm;
