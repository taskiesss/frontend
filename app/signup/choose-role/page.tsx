"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateAuthInfo } from "@/app/_store/_contexts/userSlice";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/common/button";

import freelancer from "@/public/images/freelancer.png";
import cheer from "@/public/images/cheer.png";
import Image from "next/image";
import SignUp from "../../_components/auth/Signup";

const RightChild = styled.div`
  grid-column: 2/-1;
  background-color: white;
  color: var(--foreground-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3.5rem;

  h2 {
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
  .checkbox-input {
    // Code to hide the input
    clip: rect(0 0 0 0);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    &:checked + .checkbox-tile {
      border-color: #2260ff;
      box-shadow: 0 5px 10px rgba(#000, 0.1);
      color: #2260ff;
      &:before {
        transform: scale(1);
        opacity: 1;
        background-color: #2260ff;
        border-color: #2260ff;
      }

      .checkbox-icon,
      .checkbox-label {
        color: #2260ff;
      }
    }

    &:focus + .checkbox-tile {
      border-color: #2260ff;
      box-shadow: 0 5px 10px rgba(#000, 0.1), 0 0 0 4px #b5c9fc;
      &:before {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .checkbox-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 12rem;
    min-height: 12rem;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(#000, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;

    .checkbox-img {
      width: 5rem;
    }

    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid #b5bfd9;
      background-color: #fff;
      border-radius: 50%;
      top: 0.25rem;
      left: 0.25rem;
      opacity: 0;
      transform: scale(0);
      transition: 0.25s ease;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
      background-size: 12px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    &:hover {
      border-color: #2260ff;
      &:before {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .checkbox-icon {
    transition: 0.375s ease;
    color: #494949;
    svg {
      width: 3rem;
      height: 3rem;
    }
  }

  .checkbox-label {
    font-size: 1.6rem;
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    margin-top: 1.5rem;
  }
  .checkbox-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3rem;
  }

  form {
    width: min(29rem, 35vw);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    gap: 2.5rem;
  }
`;
export default function ClientRole() {
  const [isChecked, setIsChecked] = useState([false, false]);
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setIsChecked([i === 0, i === 1]);
    setRole(e.target.dataset.role || "");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateAuthInfo({ role: role }));

    router.push(`/signup/create-account?role=${role}`);
  };
  return (
    <SignUp>
      <RightChild>
        <h2>Choose your role!</h2>
        <form onSubmit={handleSubmit} action="">
          <div className="checkbox-group">
            <div className="checkbox">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  data-role="freelancer"
                  checked={isChecked[0]}
                  onChange={(e) => toggleCheck(e, 0)}
                />
                <span className="checkbox-tile">
                  <span className="checkbox-icon">
                    <Image
                      src={freelancer}
                      alt="Freelancer"
                      className="checkbox-img"
                    />
                  </span>
                  <span className="checkbox-label">Freelancer</span>
                </span>
              </label>
            </div>
            <div className="checkbox">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={isChecked[1]}
                  data-role="client"
                  onChange={(e) => toggleCheck(e, 1)}
                />
                <span className="checkbox-tile">
                  <span className="checkbox-icon">
                    <Image src={cheer} alt="Cheer" className="checkbox-img" />
                  </span>
                  <span className="checkbox-label">Client</span>
                </span>
              </label>
            </div>
          </div>
          <Button
            className="text-xl"
            type="submit"
            disabled={!(isChecked[0] || isChecked[1])}
          >
            Submit
          </Button>
        </form>
      </RightChild>
    </SignUp>
  );
}
