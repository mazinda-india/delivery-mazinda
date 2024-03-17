"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        <p>Only registered user of this website can access this webpage</p>
        <div>
          <Input
            type="text"
            value={phone}
            placeholder="
              Mobile No."
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          {/* <label> */}
          <Input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* </label> */}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button type="submit" className="bg-[#F17E13]">
          Login
        </Button>
        <Link href={"/signup"} className="mt-3">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
