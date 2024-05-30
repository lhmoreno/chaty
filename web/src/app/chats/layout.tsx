import type { Metadata } from "next";
import { ChatsList } from "./chats-list";

export const metadata: Metadata = {
  title: "Meus chats - Chaty",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <ChatsList />
      {children}
    </main>
  );
}
