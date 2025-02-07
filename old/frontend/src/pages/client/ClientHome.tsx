import React from "react";
import styled from "styled-components";

// Styled components for the welcome page
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  color: #333;
  text-align: center;
  padding: 20px;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  max-width: 600px;
  line-height: 1.6;
`;

const ClientHome: React.FC = () => {
  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome to Our Platform!</WelcomeTitle>
      <WelcomeMessage>
        We're thrilled to have you here. Explore our services and make the most
        of your experience. If you have any questions, feel free to reach out to
        our support team.
      </WelcomeMessage>
    </WelcomeContainer>
  );
};

export default ClientHome;
