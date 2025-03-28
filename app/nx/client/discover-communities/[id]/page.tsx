"use server";
import { redirect } from "next/navigation";

type Props = { params: { id: string } };

export default async function RedirectPage({ params }: Props) {
  const { id } = await Promise.resolve(params);
  redirect(`${id}/about`); // Default redirect to /about
}
