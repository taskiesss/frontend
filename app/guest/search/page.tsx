import { redirect } from "next/navigation";

type Props = { params: string };

export default function page({}: Props) {
  redirect("/nx/freelancer/search/jobs");
}
