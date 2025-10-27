"use client";
import React, { ReactNode } from "react";
import ProfileDashboard from "../../../components/profile-view/ProfileDashboard";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900">
      <aside className="w-64 bg-white dark:bg-neutral-800 border-r shadow-sm pt-2">
        <ProfileDashboard />
      </aside>

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
};

export default ProfileLayout;
