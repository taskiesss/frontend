import React from "react";
import styled from "styled-components";
import Button from "../../components/common/button";
import Input from "../../components/common/Input";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7rem 3.5rem;
  /* background-color: var(--foreground-color); */
  background-color: white;
  color: var(--foreground-color);

  h1 {
    position: relative;
    margin-top: 5rem;
    font-size: 3rem;
    font-weight: bold;
    color: black;
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
  background-color: var(--foreground-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3.5rem;
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

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <Container>
        <LeftChild>
          <h1>Sign in</h1>
          <form action="">
            <Input type="email" id="email" name="email" />
            <Input type="password" id="password" name="password" />

            <Button>Sign in</Button>
          </form>
        </LeftChild>
        <RightChild>
          <img src="./images/logo_dark.png" alt="logo_light" />
          <h1>Hello, Friend!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Button>Sign up</Button>
        </RightChild>
      </Container>
    </LoginContainer>
  );
};

export default Login;
