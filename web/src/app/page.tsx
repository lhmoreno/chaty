"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const nickname = localStorage.getItem("nickname");

    if (nickname) {
      router.push("/chat");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nickname = formData.get("nickname")?.toString();

    if (nickname && nickname.length > 3) {
      localStorage.setItem("nickname", nickname);
      router.push("/chat");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <form onSubmit={handleSubmit}>
        <Input
          name="nickname"
          type="text"
          placeholder="Digite um nick maneiro"
          className="max-w-lg"
        />
      </form>
    </main>
  );
}
