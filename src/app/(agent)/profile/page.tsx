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
import { getAgentQueryOption } from "@/lib/api";
import { transformAgentResponseToFormData } from "@/lib/api/agents/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AgentProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state and check if user is authenticated
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const { data: agentData, isLoading: isLoadingAgent } = useQuery({
    ...getAgentQueryOption(user?.id || ""),
    enabled: !!user?.id,
  });

  // Transform API data to form format
  const formData = agentData
    ? transformAgentResponseToFormData(agentData)
    : null;

  // Show loading while checking authentication and fetching data
  if (!user || isLoading || isLoadingAgent) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="ข้อมูลส่วนตัว"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        <AgentFormSkeleton />
      </div>
    );
  }

  // Show error if user is not authenticated
  if (!user) {
    return (
      <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
        <HeaderSection
          topic="ข้อมูลส่วนตัว"
          hasBackButton={true}
          rightActionButtons={[]}
        />
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                ไม่ได้เข้าสู่ระบบ
              </AlertDialogTitle>
              <AlertDialogDescription className="font-light">
                กรุณาเข้าสู่ระบบเพื่อดูข้อมูลส่วนตัว
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="font-light">
                <Link href="/">ไปหน้าเข้าสู่ระบบ</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="ข้อมูลส่วนตัว"
        hasBackButton={true}
        rightActionButtons={[]}
      />

      <AgentForm
        mode="view"
        defaultValues={formData || undefined}
        agentId={user.id}
      />

      {!agentData && (
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-medium">
                ไม่พบข้อมูล
              </AlertDialogTitle>
              <AlertDialogDescription className="font-light">
                ไม่พบข้อมูลของคุณในระบบ กรุณาติดต่อผู้ดูแลระบบ
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="font-light">
                <Link href="/dashboard">ย้อนกลับ</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}