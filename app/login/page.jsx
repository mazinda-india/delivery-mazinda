"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-[70vh] flex items-center justify-center">
      <form
        className="flex flex-col items-center bg-white p-4 rounded-xl border"
        onSubmit={handleLogin}
      >
        <p>Only resgistered yser of this website can access this webpage</p>
        <div>
          <label>
            <input
              type="text"
              className="rounded-md my-1 bg-muted"
              value={phone}
              placeholder="
              Mobile No."
              onChange={(e) => setPhone(e.target.value)}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="bg-[#F17E13] py-2 px-5 text-white shadow-md shadow-[#F17E13] mt-3 rounded-lg"
        >
          Login
        </button>
        <Link href={"/signup"} className="mt-3">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
