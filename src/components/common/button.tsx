import { ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  /* position: relative;
  padding: 1rem 3rem;
  border-radius: 1rem;
  background-color: transparent;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    border-radius: 1rem;
    background-color: var(--button-hover-background-color);
    box-shadow: 0 0 1rem var(--button-hover-background-color);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover::after {
    opacity: 1;
  } */

  font-size: 1.5rem;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  border: var(--button-hover-background-color) 0.125em solid;
  padding: 0.25em 1em;
  border-radius: 0.25em;

  box-shadow: inset 0 0 0.5em 0 var(--button-hover-background-color),
    0 0 0.5em 0 var(--button-hover-background-color);

  position: relative;
  z-index: 1;

  /* Ensure ::after respects button's position */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 1em 0.25em var(--button-hover-background-color);
    opacity: 0; /* Start with opacity 0 */
    background-color: var(--button-hover-background-color);
    z-index: -1; /* Place it behind the button */
    transition: opacity 0.3s ease; /* Smooth transition for opacity */
  }

  &:hover::after {
    opacity: 1; /* Make it visible on hover */
  }

  &:disabled {
    cursor: not-allowed; /* Change cursor to indicate it's disabled */
    opacity: 0.6; /* Reduce opacity to give a "disabled" look */
    border-color: var(
      --button-disabled-border-color,
      #ccc
    ); /* Muted border color */
    background-color: var(
      --button-disabled-background-color,
      #f2f2f2
    ); /* Muted background */
    color: var(--button-disabled-text-color, #aaa); /* Muted text color */
    box-shadow: none; /* Remove shadow effects */
    &:disabled::after {
      display: none; /* Remove hover effects for disabled buttons */
    }
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  onClick,
  disabled,
}) => {
  return (
    <StyledButton type={type || "button"} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
export default Button;
