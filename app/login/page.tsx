"use client";
import React, { useState } from "react";
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

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  margin: 6rem auto 0 auto; /* Center the container on the page with auto margins */
  width: clamp(10rem, 94rem, 85vw); /* Limit the width of the container */
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  border-radius: 2rem;
  box-shadow: 0rem 0.4rem 0.6rem rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  overflow: hidden;
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

  h1 {
    position: relative;
    margin-top: 5rem;
    font-size: 3rem;
    font-weight: bold;
    color: var(--accent-color);
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
const RightChild = styled.div`
  grid-column: 2/-1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 3.5rem;
  background-color: var(--foreground-color);

  img {
    max-width: 15rem;
  }
  h1 {
    position: relative;
    margin-top: 5rem;
    font-size: 3rem;
    font-weight: bold;

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
    font-size: 1.5rem;
    margin-top: 1.6rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 2.5rem;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      const res = await Login(email, password);

      if (res.token)
        Cookies.set("token", res.token, {
          expires: 1 / 48, // 30 minutes expiry
          secure: true, // Send cookie over HTTPS only
          sameSite: "strict", // Restrict cookie to same-site requests
          path: "/", // Available on the entire site
          // domain: 'yourdomain.com' // Optionally restrict to a specific domain
        });

      // document.cookie = `jwtToken=${res.token}; Path=/; Secure; HttpOnly; SameSite=Strict`;

      // Navigate to the next page with the encrypted user in the URL
      if (res.isFirst) {
        router.push(`/freelancer-form`);
      } else {
        router.push(`/home?type=${res.role}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        try {
          const errorData: ErrorResponse[] = JSON.parse(err.message);
          console.log(errorData);
          setErrors(errorData);
        } catch (e) {
          setErrors([{ type: "unknown", message: e.message }]);
        }
      } else {
        setErrors([{ type: "unknown", message: "An unknown error occurred." }]);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <LoginContainer>
      <Container>
        <LeftChild>
          <h1 className=" mb-6">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <Input
              isRequired={true}
              type="email"
              id="email"
              name="email"
              inputValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
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
          <Image src={logo_dark} alt="logo_light" />
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
