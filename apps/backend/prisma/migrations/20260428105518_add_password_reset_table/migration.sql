-- CreateTable
CREATE TABLE "PasswordResetManagement" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PasswordResetManagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetManagement_token_key" ON "PasswordResetManagement"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetManagement_userId_key" ON "PasswordResetManagement"("userId");

-- AddForeignKey
ALTER TABLE "PasswordResetManagement" ADD CONSTRAINT "PasswordResetManagement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
