"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  message: string;
};

export default function ProtectedPage({ message }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Save the message in localStorage
    localStorage.setItem("toastMessage", message);
    router.push("/login");
  }, [message, router]);

  return null;
}
