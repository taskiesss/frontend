/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  deleteCommentAPI,
  getComments,
  postComment,
} from "@/app/_lib/CommunityProfile/Posts";
import { CommentResponse } from "@/app/_types/CommunityPostsResponse";
import defaultProfile from "@/public/images/userprofile.jpg";
import { faComment, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import ProtectedPage from "../../common/ProtectedPage";
import Comment from "./Comment";

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
    (state: any) => state.user.currentUser?.profilePic || defaultProfile
  );

  // Reset comments when postId changes (new post)
  useEffect(() => {
    setComments([]);
    setCurrentPage(0);
    setIsLast(true);
    setShowComments(false);
    setRefetch(false);
  }, [postId]);

  // Handle modal overflow
  useEffect(() => {
    if (showComments) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showComments]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!showComments) {
        setCurrentPage(0);
        setComments([]);
        setIsLast(true);
        setIsForbidden(false);
        setShowConfirm(false);
        setCommentId("");
        setIsSubmitting(false);
        return;
      }

      const token = Cookies.get("token");

      const response = await getComments(
        postId,
        communityId,
        token,
        currentPage,
        5
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

      // Validate response.content
      if (!response.content || !Array.isArray(response.content)) {
        console.warn("Invalid or missing content in API response:", response);
        setComments((state) => [
          ...state,
          { comment: { content: [], last: response.last }, page: currentPage },
        ]);
        setIsLast(response.last);
        return;
      }

      // Update comments state
      setComments((state) => {
        const existingPage = state.find((c) => c.page === currentPage);
        if (existingPage) {
          return state.map((c) =>
            c.page === currentPage
              ? { comment: response, page: currentPage }
              : c
          );
        }
        return [...state, { comment: response, page: currentPage }];
      });

      setIsLast(response.last);
    };
    fetchComments();
  }, [currentPage, showComments, refetch, postId, communityId]);

  // Delete comment
  const handleDelete = async (commentId: string) => {
    const token = Cookies.get("token");
    setIsSubmitting(true);

    const response = await deleteCommentAPI(
      communityId,
      postId,
      token,
      commentId
    );
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

    // Trigger re-fetch
    setComments([]);
    setCurrentPage(0);
    setRefetch((prev) => !prev);
    setIsSubmitting(false);
    setShowConfirm(false);
  };

  // Submit new comment
  const handleSubmitComment = async (formData: FormData) => {
    const content = formData.get("content")?.toString();
    if (!content) {
      return;
    }

    startTransition(async () => {
      const token = Cookies.get("token");
      const reqbody = { content };
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

      // Trigger re-fetch
      setComments([]);
      setCurrentPage(0);
      setRefetch((prev) => !prev);
    });
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  // Calculate total comments for display
  const totalComments = comments.reduce(
    (sum, page) => sum + (page.comment.content?.length || 0),
    0
  );

  return (
    <>
      <div className="flex items-center gap-1 self-start">
        <button onClick={() => setShowComments(true)} className="block">
          <FontAwesomeIcon
            icon={faComment}
            className="text-xl hover:text-2xl transition-all duration-200"
          />
        </button>
        <button
          onClick={() => setShowComments(true)}
          className="text-md hover:underline"
        >
          {totalComments || numberOfComments}
        </button>
      </div>
      {showComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowComments(false)}
          ></div>
          <div
            className="
              relative bg-[var(--background-color)] rounded-lg shadow-lg 
              w-[95%] sm:w-[45rem] max-w-[95%] 
              h-fit max-h-[48rem] 
              overflow-y-auto 
            "
          >
            <div className="p-6 flex justify-between items-center">
              <h3 className="text-3xl font-bold text-center px-4">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="text-gray-600 hover:text-gray-800 text-3xl"
              >
                ✖
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <ul className="list-none flex flex-col px-4 pb-5 gap-6 ">
                  {comments.map((c) =>
                    Array.isArray(c.comment.content)
                      ? c.comment.content.map((p, i) => (
                          <Comment
                            canDelete={canDelete}
                            handleDelete={() => {
                              setCommentId(p.commentId);
                              setShowConfirm(true);
                            }}
                            key={p.commentId || i}
                            i={i}
                            p={p}
                          />
                        ))
                      : null
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
                  {totalComments === 0 && (
                    <li className="text-center text-xl opacity-70">
                      No comments yet
                    </li>
                  )}
                  <div className="border-t border-solid opacity-50 border-[var(--accent-color)]"></div>
                  <form action={handleSubmitComment} className="flex gap-4 p-1">
                    <div className="w-fit self-center">
                      <div className="relative w-16 aspect-square rounded-full overflow-hidden">
                        <Image
                          src={userProfile}
                          alt="my profile"
                          fill
                          className="object-cover rounded-full overflow-hidden"
                          sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                      </div>
                    </div>
                    <div
                      className="flex w-full border-2 border-solid border-[var(--border-color)]
                      border-opacity-35 rounded-xl px-3 py-1 focus-within:border-[var(--hover-color)] transition-all ease-in-out"
                    >
                      <div className="w-full">
                        <textarea
                          rows={2}
                          name="content"
                          className="w-full resize-none focus:outline-none placeholder:text-[var(--accent-color)] bg-[var(--background-color)] placeholder:opacity-60 py-2 px-3 text-lg rounded-xl"
                          placeholder="Write something..."
                          disabled={isPending}
                        />
                      </div>
                      <div className="self-center">
                        <button
                          type="submit"
                          disabled={isPending}
                          className="bg-[var(--btn-color)] rounded-full px-4 py-2 font-semibold text-xl hover:bg-[var(--button-hover-background-color)] transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--button-hover-background-color)] disabled:hover:text-[var(--text-color)]"
                        >
                          {isPending ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <FontAwesomeIcon icon={faPaperPlane} />
                          )}
                        </button>
                      </div>
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
              <span className="text-3xl">⚠ </span> Confirm deletion
            </h3>
            <p className="whitespace-pre-wrap text-lg pb-6">
              Are you sure you want to remove this comment? This action cannot
              be undone.
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
