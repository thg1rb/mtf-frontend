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
import { useQuery } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = React.useState<string | null>(null);

  // Unwrap params in useEffect
  React.useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // TODO: test this api again
  const { data, isLoading } = useQuery({
    ...getAgentQueryOption(id!),
    enabled: !!id, // Only fetch when id is available
  });

  // Transform API response to form format (lowercase status)
  const formData = React.useMemo(() => {
    if (!data) return undefined;
    return data;
  }, [data]);

  if (!id || isLoading) {
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

      <AgentForm mode="view" defaultValues={formData} />

      {!data && (
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
