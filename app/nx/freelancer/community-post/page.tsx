// app/create-community/page.tsx
import CommunityPostForm from "@/app/_components/Community/PostCommunityForm/PostForm";
import { cookies } from "next/headers";

// Mark the page as async to use await
export default async function Page() {
  // Await the cookies() promise
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return <CommunityPostForm token={token} />;
}
