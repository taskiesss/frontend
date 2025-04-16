"use client";
import { deletePost } from "@/app/_lib/CommunityProfile/Posts";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProtectedPage from "../../common/ProtectedPage";

type Props = {
  communityId: string;
  postId: string;
};

function DeletePostButton({ postId, communityId }: Props) {
  const [isForbidden, setIsForbidden] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (showConfirm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showConfirm]);

  const handleDelete = async (postId: string) => {
    const token = Cookies.get("token");
    setIsSubmitting(true);
    const response = await deletePost(postId, communityId, token);
    if (response.error) {
      if (
        response.error === "Forbidden" ||
        response.error === "Unauthorized user"
      ) {
        setIsForbidden(true);
        return;
      }
      console.error(response.error);
    }
    setIsSubmitting(false);
    setShowConfirm(false);
  };

  if (isForbidden) {
    return (
      <ProtectedPage message="You are not allowed to do this action. Please log in again" />
    );
  }

  return (
    <>
      {/* delete button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="absolute self-start right-4 opacity-70 hover:opacity-100 transition-opacity"
      >
        <FontAwesomeIcon icon={faTrash} className="text-lg" />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[var(--background-color)] p-6 rounded-lg border-[var(--border-color)] border-solid border-2 max-w-xl w-full">
            <h3 className="text-2xl font-bold text-red-500 pb-4">
              <span className="text-3xl">⚠{"  "}</span> Confirm deletion
            </h3>
            <p className="whitespace-pre-wrap text-lg pb-6">
              Are you sure you want to do remove this post ? This action cannot
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
                onClick={() => handleDelete(postId)}
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

export default DeletePostButton;
