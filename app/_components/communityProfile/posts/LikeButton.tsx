"use client";
import { getLikes, likePost } from "@/app/_lib/CommunityProfile/Posts";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProtectedPage from "../../common/ProtectedPage";

type Props = {
  numberOfLikes: number;
  communityId: string;
  postId: string;
  isLikedpost: boolean;
};

interface LikeResponse {
  likes: {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
  }[];
}

function LikeButton({
  numberOfLikes,
  communityId,
  postId,
  isLikedpost,
}: Props) {
  const [isLiked, setIsLiked] = useState(isLikedpost);
  const [numberOfLike, setNumberOfLike] = useState(numberOfLikes);
  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState<LikeResponse>({ likes: [] });
  const [isForbidden, setIsForbidden] = useState(false);

  // handline new post added to have fresh data
  useEffect(() => {
    setNumberOfLike(numberOfLikes); // Sync with new numberOfLikes
    setIsLiked(isLikedpost); // Sync with new isLikedpost
    setLikes({ likes: [] }); // Clear likes for new post
    setShowLikes(false); // Close likes modal
  }, [postId, numberOfLikes, isLikedpost]);

  useEffect(() => {
    if (showLikes) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLikes]);

  const handleLike = async (like: boolean) => {
    const token = Cookies.get("token");

    // like post
    setIsLiked(like);
    setNumberOfLike((prev) => (like ? prev + 1 : prev - 1));
    const response = await likePost(postId, communityId, like, token);
    if (response.error) {
      if (
        response.error === "Forbidden" ||
        response.error === "Unauthorized user"
      ) {
        setIsForbidden(true);
      } else {
        console.error("Error liking post:", response.error);
      }
    }
  };

  useEffect(() => {
    const getfetchLikes = async () => {
      if (!showLikes) return;
      const token = Cookies.get("token");

      // get likes
      const response = await getLikes(postId, communityId, token);
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
        } else {
          console.error("Error fetching likes:", response.error);
        }
      } else {
        setLikes(response);
      }
    };
    getfetchLikes();
  }, [communityId, postId, showLikes]);

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  return (
    <>
      <div className="flex items-center gap-1 self-start">
        <button onClick={() => handleLike(!isLiked)} className="block">
          <FontAwesomeIcon
            icon={faHeart}
            className={`${
              isLiked ? "text-red-500" : ""
            } text-xl hover:text-2xl transition-all duration-200`}
          />{" "}
        </button>
        {/* Like Icon */}
        <button
          onClick={() => setShowLikes(true)}
          className="text-md hover:underline"
        >
          {numberOfLike}
        </button>
      </div>
      {showLikes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowLikes(false)}
          ></div>

          {/* Modal Content */}
          <div
            className="
                  relative bg-[var(--background-color)] rounded-lg shadow-lg 
                  w-[65%] sm:w-[36rem] max-w-[65%] 
                  h-fit max-h-[48rem] 
                  overflow-y-auto 
                "
          >
            <div className="p-6 flex justify-between items-center ">
              <h3 className="text-3xl font-bold text-center px-4 ">Likes</h3>
              <button
                onClick={() => setShowLikes(false)}
                className="text-gray-600 hover:text-gray-800 text-3xl"
              >
                ✖
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* List of users who liked the post */}
                <ul className="list-none flex flex-col px-4 gap-4">
                  {/* Replace with actual user data */}
                  {likes.likes.map((p, i) => (
                    <li className="flex gap-2 items-center" key={i}>
                      <Link
                        href={`/nx/freelancer/profile/${p.id}`}
                        className="w-fit"
                      >
                        <div className="relative w-16 aspect-square rounded-full overflow-hidden">
                          <Image
                            src={p.profilePicture}
                            alt={`${p.name} img`}
                            fill
                            className="object-cover rounded-full overflow-hidden"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                          />
                        </div>
                      </Link>
                      <Link
                        href={`/nx/freelancer/profile/${p.id}`}
                        className="hover:text-[var(--button-hover-background-color)] hover:underline transition-all"
                      >
                        <span className="text-lg">{p.name}</span>
                      </Link>
                    </li>
                  ))}
                  {likes.likes.length === 0 && (
                    <li className="text-center text-xl opacity-70">
                      No likes yet
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LikeButton;
