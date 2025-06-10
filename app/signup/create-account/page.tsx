/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { invariant } from "@/app/_helpers/invariant";
import { toast, ToastContainer } from "react-toastify";

const secretKey = "S3cr3tK3y@2023!ThisIsMySecureKey#";

const RightChild = styled.div`
  grid-column: 2/-1;
  background-color: var(--border-color);
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
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        setErrorMsg("");
      }, 1000);
    }
  }, [errorMsg]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const newErrors: ErrorResponse[] = [];
    // Validation using invariant for special types (username, email, password)
    try {
      invariant(username.length < 5, "Username must be at least 5 characters.");
    } catch (err: any) {
      newErrors.push({ type: "username", message: err.message });
    }

    try {
      invariant(
        password.length < 10,
        "Password must be at least 10 characters."
      );
    } catch (err: any) {
      newErrors.push({ type: "password", message: err.message });
    }
    if (newErrors.length > 0) {
      setIsSubmitting(false);
      setErrors(newErrors);
      return;
    }

    try {
      const res = await registerUser({
        username,
        email,
        password,
        role: user.role,
        profilePic: "",
        userId: "",
        newNotifications: 0,
      });

      // Error handling from api

      try {
        invariant(res?.type === "email", res.message);
      } catch (err: any) {
        newErrors.push({ type: "email", message: err.message });
      }
      try {
        invariant(res?.type === "username", res.message);
      } catch (err: any) {
        newErrors.push({ type: "username", message: err.message });
      }
      try {
        invariant(res?.type === "password", res.message);
      } catch (err: any) {
        newErrors.push({ type: "password", message: err.message });
      }

      if (newErrors.length > 0) {
        setIsSubmitting(false);
        setErrors(newErrors);
        return;
      } else {
        // Rsponse is Ok
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
      }
    } catch (err: any) {
      // console.log("error", err);
      if (err.status === "BAD_REQUEST") {
        setErrorMsg(err.message);
      } else throw err;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const role = searchParams?.get("role"); // Use the `get` method to access query parameters
    if (role) {
      dispatch(updateAuthInfo({ role }));
    } else {
      router.push("/signup/choose-role");
    }
  }, [searchParams, dispatch, router]);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <SignUp>
        <RightChild>
          <h2 className="mb-6 dark:text-white">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <Input
              isRequired={true}
              type="text"
              id="username"
              name="username"
              message={errors
                .filter((err) => err.type === "username")
                .map((err, idx) => err.message)}
              inputValue={username}
              className=""
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              isRequired={true}
              type="email"
              id="email"
              name="email"
              message={errors
                .filter((err) => err.type === "email")
                .map((err, idx) => err.message)}
              inputValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              isRequired={true}
              type="password"
              id="password"
              message={errors
                .filter((err) => err.type === "password")
                .map((err, idx) => err.message)}
              name="password"
              useStrength={true}
              inputValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="text-xl text-[--accent-color]"
              type={"submit"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </RightChild>
      </SignUp>
    </>
  );
};

export default CreateAccount;
