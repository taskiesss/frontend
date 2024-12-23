import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  position: relative; /* Ensure label is positioned relative to this container */
  width: 100%;
  margin: 1.1rem 0 1.3rem 0;

  & > input {
    background-color: var(--hover-color);
    color: var(--accent-color);
    font-size: 1.1rem;
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
      top: 0.75rem; /* Moves the label above the input */
      font-size: 0.75rem; /* Smaller font size */
      color: var(--accent-color); /* Highlight color */
    }
  }

  & > label {
    position: absolute; /* Position relative to .input-container */
    top: 50%;
    left: 1rem;

    transform: translateY(-50%);
    font-size: 1rem;
    color: #fafafaab;
    transition: all 0.3s ease;
    pointer-events: none;
  }
`;

interface InputProps {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
}
const Input: React.FC<InputProps> = ({ type, id, name, placeholder = " " }) => {
  const [passVisible, setPassVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPassVisible((p) => !p);
  };
  return (
    <StyledInputContainer>
      <input
        type={passVisible ? "text" : type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {type === "password" ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={passVisible ? faEyeSlash : faEye} />
        </button>
      ) : null}
    </StyledInputContainer>
  );
};
export default Input;
