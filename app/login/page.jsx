"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import Logo from "@/public/logo_mazinda.png";

const LoginPage = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      <Image src={Logo} height={40} className="my-5" />
      <form
        className="flex flex-col items-center bg-white p-4 rounded-xl border w-1/4 gap-2"
        onSubmit={handleLogin}
      >
        <span className="text-xl">Delivery Person Login</span>

        <Input
          type="text"
          value={phone}
          placeholder="
              Mobile No."
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <Button className="w-full my-4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="bg-[#F17E13] w-full my-4">
            Login
          </Button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
