import { Bed, Clock8, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function EmployeeFormSkeleton() {
  return (
    <div className="flex flex-col gap-y-[29px] md:gap-y-[45px]">
      {/* EmployeeInfoSection Skeleton */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Info />
          <p className="font-normal">ข้อมูลลูกจ้าง</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 7 input fields */}
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* AddressInfoSection Skeleton */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Bed />
          <p className="font-normal">ที่อยู่อาศัยในประเทศไทย</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 address fields */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* DocumentExpirySection Skeleton */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Clock8 />
          <p className="font-normal">วันหมดอายุเอกสารสำคัญ</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {/* 5 document date fields */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-y-[10px]">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
