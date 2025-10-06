import EmployeeForm from "@/components/employee/EmployeeForm";
import HeaderSection from "@/components/shared/HeaderSection";
import React from "react";

export default function NewEmployeePage() {
  return (
    <div className="flex flex-col gap-y-[35px] md:gap-y-[51px] w-full px-[20px] md:px-[36px] py-[8px] md:py-[20px]">
      {/* HeaderSection */}
      <HeaderSection
        topic="เพิ่มลูกจ้างใหม่"
        desc="กรอกข้อมูลลูกจ้าง"
        hasBackButton={true}
      />

      {/* FormSection */}
      <EmployeeForm mode="create" />
    </div>
  );
}
