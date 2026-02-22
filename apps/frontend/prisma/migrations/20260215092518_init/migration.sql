-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "statement" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
