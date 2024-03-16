"use client";
import React, { useEffect, useState } from "react";
import Available from "./Available";

export default function UserDetails() {
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    async function getMe() {
      try {
        const res = await fetch("/api/delivery/me", { cache: "no-cache" });
        const data = await res.json();
        if (data.success) {
          setDecoded(data.decoded);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getMe();
  }, []);
  return (
    <div className="flex justify-center items-center gap-5 mb-2">
      {decoded && <span>Welcome, {decoded.name}!</span>}
      {decoded && <Available id={decoded.id} />}
    </div>
  );
}
