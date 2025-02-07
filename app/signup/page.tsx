import { redirect } from "next/navigation";

export default function SignUpPage() {
  // Redirect to /signup/choose-role
  redirect("/signup/choose-role");
}
