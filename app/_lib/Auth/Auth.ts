/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiErrorResponse, ErrorResponse } from "../../_types/Error";
import { User } from "../../_types/User";

const BASE_URL = "http://localhost:8080";
export async function registerUser(user: User): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/signup/create-account`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiErrorResponse = await res.json();

    if (!res.ok) {
      // Extract the array of errors from the response
      const errors = data.errors || [
        { type: "unknown", message: "Registration failed" },
      ];
      throw new Error(JSON.stringify(errors));
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      try {
        const errors: ErrorResponse[] = JSON.parse(error.message);
        throw new Error(JSON.stringify(errors));
      } catch (e: any) {
        // If parsing fails, throw a generic error
        throw new Error(
          JSON.stringify([{ type: "unknown", message: e.message }])
        );
      }
    } else {
      throw new Error(
        JSON.stringify([
          {
            type: "unknown",
            message: "An unknown error occurred during Registering.",
          },
        ])
      );
    }
  }
}

export async function otpVerify(user: User, otp: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/signup/verify`, {
      method: "POST",
      body: JSON.stringify({ ...user, otp }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data || "Registeration failed");
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during Registering.");
    }
  }
}

export async function sendOTP(user: User): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/signup/send-otp`, {
      method: "POST",
      body: JSON.stringify({ ...user }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data || "Failed sending OTP");
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during sending OTP.");
    }
  }
}

export async function Login(email: string, password: string) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data || "Try different email or password.");
    }

    return data; //token and role
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during login process.");
    }
  }
}
