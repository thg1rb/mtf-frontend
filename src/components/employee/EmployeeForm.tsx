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
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEmployeeMutationOptions,
  updateEmployeeMutationOptions,
  getEmployersQueryOption,
} from "@/lib/api";
import {
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from "@/lib/api/employees/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

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

  // Fetch employers for dropdown selection
  const { data: employersData } = useQuery(
    getEmployersQueryOption({
      page: 0,
      size: 100, // Get a larger list for selection
      status: "ACTIVE", // Only show active employers
    }),
  );

  const employerSelects = employersData?.content || [];

  // Define mutations at component level (not inside handlers)
  const createMutation = useMutation({
    ...createEmployeeMutationOptions,
    onSuccess: () => {
      router.push("/employees");
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  const updateMutation = useMutation({
    ...updateEmployeeMutationOptions,
    onSuccess: () => {
      router.push("/employees");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const cleanedDefaultValues: EmployeeFormData = useMemo(() => {
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
      documents: defaultValues?.documents ?? {
        healthCheckExpiryDate: null,
        insuranceExpiryDate: null,
        workPermitExpiryDate: null,
        certificateOfIdentityExpiryDate: null,
        nonThaiIdentificationExpiryDate: null,
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

  // Transform form data to API request format for CREATE
  const transformToCreateRequest = (
    data: EmployeeFormData,
  ): CreateEmployeeRequest => {
    const documents: { type: string; expiryDate: string }[] = [];

    // Document type mapping (form field name -> Thai document type)
    const documentTypeMapping: Record<string, string> = {
      healthCheckExpiryDate: "ใบรับรองแพทย์",
      insuranceExpiryDate: "ประกันสุขภาพ",
      workPermitExpiryDate: "ใบอนุญาตทำงาน",
      certificateOfIdentityExpiryDate: "เอกสาร CI",
      nonThaiIdentificationExpiryDate: "บัตรชมพู",
    };

    // Only add documents that have expiry dates
    Object.entries(data.documents).forEach(([key, value]) => {
      if (value) {
        // value is ISO string, convert to YYYY-MM-DD format
        const dateOnly = value.split("T")[0];
        const thaiType = documentTypeMapping[key];
        documents.push({
          type: thaiType,
          expiryDate: dateOnly,
        });
      }
    });

    return {
      passportNo: data.passportNumber || "",
      employerId: data.employerId,
      firstName: data.firstname,
      lastName: data.lastname,
      status: data.status,
      nationality: data.nationality,
      bloodType: data.bloodType,
      address: {
        addrDetailTh: data.address.addrDetailTh,
        subDistrictTh: data.address.subDistrictTh,
        districtTh: data.address.districtTh,
        provinceTh: data.address.provinceTh,
        postalCode: data.address.postalCode,
      },
      documents: documents,
    };
  };

  // Transform form data to API request format for UPDATE
  const transformToUpdateRequest = (
    data: EmployeeFormData,
  ): UpdateEmployeeRequest => {
    const documents: { type: string; expiryDate: string }[] = [];

    // Document type mapping (form field name -> Thai document type)
    const documentTypeMapping: Record<string, string> = {
      healthCheckExpiryDate: "ใบรับรองแพทย์",
      insuranceExpiryDate: "ประกันสุขภาพ",
      workPermitExpiryDate: "ใบอนุญาตทำงาน",
      certificateOfIdentityExpiryDate: "เอกสาร CI",
      nonThaiIdentificationExpiryDate: "บัตรชมพู",
    };

    // Only add documents that have expiry dates
    Object.entries(data.documents).forEach(([key, value]) => {
      if (value) {
        // value is ISO string, convert to YYYY-MM-DD format
        const dateOnly = value.split("T")[0];
        const thaiType = documentTypeMapping[key];
        documents.push({
          type: thaiType,
          expiryDate: dateOnly,
        });
      }
    });

    return {
      employerId: data.employerId,
      firstName: data.firstname,
      lastName: data.lastname,
      status: data.status,
      nationality: data.nationality,
      bloodType: data.bloodType,
      address: {
        addrDetailTh: data.address.addrDetailTh,
        subDistrictTh: data.address.subDistrictTh,
        districtTh: data.address.districtTh,
        provinceTh: data.address.provinceTh,
        postalCode: data.address.postalCode,
      },
      documents: documents,
    };
  };

  // Form submit successfully (There is no invalid input)
  const handleFormSubmit = (data: EmployeeFormData) => {
    setShowValidationAlert(false);

    if (mode === "create") {
      const payload = transformToCreateRequest(data);
      createMutation.mutate(payload);
    } else if (mode === "edit" && defaultValues?.passportNumber) {
      const payload = transformToUpdateRequest(data);
      updateMutation.mutate({ id: defaultValues.passportNumber, payload });
    }
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
              maxLength={8}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.passportNumber && (
              <span className="text-red-500 font-light">
                {errors.passportNumber.message}
              </span>
            )}
          </div>

          <Controller
            name="employerId"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-[10px]">
                <Label
                  htmlFor="employerId"
                  className="font-light text-zinc-700"
                >
                  นายจ้าง
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={isReadOnly}
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={`w-full flex flex-row justify-between font-light ${isReadOnly ? "text-zinc-500" : ""}`}
                    >
                      {field.value
                        ? (() => {
                            const selectedEmployer = employerSelects?.find(
                              (employer) => employer.id === field.value,
                            );

                            return selectedEmployer
                              ? selectedEmployer.fullName
                              : "เลือกนายจ้าง";
                          })()
                        : "เลือกนายจ้าง"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="ค้นหาชื่อหรือนามสกุล..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>ไม่พบนายจ้าง</CommandEmpty>
                        <CommandGroup>
                          {employerSelects?.map((employer) => (
                            <CommandItem
                              key={employer.id}
                              value={employer.id}
                              onSelect={() => {
                                field.onChange(employer.id);

                                // Clear selected employees when employer changes
                                setSelectedEmployeeIds([]);

                                // Set the selected employer ID to trigger API query
                                setSelectedEmployerId(employer.id);

                                // Reset pagination when employer changes
                                setPage(0);
                              }}
                            >
                              {employer.fullName}
                              <Check
                                className={`ml-auto ${
                                  employer.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.employerId && (
                  <span className="text-red-500 font-light">
                    {errors.employerId.message}
                  </span>
                )}
              </div>
            )}
          />

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
              ".",
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
