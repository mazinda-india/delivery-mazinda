"use client";

import Link from "next/link";

import { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-[70vh] flex items-center justify-center ">
      <form
        className="flex flex-col items-center bg-white p-8 rounded-xl border "
        onSubmit={handleSignup}
      >
        <p>Please signup</p>
        <div>
          <label>
            <input
              type="text"
              className="rounded-md my-1 bg-muted"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              className="rounded-md my-1 bg-muted"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              className="rounded-md my-1 bg-muted"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="text"
              className="rounded-md my-1 bg-muted"
              value={phone}
              placeholder="Mobile No."
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="bg-[#F17E13] py-2 px-5 text-white shadow-md shadow-[#F17E13] mt-3 rounded-lg"
        >
          SignUp
        </button>
        <Link href={"/login"} className="mt-3">
          Go To Login
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
