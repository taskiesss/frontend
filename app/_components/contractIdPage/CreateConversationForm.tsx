// /app/components/contracts/CreateConversationForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createContractConversation } from "@/app/_lib/ContractsAPi/contractConversationsApi";
import Cookies from "js-cookie";

interface CreateConversationFormProps {
  contractId: string;
}

export default function CreateConversationForm({
  contractId,
}: CreateConversationFormProps) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const token = Cookies.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    try {
      console.log(content);
      await createContractConversation(contractId, content, token);
      setContent("");
      router.refresh(); // Optional: refresh to show updated list
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message here..."
        className="w-full p-3 border border-gray-300 rounded-md resize-none bg-[var(--foreground-color)]"
        rows={4}
      />
      <button
        type="submit"
        className="self-start px-6 py-2 bg-[var(--btn-color)] rounded-md hover:bg-[var(--hover-color)] transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
