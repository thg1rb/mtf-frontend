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
import { findMockAgentById } from "@/lib/mock-data";
import Link from "next/link";
import React from "react";

export default async function AgentEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // TODO: GET method `/api/agents/${id}` to fetch existing agent details
  const data = findMockAgentById(id);

  return (
    <div className="flex flex-col gap-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      <HeaderSection topic="แก้ไขข้อมูลนายหน้า" hasBackButton={true} />

      <AgentForm mode="edit" defaultValues={data} />

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
