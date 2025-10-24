"use client";

import HeaderSection from "@/components/shared/HeaderSection";
import TaskForm from "@/components/task/TaskForm";
import { Button } from "@/components/ui/button";
import { getWorkQueryOption } from "@/lib/api";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetWorkResponse } from "@/lib/api/works/types";
import { TaskFormData } from "@/lib/validations/task";

export default function RegisterTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const { data: taskData, isLoading, error } = useQuery(getWorkQueryOption(id));

  // Transform API response to form's expected format
  const transformApiDataToForm = (
    apiData: GetWorkResponse,
  ): Partial<TaskFormData> => {
    return {
      employerId: apiData.employer.id,
      description: apiData.detail,
      employeeIds: apiData.employeesInWork.map((emp) => emp.passportNumber),
      currentStepIndex: apiData.currentStepIndex,
    };
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading task data</div>;
  }

  const formDefaultValues = taskData
    ? transformApiDataToForm(taskData)
    : undefined;

  return (
    <div className="flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลการขึ้นทะเบียนใหม่"
        hasBackButton={true}
        rightActionButtons={[
          <Button
            asChild
            key="แก้ไขข้อมูล"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href={`/tasks/register/${id}/edit`}>
              <SquarePen className="size-[24px] mr-2" />
              แก้ไขข้อมูล
            </Link>
          </Button>,
        ]}
      />

      {/* Register Form with register mode */}
      <TaskForm
        typeOfTask="register"
        mode="view"
        defaultValues={formDefaultValues}
        workId={id}
      />
    </div>
  );
}
