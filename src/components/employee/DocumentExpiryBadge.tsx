import React from "react";
import { Badge } from "../ui/badge";
import {
  FileCheck2,
  FileClock,
  FileWarning,
  FileX,
  FileX2,
} from "lucide-react";

interface DocumentStatusBadgeProps {
  status: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "NOT_HAVE";
}

export default function DocumentExpiryBadge({
  status,
}: DocumentStatusBadgeProps) {
  let icon: React.ReactElement;
  let text: string, className: string;

  switch (status) {
    case "EXPIRED":
      icon = <FileWarning className="text-white" />;
      text = "หมดอายุ";
      className = "w-[120px] bg-red-500 text-white";
      break;

    case "EXPIRING_SOON":
      icon = <FileClock className="text-red-800" />;
      text = `ใกล้หมดอายุ`;
      className = "w-[120px] bg-yellow-100 text-red-800";
      break;

    case "VALID":
      icon = <FileCheck2 className="text-green-800" />;
      text = "ใช้งานได้";
      className = "w-[120px] bg-green-200 text-green-800";
      break;

    case "NOT_HAVE":
      icon = <FileX2 className="text-gray-600" />;
      text = "ไม่มี";
      className = "w-[120px] bg-gray-200 text-gray-600";
      break;

    default:
      icon = <FileX className="text-gray-600" />;
      text = "ไม่ทราบสถานะ";
      className = "w-[120px] bg-gray-200 text-gray-600";
  }

  return (
    <Badge
      className={`flex flex-row items-center gap-1 font-light ${className}`}
    >
      {icon}
      {text}
    </Badge>
  );
}
