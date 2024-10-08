"use client";

import { signIn } from "next-auth/react";
import Logo from "../features/navigation/Logo";
import GoogleIcon from "./GoogleIcon";

const SignIn = () => {
  const handleEmailLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Email and password authentication is not yet implemented...");
  };

  const handleGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn("google");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Logo width={170} />
        </div>
        <h1 className="text-3xl font-semibold">Sign in to your account</h1>
        <div className="mt-2 text-md">
          or{" "}
          <a href="/signup" className="font-semibold">
            create an account
          </a>
        </div>
        <div className="mt-8 text-left">
          <form className=" flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm">Email address</label>
              <input
                className="bg-yellow-100 p-2 text-sm rounded-lg border-2 border-slate-200 shadow-sm"
                id="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm">Password</label>
              <input
                className="bg-yellow-100 p-2 text-sm rounded-lg border-2 border-slate-200 shadow-sm"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="cursor-not-allowed bg-black text-white rounded-lg p-2"
              onClick={handleEmailLogin}
            >
              Log in
            </button>
            <button
              type="submit"
              className="relative bg-black text-white rounded-lg px-2 py-1 shadow-md w-full"
              onClick={handleGoogleLogin}
            >
              <div className="flex flex-row items-center">
                <GoogleIcon />
                <div className="flex justify-center w-full">
                  Sign in with Google
                </div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
