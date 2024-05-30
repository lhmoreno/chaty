import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import {
  Check,
  CheckCheck,
  Clock,
  Paperclip,
  SendHorizonal,
} from "lucide-react";

type ChatData = {
  id: string;
  messages: Message[];
};

type Message = {
  id: string;
  createdAt: string;
  text: string;
  status: "SENT" | "DELIVERY" | "READ";
  senderId: string;
  chatId: string;
};

export default function Chat() {
  const chat: ChatData = {
    id: "1049f759-ca2c-491d-be73-931ce2145cb3",
    messages: [
      {
        id: "dc22dd5c-2749-4889-b824-e821e8c2344b",
        createdAt: "2024-05-29T13:46:13.520Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "d4c9e732-b907-481f-86d1-dad5406ad839",
        createdAt: "2024-05-29T14:14:45.601Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "90c8c4e3-be3c-468f-9664-dae44ca67698",
        createdAt: "2024-05-29T14:22:48.622Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "665e02e4-cc70-4c0c-9a81-355c4426236f",
        createdAt: "2024-05-29T14:23:33.404Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "39ded057-4bad-450a-b388-018174047802",
        createdAt: "2024-05-29T14:24:16.126Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "dac4aa99-9c9a-4dd8-a773-2594ba933684",
        createdAt: "2024-05-29T14:24:49.007Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "1fc27eb8-b5a3-480c-bb53-c06438a3de0a",
        createdAt: "2024-05-29T14:25:11.887Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "278e5627-53fd-4192-82b6-fa07b840d004",
        createdAt: "2024-05-29T14:34:01.427Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "393d02c0-1383-4b31-b010-4aa2f5788469",
        createdAt: "2024-05-29T14:34:53.756Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "6fa14442-2677-4952-bb2d-8a4e1bd52cd3",
        createdAt: "2024-05-29T14:35:13.204Z",
        text: "Oieee",
        status: "SENT",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
      {
        id: "7d12edf3-f010-479f-aea1-b037ab89d69f",
        createdAt: "2024-05-29T17:23:44.489Z",
        text: "Oieee",
        status: "READ",
        senderId: "9ff7cf39-77a6-4a23-b493-0ff3790a8380",
        chatId: "1049f759-ca2c-491d-be73-931ce2145cb3",
      },
    ],
  };

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [messages]);

  // async function onSubmitMessage(ev: FormEvent<HTMLFormElement>) {
  //   ev.preventDefault();

  //   const formData = new FormData(ev.currentTarget);
  //   const message = formData.get("message")?.toString().trim() ?? "";

  //   const input = ev.currentTarget.querySelector(
  //     'input[name="message"]'
  //   ) as HTMLInputElement;
  //   input.value = "";

  //   if (!message || message.length === 0) return;

  //   setMessages((value) => [
  //     ...value,
  //     {
  //       id: `message_${Math.floor(Math.random() * 1000)}`,
  //       text: message,
  //       timestamp: new Date().getTime() / 1000,
  //       status: "sent",
  //     },
  //   ]);
  // }

  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 py-3 flex border-b border-stone-300">
        <Avatar className="w-11 h-11">
          <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <h1 className="font-bold">{chat.id}</h1>
          <h2 className="text-sm text-stone-500">{chat.id}</h2>
        </div>
      </div>
      <div className="bg-stone-100 flex-1">
        <div className="mx-auto max-w-5xl h-full pb-6 flex flex-col gap-1 justify-end">
          {chat.messages.map((message) => {
            const Icon = () => {
              // if (message.status === "pending") {
              //   return <Clock className="w-3 h-3" />;
              // }
              if (message.status === "SENT") {
                return <Check className="w-4 h-4" />;
              }
              if (message.status === "DELIVERY") {
                return <CheckCheck className="w-4 h-4" />;
              }
              if (message.status === "READ") {
                return <CheckCheck className="w-4 h-4 text-blue-500" />;
              }
              return null;
            };

            return (
              <div
                key={message.id}
                className={cn(
                  "bg-emerald-200 py-1 px-2 rounded-lg flex gap-2 w-fit max-w-xl self-end shadow",
                  !message.status && "self-start bg-white"
                )}
              >
                <p>{message.text}</p>
                <span className="-mb-0.5 self-end text-xs text-stone-500 flex items-center gap-1">
                  {dayjs(message.createdAt).format("HH[:]mm")}
                  <Icon />
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-4 py-2 flex items-center gap-4 border-t border-stone-300">
        <Button variant="ghost">
          <Paperclip className="w-5 h-5" />
        </Button>
        <form
          className="flex-1 flex items-center gap-4"
          // onSubmit={handleSubmitMessage}
        >
          <Input
            // ref={inputMessageRef}
            className="text-base"
            name="message"
            placeholder="Digite uma mensagem"
          />
          <Button type="submit">
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
