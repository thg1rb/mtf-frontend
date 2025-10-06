import HeaderSection from "@/components/shared/HeaderSection";
import TaskForm from "@/components/task/TaskForm";
import { Button } from "@/components/ui/button";
import { getTaskById } from "@/lib/mock-data";
import { ChevronLeft, SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function RegisterTaskPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const task = getTaskById(id);

  return (
    <div className="flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลการต่ออายุใบอนุญาตทำงาน"
        hasBackButton={true}
        rightActionButtons={[
          <Button
            asChild
            key="แก้ไขข้อมูล"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href={`/tasks/renew/${id}/edit`}>
              <SquarePen className="size-[24px] mr-2" />
              แก้ไขข้อมูล
            </Link>
          </Button>,
        ]}
      />

      {/* Register Form with register mode */}
      <TaskForm
        typeOfTask="renew"
        mode="view"
        task={task}
        defaultValues={task}
      />
    </div>
  );
}
