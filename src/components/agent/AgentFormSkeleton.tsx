import { Skeleton } from "@/components/ui/skeleton";
import { Home, Info } from "lucide-react";

export default function AgentFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-[29px] md:gap-y-[45px]">
      {/* PersonalInfoSection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Info />
          <p className="font-normal">ข้อมูลนายหน้า</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 fields in personal info */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-32" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>

      {/* AddressInfoSection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Home />
          <p className="font-normal">ข้อมูลที่อยู่</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 fields in address info */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-40" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
