import React from "react";
import styled from "styled-components";
import Button from "../../components/common/button";
import Input from "../../components/common/input";

const SignUpContainer = styled.div`
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
      bottom: -2rem;
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
  }
`;

const SignUp: React.FC = () => {
  return (
    <SignUpContainer>
      <Container>
        <LeftChild>
          <img src="./images/logo_dark.png" alt="logo_light" />
          <h1>Welcome Back !</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Button>Sign in</Button>
        </LeftChild>
        <RightChild>
          <h1>Create Account</h1>
          <form action="">
            <Input type="text" id="name" name="name" />
            <Input type="email" id="email" name="email" />
            <Input type="password" id="password" name="password" />

            <Button>Sign up</Button>
          </form>
        </RightChild>
      </Container>
    </SignUpContainer>
  );
};

export default SignUp;
