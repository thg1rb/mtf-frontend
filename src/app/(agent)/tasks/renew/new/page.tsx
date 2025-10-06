import HeaderSection from "@/components/shared/HeaderSection";
import TaskForm from "@/components/task/TaskForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewRenewTaskPage() {
  return (
    <div className="flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="การต่ออายุใบอนุญาตทำงาน" hasBackButton={true} />

      {/* TODO: Renew Form with renew mode */}
      <TaskForm typeOfTask="renew" mode="create" />
    </div>
  );
}
