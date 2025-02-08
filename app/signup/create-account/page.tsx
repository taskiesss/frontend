/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import Input from "@/app/_components/common/Input";
import Button from "@/app/_components/common/button";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { updateAuthInfo } from "@/app/_store/_contexts/userSlice";
import { RootState } from "@/app/_store/store";
import { useRouter, useSearchParams } from "next/navigation";
import { ErrorResponse } from "@/app/_types/Error";
import { registerUser } from "@/app/_lib/Auth/Auth";
import SignUp from "@/app/_components/auth/Signup";

const secretKey = "S3cr3tK3y@2023!ThisIsMySecureKey#";

const RightChild = styled.div`
  grid-column: 2/-1;
  background-color: white;
  color: var(--foreground-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3.5rem;

  h2 {
    position: relative;
    margin-top: 5rem;
    font-size: 3rem;
    font-weight: bold;
    color: black;
    &::after {
      content: "";
      position: absolute;
      bottom: -1rem;
      left: -12.5%;
      width: 125%;
      height: 0.1rem;
      background-color: currentColor;
    }
  }

  form {
    width: min(29rem, 35vw);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CreateAccount: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    // Basic validation checks
    if (username.length < 5) {
      setErrors((errors) => [
        ...errors,
        {
          type: "username",
          message: "Username must be at least 5 characters.",
        },
      ]);
      setIsSubmitting(false);
      return;
    }
    if (password.length < 10) {
      setErrors((errors) => [
        ...errors,
        {
          type: "password",
          message: "Password must be at least 10 characters.",
        },
      ]);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await registerUser({
        username,
        email,
        password,
        role: user.role,
      });

      // console.log(res);
      dispatch(updateAuthInfo({ username, email, password }));

      // Encryption
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify({ username, email, password, role: user.role }),
        secretKey
      ).toString();

      // Encode the encrypted string to make it URL-safe
      const encodedUser = encodeURIComponent(encryptedUser);

      // Navigate to the next page with the encrypted user in the URL
      router.push(`/signup/verify?user=${encodedUser}`);
    } catch (err) {
      if (err instanceof Error) {
        try {
          const errorData: ErrorResponse[] = JSON.parse(err.message);
          console.log(errorData);
          setErrors(errorData);
        } catch (e) {
          setErrors([{ type: "unknown", message: err.message }]);
        }
      } else {
        setErrors([{ type: "unknown", message: "An unknown error occurred." }]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const role = searchParams?.get("role"); // Use the `get` method to access query parameters
    if (role) {
      dispatch(updateAuthInfo({ role }));
    }
  }, [searchParams, dispatch]);

  return (
    <SignUp>
      <RightChild>
        <h2 className="mb-6">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="name"
            name="name"
            inputValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="email"
            id="email"
            name="email"
            inputValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            id="password"
            name="password"
            inputValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type={"submit"} disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </RightChild>
    </SignUp>
  );
};

export default CreateAccount;
