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
import { WorkPermitFormData, workPermitSchema } from "@/lib/validations";
import {
  BriefcaseBusiness,
  History,
  MessageSquareWarning,
  Printer,
  Save,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, type Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  HighestEducation,
  highestEducationMappingRecord,
  WorkPermit,
} from "@/types";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../shared/DatePicker";
import { GetWorkPermit46HistoryResponse } from "@/lib/api/documents/wp46/types";
import {
  createWorkPermit46MutationOptions,
  getWorkPermit46QueryOption,
} from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { CreateWorkPermit46Request } from "@/lib/api/documents/wp46/types";

const toDateOrNull = (value: string | Date | null | undefined): Date | null => {
  if (!value) return null;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }
  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? null : parsed;
};

export default function WorkPermitForm({
  id,
  workPermitHistory,
}: {
  id: string;
  workPermitHistory: GetWorkPermit46HistoryResponse;
}) {
  const router = useRouter();
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [selectedPermitId, setSelectedPermitId] = useState<string | null>(null);

  // Fetch work permit details when a permit is selected
  const { data: workPermitData } = useQuery({
    ...getWorkPermit46QueryOption(selectedPermitId || ""),
    enabled: !!selectedPermitId,
  });

  // Define mutations at component level (not inside handlers)
  const createMutation = useMutation({
    ...createWorkPermit46MutationOptions,
    onSuccess: () => {
      router.push("/employees");
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<WorkPermitFormData>({
    resolver: zodResolver(workPermitSchema) as Resolver<WorkPermitFormData>,
    mode: "onChange",
  });

  // Populate form when workPermitData is loaded
  useEffect(() => {
    if (workPermitData) {
      setValue("typeOfWork", workPermitData.typeOfWork);
      setValue("natureOfWork", workPermitData.natureOfWork);
      setValue("periodOfEmploymentYear", workPermitData.periodOfEmploymentYear);
      setValue(
        "periodOfEmploymentMonth",
        workPermitData.periodOfEmploymentMonth
      );
      setValue("periodOfEmploymentDay", workPermitData.periodOfEmploymentDay);
      setValue("employmentValidUntil", workPermitData.employmentValidUntil);
      setValue("incomePerDay", workPermitData.incomePerDay);
      setValue("benefitPerDay", workPermitData.benefitPerDay);
      setValue("highestEducation", workPermitData.highestEducation);
      setValue("workExperiences", workPermitData.workExperience);
      setValue(
        "reasonOfNotEmployingThaiPerson",
        workPermitData.reasonForNotEmployingThaiPerson
      );
    }
  }, [workPermitData, setValue]);

  // Transform form data to API request format
  const transformToCreateRequest = (
    data: WorkPermitFormData
  ): CreateWorkPermit46Request => {
    // Convert employmentValidUntil to YYYY-MM-DD format
    const dateOnly = data.employmentValidUntil.split("T")[0];

    return {
      passportNo: id, // Employee's passport number
      employerId: workPermitData?.employerSnapshot?.id || "", // Get from loaded work permit data
      typeOfWork: data.typeOfWork,
      natureOfWork: data.natureOfWork,
      periodOfEmploymentYear: data.periodOfEmploymentYear,
      periodOfEmploymentMonth: data.periodOfEmploymentMonth,
      periodOfEmploymentDay: data.periodOfEmploymentDay,
      employmentValidUntil: dateOnly,
      incomePerDay: data.incomePerDay,
      benefitPerDay: data.benefitPerDay,
      highestEducation: data.highestEducation,
      workExperience: data.workExperiences,
      reasonForNotEmployingThaiPerson: data.reasonOfNotEmployingThaiPerson,
    };
  };

  // Form submit successfully (There is no invalid input)
  const handleFormSubmit = (data: WorkPermitFormData) => {
    setShowValidationAlert(false);

    const payload = transformToCreateRequest(data);
    createMutation.mutate(payload);
  };

  // Form submit failed (There are invalid input )
  const handleFormInvalid = () => {
    setShowValidationAlert(true);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
      className="flex flex-col lg:flex-row gap-[45px]"
    >
      <div className="flex-2 flex flex-col gap-y-[29px] md:gap-y-[45px]">
        {/* EmploymentInfoSection */}
        <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
          <div className="flex flex-row gap-x-[5px] items-center">
            <BriefcaseBusiness />
            <p className="font-normal">ข้อมูลการจ้าง</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
            <div className="flex flex-col gap-y-[10px]">
              <Label htmlFor="typeOfWork" className="font-light text-zinc-700">
                ประเภทงาน
              </Label>
              <Input id="typeOfWork" {...register("typeOfWork")} />
              {errors.typeOfWork && (
                <span className="text-red-500 font-light">
                  {errors.typeOfWork.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="natureOfWork"
                className="font-light text-zinc-700"
              >
                ลักษณะงาน
              </Label>
              <Input id="natureOfWork" {...register("natureOfWork")} />
              {errors.natureOfWork && (
                <span className="text-red-500 font-light">
                  {errors.natureOfWork.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="periodOfEmploymentYear"
                className="font-light text-zinc-700"
              >
                ระยะเวลาจ้าง (ปี)
              </Label>
              <Input
                id="periodOfEmploymentYear"
                {...register("periodOfEmploymentYear", { valueAsNumber: true })}
                type="number"
                min={0}
              />
              {errors.periodOfEmploymentYear && (
                <span className="text-red-500 font-light">
                  {errors.periodOfEmploymentYear.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="periodOfEmploymentMonth"
                className="font-light text-zinc-700"
              >
                ระยะเวลาจ้าง (เดือน)
              </Label>
              <Input
                id="periodOfEmploymentMonth"
                {...register("periodOfEmploymentMonth", {
                  valueAsNumber: true,
                })}
                type="number"
                min={0}
                max={11}
              />
              {errors.periodOfEmploymentMonth && (
                <span className="text-red-500 font-light">
                  {errors.periodOfEmploymentMonth.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="periodOfEmploymentDay"
                className="font-light text-zinc-700"
              >
                ระยะเวลาจ้าง (วัน)
              </Label>
              <Input
                id="periodOfEmploymentDay"
                {...register("periodOfEmploymentDay", { valueAsNumber: true })}
                type="number"
                min={0}
                max={30}
              />
              {errors.periodOfEmploymentDay && (
                <span className="text-red-500 font-light">
                  {errors.periodOfEmploymentDay.message}
                </span>
              )}
            </div>

            <Controller
              name="employmentValidUntil"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-y-[10px]">
                  <Label
                    htmlFor="employmentValidUntil"
                    className="font-light text-zinc-700"
                  >
                    มีสัญญาจ้างถึงวันที่
                  </Label>
                  <DatePicker
                    value={toDateOrNull(field.value)}
                    onChange={(date) => field.onChange(date)}
                  />
                  {errors.employmentValidUntil && (
                    <span className="text-red-500 font-light">
                      {errors.employmentValidUntil?.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="incomePerDay"
                className="font-light text-zinc-700"
              >
                ค่าจ้างต่อวัน (บาท)
              </Label>
              <Input
                id="incomePerDay"
                {...register("incomePerDay", { valueAsNumber: true })}
                type="number"
                min={0}
              />
              {errors.incomePerDay && (
                <span className="text-red-500 font-light">
                  {errors.incomePerDay.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="benefitPerDay"
                className="font-light text-zinc-700"
              >
                ค่าผลประโยชน์ต่อวัน​ (บาท)
              </Label>
              <Input
                id="benefitPerDay"
                {...register("benefitPerDay", { valueAsNumber: true })}
                type="number"
                min={0}
              />
              {errors.benefitPerDay && (
                <span className="text-red-500 font-light">
                  {errors.benefitPerDay.message}
                </span>
              )}
            </div>

            <Controller
              name="highestEducation"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-y-[10px]">
                  <Label
                    htmlFor="highestEducation"
                    className="font-light text-zinc-700"
                  >
                    ระดับการศึกษาสูงสุด
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full font-light cursor-pointer">
                      <SelectValue placeholder="เลือกระดับการศึกษา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ประถมศึกษา">ประถมศึกษา</SelectItem>
                      <SelectItem value="มัธยมศึกษา">มัธยมศึกษา</SelectItem>
                      <SelectItem value="ปริญญาตรี">ปริญญาตรี</SelectItem>
                      <SelectItem value="ปริญญาโท">ปริญญาโท</SelectItem>
                      <SelectItem value="ปริญญาเอก">ปริญญาเอก</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.highestEducation && (
                    <span className="text-red-500 font-light">
                      {errors.highestEducation.message}
                    </span>
                  )}
                </div>
              )}
            />

            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="workExperiences"
                className="font-light text-zinc-700"
              >
                ประสบการณ์ทำงาน (ปี)
              </Label>
              <Input
                id="workExperiences"
                {...register("workExperiences", { valueAsNumber: true })}
                type="number"
                min={0}
              />
              {errors.workExperiences && (
                <span className="text-red-500 font-light">
                  {errors.workExperiences.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ReasonOfNotEmployingThaiPersonSection */}
        <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
          <div className="flex flex-row gap-x-[5px] items-center">
            <MessageSquareWarning />
            <p className="font-normal">
              เหตุผลที่ไม่จ้างบุคคลสัญชาติไทยเข้าทำงาน
            </p>
          </div>
          <div className="flex flex-col gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
            <div className="flex flex-col gap-y-[10px]">
              <Label
                htmlFor="reasonOfNotEmployingThaiPerson"
                className="font-light text-zinc-700"
              >
                ประสบการณ์ทำงาน (ปี)
              </Label>
              <Textarea
                id="reasonOfNotEmployingThaiPerson"
                {...register("reasonOfNotEmployingThaiPerson")}
                className="font-light hide-scrollbar"
              />
              {errors.reasonOfNotEmployingThaiPerson && (
                <span className="text-red-500 font-light">
                  {errors.reasonOfNotEmployingThaiPerson.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* OperationsSection*/}
      <div className="flex-1 flex flex-col gap-y-[25px] p-[27px] h-min border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Sparkles />
          <p className="font-normal">การดำเนินการ</p>
        </div>
        <div className="flex flex-col gap-y-[25px] ">
          <div className="flex flex-col gap-y-[18px]">
            {workPermitHistory.map((history) => (
              <Button
                key={history.id}
                type="button"
                variant="outline"
                className="flex flex-row justify-start font-light cursor-pointer"
                onClick={() => setSelectedPermitId(history.id)}
              >
                <History />
                {new Date(history.createdAt).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Button>
            ))}
            <Button
              type="submit"
              className="flex flex-row justify-start cursor-pointer"
            >
              <Save />
              <p className="font-light">บันทึกข้อมูลล่าสุด</p>
            </Button>
            <Button
              type="button"
              className="flex flex-row justify-start cursor-pointer"
            >
              <Printer />
              <p className="font-light">พิมพ์เอกสาร</p>
            </Button>

            <AlertDialog
              open={showValidationAlert}
              onOpenChange={setShowValidationAlert}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-medium">
                    บันทึกข้อมูลของเอกสาร บต. 46 ไม่สำเร็จ
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-light">
                    ระบุข้อมูลของนายจ้างให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลของนายจ้างให้ถูกต้องก่อนคลิก
                    บันทึกข้อมูล
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
        </div>
      </div>
    </form>
  );
}
