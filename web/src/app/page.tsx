import { cookies } from "next/headers";
import { LoginForm } from "./login-form";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const userId = cookieStore.get("@chaty:userId");

  if (userId) {
    redirect("/chats");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-sm">
        <header>
          <h1 className="text-3xl font-bold tracking-wider">Chaty</h1>
          <p className="mt-2 text-white/75">
            Um simples sistema de mensagens em tempo real. <br /> Para começar
            basta digitar um nome abaixo:
          </p>
        </header>
        <main className="mt-10">
          <LoginForm />
        </main>
      </div>
    </div>
  );
}
