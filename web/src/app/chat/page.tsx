"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

type User = {
  id: string;
  nickname: string;
};

type Users = {
  [socketId: string]: string;
};

type Chat = {
  user: User;
  messages: Message[];
};

type Message = {
  fromId: string;
  text: string;
};

export default function Chat() {
  const [users, setUsers] = useState<User[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatActive, setChatActive] = useState<Chat>();
  const socket = useRef<Socket>();

  const router = useRouter();

  useEffect(() => {
    const nickname = localStorage.getItem("nickname");

    if (!nickname) return router.push("/");

    const mySocket = io("http://localhost:3333");
    console.log(mySocket.connected);

    socket.current = mySocket;

    mySocket.on("users", (usersData: Users) => {
      const data: User[] = Object.entries(usersData)
        .map(([id, nick]) => ({
          id,
          nickname: nick,
        }))
        .filter((user) => user.id !== mySocket.id);

      setUsers(data);
    });

    mySocket.on("messages-to-receive", (data: any) => {
      console.log(data);
    });

    return () => {
      mySocket.disconnect();
    };
  }, [router, chatActive]);

  useEffect(() => {
    const usersIds = users.map((u) => u.id);

    setChats((b) => {
      let list = [...b];

      if (b.length < users.length) {
        const chatUsersIds = list.map((c) => c.user.id);

        const newUsers = users.filter(
          (user) => !chatUsersIds.includes(user.id)
        );
        const newChats: Chat[] = newUsers.map((user) => ({
          user,
          messages: [],
        }));

        list = [...list, ...newChats];
      } else {
        list.filter((chat) => usersIds.includes(chat.user.id));
      }

      return list;
    });
  }, [users]);

  function handleChangeChatActive(userId: string) {
    setChatActive(chats.find((chat) => chat.user.id === userId));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const message = formData.get("message")?.toString();

    if (message && message.length > 3) {
      const body = {
        to: chatActive?.user.id,
        text: message,
      };
      socket.current?.emit("messages-to-send", body);
      setChatActive((b) => {
        if (b) {
          return {
            ...b,
            messages: [
              ...b.messages,
              {
                fromId: socket.current?.id ?? "",
                text: message,
              },
            ],
          };
        } else {
          return b;
        }
      });

      document.querySelector<HTMLInputElement>('input[name="message"]').value =
        "";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex w-full max-w-5xl border border-border rounded-xl p-2">
        <div className="flex-col gap-3 pr-2 border-r border-border">
          {users.map((user, index) => (
            <Button
              key={user.id}
              disabled={chatActive?.user.id === user.id}
              onClick={() => handleChangeChatActive(user.id)}
            >
              {user.nickname}
            </Button>
          ))}
        </div>
        {chatActive ? (
          <div className="flex-1 p-5">
            <div className="flex flex-col gap-2">
              {chatActive.messages.map((message, index) => {
                if (message.fromId) {
                  return (
                    <div
                      key={index}
                      className="py-0.5 px-1 bg-blue-800 rounded w-fit self-end"
                    >
                      {message.text}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={index}
                      className="py-0.5 px-1 bg-gray-600 rounded w-fit"
                    >
                      {message.text}
                    </div>
                  );
                }
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <Input
                className="mt-4"
                name="message"
                type="text"
                placeholder="Digite uma mensagem legal..."
              />
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Sem chat ativo!
          </div>
        )}
      </div>
    </main>
  );
}
