/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "@/app/_components/common/button";
import Input from "@/app/_components/common/Input";

import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import { ErrorResponse } from "../_types/Error";
import { Login } from "@/app/_lib/Auth/Auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Cookies from "js-cookie";
import { invariant } from "../_helpers/invariant";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6rem auto 0 auto;
  width: clamp(10rem, 94rem, 95vw);
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem auto 0 auto;
  }
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  border-radius: 2rem;
  box-shadow: 0rem 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const LeftChild = styled.div`
  grid-column: 1 / span 1;
  background-color: white;
  color: var(--foreground-color);
  background-color: var(--border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3.5rem;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 2;
    padding: 2rem 1.5rem;
  }

  h1 {
    position: relative;
    margin-top: 5rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: bold;
    color: var(--accent-color);
    text-align: center;
    &::after {
      content: "";
      position: absolute;
      bottom: -1rem;
      left: -12.5%;
      width: 125%;
      height: 0.1rem;
      background-color: currentColor;
    }

    @media (max-width: 768px) {
      margin-top: 2rem;
    }
  }

  form {
    width: min(29rem, 90%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }
`;

const RightChild = styled.div`
  grid-column: 2/-1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 3.5rem;
  background-color: var(--foreground-color);

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: 1;
    padding: 3rem 1.5rem;
  }

  img {
    max-width: clamp(10rem, 20vw, 15rem);
    height: auto;
  }

  h1 {
    position: relative;
    margin-top: 5rem;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: bold;
    text-align: center;

    @media (max-width: 768px) {
      margin-top: 2rem;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: -12.5%;
      width: 125%;
      height: 0.1rem;
      background-color: currentColor;
    }
  }

  p {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    margin-top: 1.6rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 2.5rem;
    padding: 0 1rem;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const router = useRouter();

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

    try {
      const res = await Login(email, password);

      // Error handling from API
      try {
        invariant(res?.type === "email", res?.message);
      } catch (error: any) {
        newErrors.push({ type: "email", message: error.message });
      }
      try {
        invariant(res?.type === "password", res?.message);
      } catch (error: any) {
        newErrors.push({ type: "password", message: error.message });
      }
      if (newErrors.length > 0) {
        setIsSubmitting(false);
        setErrors(newErrors);
        return;
      }
      if (res.token) {
        Cookies.set("token", res.token, {
          // expires: 1 / 48, // 30 minutes expiry
          expires: 1, // 1 day expiry
          secure: true, // Send cookie over HTTPS only
          sameSite: "strict", // Restrict cookie to same-site requests
          path: "/", // Available on the entire site
          // domain: 'yourdomain.com' // Optionally restrict to a specific domain
        });

        // Navigate to the next page with the encrypted user in the URL
        if (res?.isFirst && res?.role?.toLowerCase() === "freelancer") {
          router.push(`/nx/freelancer/freelancer-form`);
        } else {
          router.push(`/nx/${res?.role?.toLowerCase()}`);
        }
      }
    } catch (err: any) {
      if (err.status === "BAD_REQUEST") {
        setErrorMsg(err.message);
      } else {
        throw err.message;
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) Cookies.remove("token");
    const msg = localStorage.getItem("toastMessage");
    if (msg) {
      toast.error(msg, { autoClose: 5000 });
      // Delay removal of the toast message from localStorage by 1 second
      setTimeout(() => {
        localStorage.removeItem("toastMessage");
      }, 1000);
    }
  }, []);

  return (
    <LoginContainer>
      <div>
        <ToastContainer />
      </div>
      <Container>
        <LeftChild>
          <h1 className=" mb-6">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <Input
              message={errors
                .filter((err) => err.type === "email")
                .map((err, idx) => err.message)}
              isRequired={true}
              type="email"
              id="email"
              name="email"
              inputValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              message={errors
                .filter((err) => err.type === "password")
                .map((err, idx) => err.message)}
              isRequired={true}
              type="password"
              id="password"
              name="password"
              inputValue={password}
              useStrength={false}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              className="text-[var(--accent-color)]"
              type={"submit"}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wait..." : "Sign in"}
            </Button>
          </form>
        </LeftChild>
        <RightChild>
          <Link href={"/"}>
            <Image src={logo_dark} alt="logo_light" />
          </Link>
          <h1>Hello, Friend!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Button className="text-xl">
            <Link href="/signup">Sign up</Link>
          </Button>
        </RightChild>
      </Container>
    </LoginContainer>
  );
};

export default LoginPage;
