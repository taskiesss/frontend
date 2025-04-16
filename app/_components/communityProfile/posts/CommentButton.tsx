/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  deleteCommentAPI,
  getComments,
  postComment,
} from "@/app/_lib/CommunityProfile/Posts";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState, useTransition } from "react";
import ProtectedPage from "../../common/ProtectedPage";
import Comment from "./Comment";
import { CommentResponse } from "@/app/_types/CommunityPostsResponse";
import Image from "next/image";
import { useSelector } from "react-redux";
import defaultProfile from "@/public/images/userprofile.jpg";

type Props = {
  numberOfComments: number;
  communityId: string;
  postId: string;
  canDelete: boolean;
};

function CommentButton({
  numberOfComments,
  communityId,
  postId,
  canDelete,
}: Props) {
  const [showComments, setShowComments] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);
  const [isLast, setIsLast] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [comments, setComments] = useState<
    { comment: CommentResponse; page: number }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [commentId, setCommentId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const userProfile = useSelector(
    (state: any) => state.user.currentUser.profilePic
  );

  useEffect(() => {
    if (showComments) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showComments]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!showComments) return;

      const token = Cookies.get("token");

      // Fetch comments from API
      const response = await getComments(
        postId,
        communityId,
        token,
        currentPage
      );
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
        } else {
          console.error("Error fetching comments:", response.error);
        }
        return;
      }
      setComments(response);
      setCurrentPage((prev) => prev + 1);
      setIsLast(response.last);
    };
    fetchComments();
  }, [currentPage, showComments, refetch, postId, communityId]);

  useEffect(() => {
    if (showComments) {
      setCurrentPage(0);
    }
  }, [showComments]);

  //delete comment
  const handleDelete = async (commentId: string) => {
    const token = Cookies.get("token");
    setIsSubmitting(true);
    // Delete comment from API
    const response = await deleteCommentAPI(postId, token, commentId);
    if (response.error) {
      if (
        response.error === "Forbidden" ||
        response.error === "Unauthorized user"
      ) {
        setIsForbidden(true);
      } else {
        console.error("Error deleting comment:", response.error);
      }
      setIsSubmitting(false);
      setShowConfirm(false);
      return;
    }
    setRefetch((prev) => !prev);
    setIsSubmitting(false);
    setShowConfirm(false);
  };

  const handleSubmitComment = async (formData: FormData) => {
    const reqbody = {
      content: formData.get("content"),
    };
    if (!reqbody.content) {
      return;
    }
    startTransition(async () => {
      const token = Cookies.get("token");
      const response = await postComment(postId, communityId, token, reqbody);
      if (response.error) {
        if (
          response.error === "Forbidden" ||
          response.error === "Unauthorized user"
        ) {
          setIsForbidden(true);
        } else {
          console.error("Error posting comment:", response.error);
        }

        return;
      }
      setRefetch((prev) => !prev);
    });
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  return (
    <>
      <div className="flex items-center gap-1 self-start">
        <button onClick={() => setShowComments(true)} className="block">
          <FontAwesomeIcon
            icon={faComment}
            className="text-xl hover:text-2xl transition-all duration-200"
          />{" "}
        </button>
        {/* Comment Icon */}
        <button
          onClick={() => setShowComments(true)}
          className="text-md hover:underline"
        >
          {numberOfComments}
        </button>
      </div>
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowComments(false)}
          ></div>

          {/* Modal Content */}
          <div
            className="
                        relative bg-[var(--background-color)] rounded-lg shadow-lg 
                        w-[95%] sm:w-[45rem] max-w-[95%] 
                        h-fit max-h-[48rem] 
                        overflow-y-auto 
                      "
          >
            <div className="p-6 flex justify-between items-center ">
              <h3 className="text-3xl font-bold text-center px-4 ">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-600 hover:text-gray-800 text-3xl"
              >
                ✖
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* List of users who liked the post */}
                <ul className="list-none flex flex-col px-4 pb-5 gap-6">
                  {/* Replace with actual user data */}
                  {comments.map((comment) =>
                    comment.comment.content.map((p, i) => (
                      <Comment
                        canDelete={canDelete}
                        handleDelete={() => {
                          setCommentId(p.commentId);
                          setShowConfirm(true);
                        }}
                        key={i}
                        i={i}
                        p={p}
                      />
                    ))
                  )}
                  {!isLast && (
                    <button
                      onClick={() =>
                        setCurrentPage((currentPage) => currentPage + 1)
                      }
                      className="text-lg text-[var(--button-hover-background-color)] hover:underline"
                    >
                      Load more comments
                    </button>
                  )}
                  {/* No comments yet */}
                  {comments.length === 0 && (
                    <li className="text-center text-xl opacity-70">
                      No comments yet
                    </li>
                  )}
                  {/* submitting a comment */}
                  <form
                    action={handleSubmitComment}
                    className="flex gap-2 border-2 border-solid border-[var(--background-color)] rounded-xl p-4"
                  >
                    {" "}
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
                    <div className="w-full">
                      <textarea
                        rows={3}
                        name="content"
                        className="w-full resize-none focus:outline-none bg-[--foreground-color]  placeholder:text-[var(--text-color)] placeholder:opacity-60 py-2 text-lg 
            "
                        placeholder="Write something..."
                      />
                    </div>
                    <div className="self-end">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="bg-[var(--btn-color)] rounded-xl px-5 py-3 font-semibold text-lg hover:bg-[var(--button-hover-background-color)] transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--button-hover-background-color)] disabled:hover:text-[var(--text-color)]"
                      >
                        {isPending ? "Posting..." : "Post"}
                      </button>
                    </div>
                  </form>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-xl w-full">
            <h3 className="text-2xl font-bold text-red-500 pb-4">
              <span className="text-3xl">⚠{"  "}</span> Confirm deletion
            </h3>
            <p className="whitespace-pre-wrap text-lg pb-6">
              Are you sure you want to do remove this comment ? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                className="text-lg bg-red-500 hover:bg-red-600 transition-colors py-2 px-3 rounded-lg disabled:opacity-50"
                disabled={isSubmitting}
                onClick={() => handleDelete(commentId)}
              >
                {isSubmitting ? "Confirming..." : "Confirm deletion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CommentButton;
