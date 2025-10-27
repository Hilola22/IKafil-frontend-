"use client";
import React, { ReactNode } from "react";
import ProfileDashboard from "../../../components/profile-view/ProfileDashboard";

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <ProfileDashboard />
      <div className="border w-full flex p-10">{children}</div>
    </div>
  );
};

export default ProfileLayout;
