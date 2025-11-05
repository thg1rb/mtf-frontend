"use client";

import AgentForm from "@/components/agent/AgentForm";
import HeaderSection from "@/components/shared/HeaderSection";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAgentQueryOption } from "@/lib/api";
import { transformAgentResponseToFormData } from "@/lib/api/agents/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { use } from "react";

export default function AgentEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Fetch agent data using React Query
  const { data: agentData, isLoading } = useQuery(getAgentQueryOption(id!));

  // Transform API data to form format
  const formData = agentData
    ? transformAgentResponseToFormData(agentData)
    : null;

  if (!id || isLoading) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection topic="แก้ไขข้อมูลนายหน้า" hasBackButton={true} />
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      <HeaderSection topic="แก้ไขข้อมูลนายหน้า" hasBackButton={true} />

      <AgentForm
        mode="edit"
        defaultValues={formData || undefined}
        agentId={id}
      />

      {!agentData && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                ไม่พบข้อมูลนายหน้า
              </AlertDialogTitle>
              <AlertDialogDescription className="font-light">
                ตรวจสอบหมายเลขบัตรประชาชนของนายหน้าว่าอยู่ในระบบหรือไม่
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="font-light">
                <Link href="/agents">ย้อนกลับ</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
