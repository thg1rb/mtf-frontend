import HeaderSection from "@/components/shared/HeaderSection";
import TaskForm from "@/components/task/TaskForm";
import React from "react";

export default function NewRegisterTaskPage() {
  return (
    <div className="flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection topic="การขึ้นทะเบียนใหม่" hasBackButton={true} />

      {/* WorkFormSection */}
      <TaskForm typeOfTask="register" mode="create" />
    </div>
  );
}
