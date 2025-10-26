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
import { AgentFormData, agentSchema } from "@/lib/validations";
import { Home, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import { createAgentQueryOption, updateAgentQueryOption } from "@/lib/api";
import {
  transformFormDataToCreateAgentRequest,
  transformFormDataToUpdateAgentRequest
} from "@/lib/api/agents/utils";

interface AgentFormProps {
  mode: "create" | "view" | "edit";
  defaultValues?: Partial<AgentFormData>;
  agentId?: string; // Required for edit mode
}

export default function AgentForm({ mode, defaultValues, agentId }: AgentFormProps) {
  const router = useRouter();
  const [showValidationAlert, setShowValidationAlert] = useState(false);

  // Define mutations
  const createMutation = useMutation({
    ...createAgentQueryOption(),
    onSuccess: () => {
      router.push("/agents");
    },
    onError: (error) => {
      console.error("Create agent failed:", error);
    },
  });

  const updateMutation = useMutation({
    ...updateAgentQueryOption(agentId!),
    onSuccess: () => {
      router.push("/agents");
    },
    onError: (error) => {
      console.error("Update agent failed:", error);
    },
  });

  const cleanedDefaultValues: Partial<AgentFormData> = useMemo(
    () => ({
      citizenId: defaultValues?.citizenId ?? "",
      email: defaultValues?.email ?? "",
      firstname: defaultValues?.firstname ?? "",
      lastname: defaultValues?.lastname ?? "",
      status: defaultValues?.status ?? "ACTIVE",
      addressDetails: defaultValues?.addressDetails ?? "",
      subDistrict: defaultValues?.subDistrict ?? "",
      district: defaultValues?.district ?? "",
      province: defaultValues?.province ?? "",
      postelCode: defaultValues?.postelCode ?? "",
    }),
    [defaultValues],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: cleanedDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(cleanedDefaultValues);
  }, [cleanedDefaultValues, reset]);

  // Form submit successfully (There is no invalid input)
  const handleFormSubmit = async (data: AgentFormData) => {
    setShowValidationAlert(false);

    try {
      if (mode === "create") {
        const createRequest = transformFormDataToCreateAgentRequest(data);
        await createMutation.mutateAsync(createRequest);
      } else if (mode === "edit") {
        if (!agentId) {
          throw new Error("Agent ID is required for edit mode");
        }
        const updateRequest = transformFormDataToUpdateAgentRequest(data);
        await updateMutation.mutateAsync(updateRequest);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  // Form submit failed (There are invalid input )
  const handleFormInvalid = () => {
    setShowValidationAlert(true);
  };

  const isReadOnly = mode === "view";
  const isLoading = createMutation.isPending || updateMutation.isPending;
  const hasError = createMutation.isError || updateMutation.isError;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
      className="flex flex-col gap-y-[29px] md:gap-y-[45px]"
    >
      {/* PersonalInfoSection */}
      <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
        <div className="flex flex-row gap-x-[5px] items-center">
          <Info />
          <p className="font-normal">ข้อมูลนายหน้า</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="citizenId" className="font-light text-zinc-700">
              เลขประจำตัวประชาชน (13 หลัก)
            </Label>
            <Input
              readOnly={isReadOnly}
              maxLength={13}
              id="citizenId"
              {...register("citizenId")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.citizenId && (
              <span className="text-red-500 font-light">
                {errors.citizenId.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="email" className="font-light text-zinc-700">
              อีเมล
            </Label>
            <Input
              readOnly={isReadOnly}
              type="email"
              id="email"
              {...register("email")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.email && (
              <span className="text-red-500 font-light">
                {errors.email.message}
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
            name="status"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="status" className="font-light text-zinc-700">
                  สถานะ
                </Label>
                <Select
                  disabled={isReadOnly}
                  value={field.value} // ผูกค่า value จาก react-hook-form
                  onValueChange={field.onChange} // update ค่ากลับเข้า form
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
          <Home />
          <p className="font-normal">ข้อมูลที่อยู่</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
          <div className="flex flex-col gap-y-[10px]">
            <Label
              htmlFor="addressDetails"
              className="font-light text-zinc-700"
            >
              บ้านเลขที่, หมู่, ซอย, ถนน [ภาษาไทย]
            </Label>
            <Input
              readOnly={isReadOnly}
              id="addressDetails"
              {...register("addressDetails")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.addressDetails && (
              <span className="text-red-500 font-light">
                {errors.addressDetails.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="district" className="font-light text-zinc-700">
              เขต/อำเภอ
            </Label>
            <Input
              readOnly={isReadOnly}
              id="district"
              {...register("district")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.district && (
              <span className="text-red-500 font-light">
                {errors.district.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="subDistrict" className="font-light text-zinc-700">
              แขวง/ตำบล
            </Label>
            <Input
              readOnly={isReadOnly}
              id="subDistrict"
              {...register("subDistrict")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.subDistrict && (
              <span className="text-red-500 font-light">
                {errors.subDistrict.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="province" className="font-light text-zinc-700">
              จังหวัด
            </Label>
            <Input
              readOnly={isReadOnly}
              id="province"
              {...register("province")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.province && (
              <span className="text-red-500 font-light">
                {errors.province.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-[10px]">
            <Label htmlFor="postelCode" className="font-light text-zinc-700">
              รหัสไปรษณีย์
            </Label>
            <Input
              readOnly={isReadOnly}
              maxLength={5}
              id="postelCode"
              {...register("postelCode")}
              className={`${isReadOnly ? "text-zinc-500" : ""}`}
            />
            {errors.postelCode && (
              <span className="text-red-500 font-light">
                {errors.postelCode.message}
              </span>
            )}
          </div>
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
            <Link href="/agents">ยกเลิก</Link>
          </Button>
          <Button type="submit" disabled={isLoading} className="font-light">
            {isLoading
              ? (mode === "create" ? "กำลังบันทึกข้อมูล..." : "กำลังบันทึกการแก้ไข...")
              : (mode === "create" ? "บันทึกข้อมูล" : "บันทึกการแก้ไข")
            }
          </Button>

          {hasError && (
            <AlertDialog open={hasError} onOpenChange={() => {}}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-medium">
                    {mode === "create" ? "เพิ่มนายหน้าใหม่ไม่สำเร็จ!" : "แก้ไขข้อมูลนายหน้าไม่สำเร็จ!"}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="font-light">
                    เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="font-light"
                    onClick={() => {
                      createMutation.reset();
                      updateMutation.reset();
                    }}
                  >
                    ตกลง
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <AlertDialog
            open={showValidationAlert}
            onOpenChange={setShowValidationAlert}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-medium">
                  {mode === "create"
                    ? "เพิ่มนายหน้าใหม่ไม่สำเร็จ!"
                    : "แก้ไขข้อมูลนายหน้าไม่สำเร็จ!"}
                </AlertDialogTitle>
                <AlertDialogDescription className="font-light">
                  ระบุข้อมูลของนายหน้าให้ครบถ้วนและตรวจสอบรูปแบบของข้อมูลของนายหน้าให้ถูกต้องก่อนคลิก{" "}
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
        </div>
      )}
    </form>
  );
}
