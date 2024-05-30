"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function LoginForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nickname = formData.get("nickname")?.toString();

    if (nickname && nickname.length > 3) {
      await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name: nickname }),
      });

      router.push("/chats");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="nickname">Nickname</Label>
        <Input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="Seja criativo!"
          className="max-w-lg"
        />
      </div>
      <Button className="mt-3 w-full" type="submit">
        Entrar
      </Button>
    </form>
  );
}
