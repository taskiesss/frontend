"use client";

import React, { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const StyledInputContainer = styled.div<{ fontSize?: string }>`
  position: relative;
  width: 100%;
  margin: 1.1rem 0 1.3rem 0;

  & > input {
    background-color: var(--hover-color);
    color: var(--accent-color);
    /* fallback font-size of 1.1rem if no prop is passed */
    font-size: ${(props) => props.fontSize || "1.1rem"};
    width: 100%;
    padding: 1.5rem 1rem 0.5rem 1rem;
    border-bottom: 0.25rem var(--btn-color) solid;
    position: relative;

    &:focus-visible {
      box-shadow: none;
      outline: none;
      border-color: #22200d;
    }

    &:focus-visible + label,
    &:not(:placeholder-shown) + label {
      top: 0.75rem;
      font-size: 0.75rem;
      color: var(--accent-color);
    }
  }

  & > label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #fafafaab;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  /* Simple style for the strength indicator */
  .strength-indicator {
    margin-top: 0.45rem;
    font-size: 0.9rem;
    color: #fafafaab; /* default color */
    &.weak {
      color: #f87171; /* red-400 */
    }
    &.medium {
      color: #fbbf24; /* amber-400 */
    }
    &.strong {
      color: #4ade80; /* green-400 */
    }
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  id: string;
  name?: string;
  fontSize?: string;
  inputValue?: string;
}

/* Example function to calculate password strength */
function getPasswordStrength(
  password: string
): "weak" | "medium" | "strong" | "" {
  if (!password) return "";

  let score = 0;

  // 1) Increase score for length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // 2) Increase score if password has an uppercase letter
  if (/[A-Z]/.test(password)) score++;

  // 3) Increase score if password has a digit
  if (/\d/.test(password)) score++;

  // 4) Increase score if password has a special character
  if (/[!@#$%^&*(),.?":{}|<>_\\-]/.test(password)) score++;

  // Basic scoring logic (tweak as you like)
  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      name = "",
      placeholder = " ",
      className = "",
      fontSize,
      inputValue,
      onChange,
      ...rest
    },
    ref
  ) => {
    // Only track password strength if it's a password field
    const [strength, setStrength] = useState<"" | "weak" | "medium" | "strong">(
      ""
    );

    const [passVisible, setPassVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPassVisible((prev) => !prev);
    };

    // Custom onChange handler to intercept password input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // If the parent also passed an onChange, call it
      if (onChange) {
        onChange(e);
      }

      // If this is a password field, compute the strength
      if (type === "password") {
        const inputVal = e.target.value;
        setStrength(getPasswordStrength(inputVal));
      }
    };

    return (
      <StyledInputContainer fontSize={fontSize}>
        <input
          ref={ref}
          className={className}
          type={passVisible ? "text" : type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          {...rest}
        />
        <label htmlFor={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>

        {/* If this is a password field, render the toggle and strength meter */}
        {type === "password" && (
          <>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "1rem",
                top: "2rem",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={passVisible ? faEyeSlash : faEye} />
            </button>
          </>
        )}
        {/* Strength indicator only if user typed something */}
        {strength && (
          <div className={`strength-indicator ${strength}`}>
            Password strength: {strength}
          </div>
        )}
      </StyledInputContainer>
    );
  }
);

// Set the displayName property
Input.displayName = "Input";

export default Input;
