'use client'

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderSectionProps {
  topic: string;
  desc?: string;
  hasBackButton: boolean;
  rightActionButtons?: React.ReactElement[];
}

export default function HeaderSection({
  topic,
  desc,
  hasBackButton,
  rightActionButtons: rightActionButtons,
}: HeaderSectionProps) {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-y-[10px] w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-x-[20px] gap-y-[10px] w-full">
        <div className="flex flex-col">
          <p className="font-bold">{topic}</p>
          <p className="font-normal text-zinc-400">{desc}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-x-[20px] gap-y-[10px] w-full md:w-min">
        {hasBackButton && (
          <Button
            variant="ghost"
            className="flex flex-row font-normal px-[17px] py-[5px] w-full md:w-auto border border-zinc-300 cursor-pointer"
            onClick={handleBack}
          >
            <ChevronLeft className="size-[24px] mr-2" />
            ย้อนกลับ
          </Button>
        )}
        {rightActionButtons && rightActionButtons.map((button) => button)}
      </div>
    </div>
  );
}
