-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifExpires" TIMESTAMP(3),
ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL DEFAULT false;
