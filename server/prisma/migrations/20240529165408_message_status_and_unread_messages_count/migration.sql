-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'RECEIVE', 'READ');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'SENT';

-- AlterTable
ALTER TABLE "UsersOnChat" ADD COLUMN     "unreadMessagesCount" INTEGER NOT NULL DEFAULT 0;
