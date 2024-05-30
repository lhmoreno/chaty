"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ContactIcon, UserIcon } from "lucide-react";
import { cookies } from "next/headers";
import { CommandGroup } from "cmdk";

export interface User {
  id: string;
  name: string;
}

export default function Users({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3333/users", {
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

      const data = (await response.json()) as { users: User[] };

      setUsers(data.users);
    })();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <ContactIcon size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 ml-4 p-4">
        <h2 className="text-lg font-bold text-slate-800 tracking-wider">
          Usuário
        </h2>
        <Command className="mt-4">
          <CommandList>
            <CommandInput placeholder="Pesquisar..." />
            <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => {
                    setOpen(false);
                  }}
                  className="first:mt-4 p-3 rounded-lg flex hover:bg-stone-100"
                >
                  <div className="w-12 h-12">
                    <UserIcon />
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <strong>{user.name}</strong>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      <p className="flex-1 text-stone-500 line-clamp-1 text-left text-ellipsis">
                        {/* {user.phoneNumber} */}
                        oi
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
