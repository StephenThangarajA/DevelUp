-- CreateTable
CREATE TABLE "aptitude_mentor_progress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activeTab" TEXT NOT NULL DEFAULT 'practice',
    "completedSubtopics" JSONB NOT NULL DEFAULT '{}',
    "learnedSubtopics" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aptitude_mentor_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "aptitude_mentor_progress_userId_idx" ON "aptitude_mentor_progress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "aptitude_mentor_progress_userId_key" ON "aptitude_mentor_progress"("userId");

-- AddForeignKey
ALTER TABLE "aptitude_mentor_progress" ADD CONSTRAINT "aptitude_mentor_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
