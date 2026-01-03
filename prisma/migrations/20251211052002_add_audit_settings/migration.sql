-- CreateTable
CREATE TABLE "audit_settings" (
    "id" SERIAL NOT NULL,
    "workspaceId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "jobTitle" TEXT NOT NULL DEFAULT '',
    "department" TEXT NOT NULL DEFAULT '',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "dueDateReminders" BOOLEAN NOT NULL DEFAULT true,
    "criticalAlerts" BOOLEAN NOT NULL DEFAULT true,
    "autoSave" BOOLEAN NOT NULL DEFAULT true,
    "defaultView" TEXT NOT NULL DEFAULT 'Dashboard',
    "itemsPerPage" TEXT NOT NULL DEFAULT '25',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audit_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "audit_settings_workspaceId_key" ON "audit_settings"("workspaceId");

-- AddForeignKey
ALTER TABLE "audit_settings" ADD CONSTRAINT "audit_settings_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "audit_workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
