import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/common/button";
import Input from "../../components/common/Input";
import { otpVerify, sendOTP } from "../../services/Auth/Auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const OTPContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 3.5rem;
  background-color: var(--foreground-color);
  justify-content: center;

  img {
    max-width: 15rem;
  }
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
    }
  }
`;

const VerificationOTP: React.FC = () => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const otpVal = values.join("");
  const user = useSelector((state: RootState) => state.user.currentUser);
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
    // Define an inner async function
    const sendOtp = async () => {
      try {
        const res = await sendOTP(user);
        console.log("SendOTP response", res);
      } catch (error) {
        // handle or log error
        console.error(error);
      }
    };
    // Invoke it right away
    sendOtp();
  }, []);

  useEffect(() => {
    // Define an inner async function
    const verifyOtp = async () => {
      // Only proceed if the length is 6
      if (otpVal.length === 6) {
        try {
          const res = await otpVerify(user, otpVal);
          console.log("OTP response", res);
        } catch (error) {
          // handle or log error
          console.error(error);
        }
      }
    };

    // Invoke it right away
    verifyOtp();
  }, [otpVal, user]);

  return (
    <OTPContainer>
      <Container>
        <LeftChild>
          <img src="/images/logo_dark.png" alt="logo_light" />
        </LeftChild>
        <RightChild>
          <h1>Verify with OTP</h1>
          <p>
            To ensure your security, please enter the One-Time Password(OTP)
            sent to your registered email below
          </p>
          <form action="">
            <div className="otp-input">
              {values.map((value, index) => (
                <Input
                  type="text"
                  id={"op" + index}
                  className={"text-center"}
                  fontSize="2rem"
                  onChange={(e) => goToNext(index, e)}
                  inputValue={value}
                  ref={(el: HTMLInputElement) =>
                    (inputRefs.current[index] = el)
                  }
                />
              ))}
            </div>

            <Button>Sign up</Button>
          </form>
        </RightChild>
      </Container>
    </OTPContainer>
  );
};

export default VerificationOTP;
