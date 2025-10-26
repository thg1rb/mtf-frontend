"use client";

import AgentForm from "@/components/agent/AgentForm";
import AgentFormSkeleton from "@/components/agent/AgentFormSkeleton";
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
import { Button } from "@/components/ui/button";
import { getAgentQueryOption } from "@/lib/api";
import { transformAgentResponseToFormData } from "@/lib/api/agents/utils";
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";

export default function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: agentData, isLoading: isLoadingAgent } = useQuery(
    getAgentQueryOption(id!),
  );

  // Transform API data to form format
  const formData = agentData
    ? transformAgentResponseToFormData(agentData)
    : null;

  if (!id || isLoadingAgent) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="ข้อมูลของนายหน้า"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        <AgentFormSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลของนายหน้า"
        hasBackButton={true}
        rightActionButtons={[
          <Button
            asChild
            key="แก้ไขข้อมูล"
            className="font-normal px-[17px] py-[5px] w-full md:w-auto"
          >
            <Link href={`/agents/${id}/edit`}>
              <SquarePen className="size-[24px] mr-2" />
              แก้ไขข้อมูล
            </Link>
          </Button>,
        ]}
      />

      <AgentForm
        mode="view"
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
