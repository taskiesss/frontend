/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/app/_components/common/button";
import Input from "@/app/_components/common/Input";
import { otpVerify, sendOTP } from "@/app/_lib/Auth/Auth";
import { updateAuthInfo } from "@/app/_store/_contexts/userSlice";
import { RootState } from "@/app/_store/store";
import CryptoJS from "crypto-js";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const OTPContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 6rem auto 0 auto;
  width: clamp(10rem, 94rem, 85vw);
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  border-radius: 2rem;
  box-shadow: 0rem 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LeftChild = styled.div`
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 3.5rem;
  background-color: var(--foreground-color);
  justify-content: flex-start;
`;

interface StyledImageProps {
  $shouldAnimate: boolean;
  $moveDistance: number;
}

const StyledImage = styled.img<StyledImageProps>`
  max-width: 15rem;
  height: auto;
  transition: transform 2s ease-in-out;
  transform: ${(props) =>
    props.$shouldAnimate
      ? `translateY(${props.$moveDistance}px)`
      : "translateY(0)"};
`;

const RightChild = styled.div`
  grid-column: 2/-1;
  background-color: white;
  color: var(--foreground-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3.5rem;

  h1 {
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

  p {
    text-align: center;
    color: #666666;
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 2rem 0 1.5rem 0;
    max-width: 30rem;

    strong {
      color: #333333;
      font-weight: 500;
    }
  }

  form {
    width: min(29rem, 35vw);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .otp-input {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }
  }
`;

const VerificationOTP: React.FC = () => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [moveDistance, setMoveDistance] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const otpVal = values.join("");
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const goToNext = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
    if (event.target.value.length === 1) {
      event.target.blur();
      if (index !== 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  useEffect(() => {
    if (imageRef.current && containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const containerPaddingTop = parseFloat(
        window.getComputedStyle(containerRef.current).paddingTop
      );
      const containerPaddingBottom = parseFloat(
        window.getComputedStyle(containerRef.current).paddingBottom
      );
      const imageHeight = imageRef.current.offsetHeight;

      const effectiveContainerHeight =
        containerHeight - containerPaddingTop - containerPaddingBottom;

      const distance = (effectiveContainerHeight - imageHeight) / 2;
      setMoveDistance(distance);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnimate(true);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const onClick = async () => {
    try {
      setIsSubmitting(true);
      setSeconds(30);
      const res = await sendOTP(currentUser);
      console.log("SendOTP response", res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (hasInitialized.current) return;

    const hasSentOtp = document.cookie.includes("hasSentOtp=true");
    if (hasSentOtp) return;

    const sendOtp = async () => {
      try {
        console.log("Sending OTP");
        const res = await sendOTP(currentUser);
        console.log("SendOTP response", res);
        document.cookie = "hasSentOtp=true; path=/; max-age=300";
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      hasInitialized.current = true;
      sendOtp();
    }
  }, [currentUser]);

  useEffect(() => {
    let timer: number;

    if (isSubmitting && seconds > 0) {
      timer = window.setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsSubmitting(false);
    }

    return () => window.clearInterval(timer);
  }, [isSubmitting, seconds]);

  useEffect(() => {
    const verifyOtp = async () => {
      if (otpVal.length === 6) {
        try {
          const res = await otpVerify(currentUser, otpVal);
          if (res) {
            console.log("OTP verified successfully:", res);
            router.push("/home");
          }
        } catch (error: any) {
          console.error("Error verifying OTP:", error);
        }
      }
    };

    verifyOtp();
  }, [otpVal, currentUser, router]);

  useEffect(() => {
    const encryptedUser = searchParams.get("user");

    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedUser),
          "S3cr3tK3y@2023!ThisIsMySecureKey#"
        );
        const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        console.log("Decrypted User:", decryptedUser);

        dispatch(updateAuthInfo(decryptedUser));
      } catch (error) {
        console.error("Error decrypting user:", error);
      }
    }
  }, [searchParams, dispatch]);

  return (
    <OTPContainer>
      <Container>
        <LeftChild ref={containerRef}>
          <StyledImage
            ref={imageRef}
            src="/images/logo_dark.png"
            alt="logo_light"
            $shouldAnimate={animate}
            $moveDistance={moveDistance}
          />
        </LeftChild>
        <RightChild>
          <h1>Verify with OTP</h1>
          <p>
            To ensure your security, please enter the One-Time Password (OTP)
            sent to your <strong>registered email</strong> below
          </p>
          <form action="">
            <div className="otp-input">
              {values.map((value, index) => (
                <Input
                  key={index}
                  type="text"
                  id={`otp${index}`}
                  className="text-center"
                  fontSize="2rem"
                  onChange={(e) => goToNext(index, e)}
                  inputValue={value}
                  ref={(el: HTMLInputElement | null) => {
                    if (el) {
                      inputRefs.current[index] = el;
                    }
                  }}
                />
              ))}
            </div>
            <Button onClick={onClick} disabled={isSubmitting}>
              {isSubmitting ? `Resend OTP in ${seconds}s` : "Resend OTP"}
            </Button>
          </form>
        </RightChild>
      </Container>
    </OTPContainer>
  );
};

export default VerificationOTP;
