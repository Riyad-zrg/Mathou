"use client";
import { LogOut } from "lucide-react";
import { Button } from "../button";
import { logout } from "@/src/services/auth.service";

export default function LogOutButton() {
  const onLogout = async () => {
    await logout();
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute bg-red-500 border-2 border-purple-900 text-white"
      color="red"
      onClick={onLogout}
    >
      <LogOut />
    </Button>
  );
}
