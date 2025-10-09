import { Skeleton } from "@/components/ui/skeleton";
import { Building, DollarSign, Home, Info, MapPin } from "lucide-react";

export default function EmployerFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-[29px] md:gap-y-[45px]">
      {/* Personal Info Section */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Info />
          <p className="font-normal">ข้อมูลนายจ้าง</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 6 fields in personal info */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-32" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
          ))}
        </div>
      </div>

      {/* Company Info Section */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Building />
          <p className="font-normal">ข้อมูลบริษัท</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 2 fields */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Financial Status Section */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <DollarSign />
          <p className="font-normal">สถานะทางการเงิน</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 6 fields */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Thai Address Section */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Home />
          <p className="font-normal">ข้อมูลที่อยู่ (ภาษาไทย)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 fields */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* English Address Section */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <MapPin />
          <p className="font-normal">ข้อมูลที่อยู่ (ภาษาอังกฤษ)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 fields */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
