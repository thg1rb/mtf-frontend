"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmployeeFormData, employeeSchema } from "@/lib/validations";
import { Bed, Clock8, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { DatePicker } from "../shared/DatePicker";
import { getEmployerById } from "@/lib/mock-data";

interface EmployeeFormProps {
  mode: "create" | "view" | "edit";
  defaultValues?: Partial<EmployeeFormData>;
}

const documentFieldConfigs = [
  {
    name: "documents.healthCheckExpiryDate" as const,
    label: "วันหมดอายุใบรับรองแพทย์",
  },
  {
    name: "documents.insuranceExpiryDate" as const,
    label: "วันหมดอายุประกันสุขภาพ",
  },
  {
    name: "documents.workPermitExpiryDate" as const,
    label: "วันหมดอายุใบอนุญาตทำงาน",
  },
  {
    name: "documents.certificateOfIdentityExpiryDate" as const,
    label: "วันหมดอายุเอกสาร CI",
  },
  {
    name: "documents.nonThaiIdentificationExpiryDate" as const,
    label: "วันหมดอายุบัตรชมพู",
  },
];

const toDateOrNull = (value: string | Date | null | undefined): Date | null => {
  if (!value) return null;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const toStringOrNull = (date: Date | null): string | null => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return null;
  return date.toISOString();
};

export default function EmployeeForm({
  mode,
  defaultValues,
}: EmployeeFormProps) {
  const router = useRouter();
  const [showValidationAlert, setShowValidationAlert] =
    useState<boolean>(false);
  const [showInvalidEmployerId, setInvalidEmployerId] =
    useState<boolean>(false);

  const cleanedDefaultValues: EmployeeFormData = useMemo(() => {
    // Helper to find document expiry date by type from array
    const findDocumentExpiry = (type: string): string | null => {
      if (
        !defaultValues?.documents ||
        !Array.isArray(defaultValues.documents)
      ) {
        return null;
      }
      const doc = (defaultValues.documents as any[]).find(
        (d: any) => d.type === type
      );
      if (!doc?.expiryDate) return null;

      // If it's already a string, return it
      if (typeof doc.expiryDate === "string") return doc.expiryDate;

      // If it's a Date, convert to ISO string
      if (doc.expiryDate instanceof Date) {
        return doc.expiryDate.toISOString();
      }

      return null;
    };

    return {
      passportNumber: defaultValues?.passportNumber ?? "",
      employerId: defaultValues?.employerId ?? "",
      firstname: defaultValues?.firstname ?? "",
      lastname: defaultValues?.lastname ?? "",
      nationality: defaultValues?.nationality ?? "เมียนมา",
      bloodType: defaultValues?.bloodType ?? "A",
      status: defaultValues?.status ?? "ACTIVE",
      address: {
        addrDetailTh: defaultValues?.address?.addrDetailTh ?? "",
        districtTh: defaultValues?.address?.districtTh ?? "",
        subDistrictTh: defaultValues?.address?.subDistrictTh ?? "",
        provinceTh: defaultValues?.address?.provinceTh ?? "",
        postalCode: defaultValues?.address?.postalCode ?? "",
      },
      documents: {
        healthCheckExpiryDate: findDocumentExpiry("ใบรับรองแพทย์"),
        insuranceExpiryDate: findDocumentExpiry("ประกันสุขภาพ"),
        workPermitExpiryDate: findDocumentExpiry("ใบอนุญาตทำงาน"),
        certificateOfIdentityExpiryDate: findDocumentExpiry("เอกสาร CI"),
        nonThaiIdentificationExpiryDate: findDocumentExpiry("บัตรชมพู"),
      },
    };
  }, [defaultValues]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema) as Resolver<EmployeeFormData>,
    defaultValues: cleanedDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(cleanedDefaultValues);
  }, [cleanedDefaultValues, reset]);

  // Form submit successfully (There is no invalid input)
  const handleFormSubmit = (data: EmployeeFormData) => {
    setShowValidationAlert(false);

    if (
      !getEmployerById(data.employerId) ||
      getEmployerById(data.employerId)?.status === "inactive"
    ) {
      setInvalidEmployerId(true);
      return;
    }

    if (mode === "create") {
      // TODO: POST method `api/employees`
    } else if (mode === "edit") {
      // TODO: PUT method `api/employees/{id}`
    }

    console.log("Form data:", data);

    router.push("/employees");
  };

  // Form submit failed (There are invalid input )
  const handleFormInvalid = () => {
    setShowValidationAlert(true);
  };

  const isReadOnly = mode === "view";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
      className="flex flex-col gap-y-[29px] md:gap-y-[45px]"
    >
      {/* EmployeeInfoSection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Info />
          <p className="font-normal">ข้อมูลลูกจ้าง</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="passportNumber"
              className="font-light text-zinc-700"
            >
              หมายเลขหนังสือเดินทาง (Passport No.)
            </Label>
            <Input
              readOnly={isReadOnly}
              id="passportNumber"
              {...register("passportNumber")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.passportNumber && (
              <span className="text-red-500 font-light">
                {errors.passportNumber.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="employerId" className="font-light text-zinc-700">
              เลขประจำตัวผู้เสียภาษีนายจ้าง (13 หลัก)
            </Label>
            <Input
              readOnly={isReadOnly}
              maxLength={13}
              inputMode="numeric"
              id="employerId"
              {...register("employerId")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.employerId && (
              <span className="text-red-500 font-light">
                {errors.employerId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="firstname" className="font-light text-zinc-700">
              ชื่อจริง
            </Label>
            <Input
              readOnly={isReadOnly}
              id="firstname"
              {...register("firstname")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.firstname && (
              <span className="text-red-500 font-light">
                {errors.firstname.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="lastname" className="font-light text-zinc-700">
              นามสกุล
            </Label>
            <Input
              readOnly={isReadOnly}
              id="lastname"
              {...register("lastname")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.lastname && (
              <span className="text-red-500 font-light">
                {errors.lastname.message}
              </span>
            )}
          </div>

          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-[10px]">
                <Label
                  htmlFor="nationality"
                  className="font-light text-zinc-700"
                >
                  สัญชาติ
                </Label>
                <Select
                  disabled={isReadOnly}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full font-light cursor-pointer">
                    <SelectValue placeholder="เลือกสัญชาติ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="เมียนมา">🇲🇲 เมียนมา</SelectItem>
                    <SelectItem value="ลาว">🇱🇦 ลาว</SelectItem>
                    <SelectItem value="กัมพูชา">🇰🇭 กัมพูชา</SelectItem>
                  </SelectContent>
                </Select>
                {errors.nationality && (
                  <span className="text-red-500 font-light">
                    {errors.nationality.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="bloodType"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="bloodType" className="font-light text-zinc-700">
                  กรุ๊ปเลือด
                </Label>
                <Select
                  disabled={isReadOnly}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full font-light cursor-pointer">
                    <SelectValue placeholder="กรุ๊ปเลือด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bloodType && (
                  <span className="text-red-500 font-light">
                    {errors.bloodType.message}
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="status" className="font-light text-zinc-700">
                  สถานะ
                </Label>
                <Select
                  disabled={isReadOnly}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full font-light cursor-pointer">
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE" className="cursor-pointer">
                      ใช้งาน
                    </SelectItem>
                    <SelectItem value="INACTIVE" className="cursor-pointer">
                      ไม่ใช้งาน
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <span className="text-red-500 font-light">
                    {errors.status.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* AddressInfoSection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Bed />
          <p className="font-normal">ที่อยู่อาศัยในประเทศไทย</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="address.addrDetailTh"
              className="font-light text-zinc-700"
            >
              บ้านเลขที่, หมู่, ซอย, ถนน
            </Label>
            <Input
              readOnly={isReadOnly}
              id="address.addrDetailTh"
              {...register("address.addrDetailTh")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.address?.addrDetailTh && (
              <span className="text-red-500 font-light">
                {errors.address.addrDetailTh.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="address.districtTh"
              className="font-light text-zinc-700"
            >
              เขต/อำเภอ
            </Label>
            <Input
              readOnly={isReadOnly}
              id="address.districtTh"
              {...register("address.districtTh")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.address?.districtTh && (
              <span className="text-red-500 font-light">
                {errors.address.districtTh.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="address.subDistrictTh"
              className="font-light text-zinc-700"
            >
              แขวง/ตำบล
            </Label>
            <Input
              readOnly={isReadOnly}
              id="address.subDistrictTh"
              {...register("address.subDistrictTh")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.address?.subDistrictTh && (
              <span className="text-red-500 font-light">
                {errors.address.subDistrictTh.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="address.provinceTh"
              className="font-light text-zinc-700"
            >
              จังหวัด
            </Label>
            <Input
              readOnly={isReadOnly}
              id="address.provinceTh"
              {...register("address.provinceTh")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.address?.provinceTh && (
              <span className="text-red-500 font-light">
                {errors.address.provinceTh.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="address.postalCode"
              className="font-light text-zinc-700"
            >
              รหัสไปรษณีย์
            </Label>
            <Input
              readOnly={isReadOnly}
              maxLength={5}
              inputMode="numeric"
              id="address.postalCode"
              {...register("address.postalCode")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.address?.postalCode && (
              <span className="text-red-500 font-light">
                {errors.address.postalCode.message}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* DocumentExpirySection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Clock8 />
          <p className="font-normal">วันหมดอายุเอกสารสำคัญ</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          {documentFieldConfigs.map((fieldConfig) => {
            const fieldName = fieldConfig.name.split(
              "."
            )[1] as keyof EmployeeFormData["documents"];

            return (
              <Controller
                key={fieldConfig.name}
                name={fieldConfig.name}
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-y-[10px]">
                    <Label
                      htmlFor={fieldConfig.name}
                      className="font-light text-zinc-700"
                    >
                      {fieldConfig.label}
                    </Label>
                    <DatePicker
                      value={toDateOrNull(field.value)}
                      onChange={(date) => field.onChange(toStringOrNull(date))}
                      disabled={isReadOnly}
                    />
                    {errors.documents?.[fieldName] && (
                      <span className="text-red-500 font-light">
                        {errors.documents[fieldName]?.message as string}
                      </span>
                    )}
                  </div>
                )}
              />
            );
          })}
        </div>
      </div>

      {mode !== "view" && (
        <div className="flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end">
          <Button
            asChild
            type="button"
            variant="ghost"
            className="font-light border border-slate-300"
          >
            <Link href="/employees">ยกเลิก</Link>
          </Button>
          <Button type="submit" className="font-light">
            {mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข"}
          </Button>

          <AlertDialog
            open={showValidationAlert}
            onOpenChange={setShowValidationAlert}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-medium">
                  {mode === "create"
                    ? "เพิ่มลูกจ้างใหม่ไม่สำเร็จ!"
                    : "แก้ไขข้อมูลลูกจ้างไม่สำเร็จ!"}
                </AlertDialogTitle>
                <AlertDialogDescription className="font-light">
                  ระบุข้อมูลของลูกจ้างให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลให้ถูกต้องก่อนคลิก{" "}
                  {mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="font-light">
                  ตกลง
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog
            open={showInvalidEmployerId}
            onOpenChange={setInvalidEmployerId}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-medium">
                  ไม่พบหมายเลขประจำตัวผู้เสียภาษี!
                </AlertDialogTitle>
                <AlertDialogDescription className="font-light">
                  ระบุเลขประจำตัวผู้เสียภาษีของนายจ้างที่อยู่ในระบบและมีสถานะ
                  &quot;ใช้งาน&quot;
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction className="font-light">
                  ตกลง
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </form>
  );
}
