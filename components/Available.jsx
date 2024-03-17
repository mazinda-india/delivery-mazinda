"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

export default function Available({ id }) {
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    async function getInitial() {
      try {
        const response = await fetch("/api/delivery", { cache: "no-cache" });

        const data = await response.json();
        if (data.success) {
          setIsAvailable(data.isAvailable);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getInitial();
  }, []);
  const handleSwitchToggle = async () => {
    try {
      setIsAvailable(!isAvailable);

      const res = await axios.put("/api/delivery", {
        isAvailable: !isAvailable,
        id: id,
      });
      if (res.data.success) {
        alert("Updated");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error toggling :", error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={isAvailable} onCheckedChange={handleSwitchToggle} />
      <Label htmlFor="available-mode">
        {isAvailable ? "Available" : "Unavailable"}
      </Label>
    </div>
  );
}
