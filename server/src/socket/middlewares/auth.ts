import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

import { SocketProps } from "@/app";

type NextFn = (err?: ExtendedError) => void;

export async function auth(socket: Socket<SocketProps>, next: NextFn) {
  const { userId } = socket.handshake.auth;

  const err = new Error("not authorized");

  if (!userId) return next(err);

  next();
}
