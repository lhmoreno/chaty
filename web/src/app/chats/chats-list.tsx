import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  CheckCircleIcon,
  CircleDotIcon,
  ListFilterIcon,
  MessagesSquareIcon,
  UserIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import Users from "./users";

type Chat = {
  id: string;
  title: string;
  unreadMessagesCount: number;
};

async function getChats(userId: string) {
  const response = await fetch("http://localhost:3333/chats", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: "@chaty:userId=" + userId,
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`failed to fetch ${response.status}`);
  }

  const { chats } = (await response.json()) as { chats: Chat[] };

  return chats;
}

export async function ChatsList() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("@chaty:userId");
  const userId = cookie?.value ?? "";

  const chats = await getChats(userId);

  return (
    <div className="h-screen w-full max-w-sm p-2 flex flex-col border-r border-slate-200">
      <div className="p-4">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold text-slate-800 tracking-wider">
            Conversas
          </h1>
          <div className="flex text-slate-700">
            <Users userId={userId} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <ListFilterIcon size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" forceMount>
                <DropdownMenuLabel className="text-muted-foreground tracking-wider">
                  Filtrar por
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <BellIcon size={16} className="mr-2 text-slate-600" />
                  Não lidas
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CircleDotIcon size={16} className="mr-2 text-slate-600" />
                  Pendentes
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessagesSquareIcon
                    size={16}
                    className="mr-2 text-slate-600"
                  />
                  Em atendimento
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CheckCircleIcon size={16} className="mr-2 text-slate-600" />
                  Finalizadas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Input className="mt-3" placeholder="Pesquisar..." />
      </div>
      {!!!chats.length ? (
        <div className="mt-6 flex-1 flex justify-center text-slate-600">
          Nenhuma conversa encontrada.
        </div>
      ) : (
        <ScrollArea className="flex-1">
          {chats.map((chat) => {
            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  "p-3 mr-2 rounded-lg flex items-center hover:bg-slate-100"
                  // chat.phoneNumber === chatPhoneNumberActive &&
                  //   "bg-stone-200 hover:bg-stone-200"
                )}
                // onClick={handleChangeChat(chat)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-200 text-slate-500">
                  <UserIcon />
                </div>

                <div className="flex-1 px-3 flex flex-col items-start">
                  <strong className="tracking-wide">{chat.title}</strong>
                  <div className="text-sm text-slate-500 font-medium">
                    {/* {chat.sector && (
                      <div className="flex gap-1 items-center">
                        <Users2Icon size={14} />
                        <p>{chat.sector}</p>
                      </div>
                    )} */}
                    {/* {chat.owner && (
                      <div className="flex gap-1 items-center">
                        <MessagesSquareIcon size={14} />
                        <p>{chat.owner}</p>
                      </div>
                    )} */}
                  </div>
                </div>

                <div className="flex items-center">
                  {/* {chat.status === "finished" && (
                    <Badge variant="secondary" className="tracking-wide">
                      Finalizada
                    </Badge>
                  )} */}
                  {!!chat.unreadMessagesCount && (
                    <span className="h-5 w-5 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                      {chat.unreadMessagesCount}
                    </span>
                  )}
                </div>

                {/* <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                  </div>

                  <div className="flex justify-between items-center gap-2">
                  </div>
                </div> */}
              </Link>
            );
          })}
        </ScrollArea>
      )}
    </div>
  );
}
