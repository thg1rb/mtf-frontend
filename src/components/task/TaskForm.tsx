"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  ChevronsUpDown,
  Edit,
  Eye,
  Info,
  MoreHorizontal,
  Search,
  Trash2,
  Users2,
} from "lucide-react";
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
import { TaskFormData, taskSchema } from "@/lib/validations/task";
import TaskSteps from "./TaskSteps";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Employee, Employer, Task } from "@/types";
import {
  getActiveEmployers,
  getCurrentStep,
  getEmployeesByEmployerId,
  getEmployerById,
  getEmployerFullNameByEmployerId,
  isPaidByTaskIdAndStep,
} from "@/lib/mock-data";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { isTaskCompleted } from "@/lib/utils/task";

interface TaskFormNewProps {
  typeOfTask: "register" | "renew";
  mode: "create" | "view" | "edit";
  task?: Task;
  defaultValues?: Partial<TaskFormData>;
}

export default function TaskFormNew({
  typeOfTask,
  mode,
  task,
  defaultValues,
}: TaskFormNewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [activeEmployers] =
    useState<Employer[]>(getActiveEmployers());
  const [employeesOfEmployer, setEmployeesOfEmployer] = useState<Employee[]>(
    []
  );
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const cleanedDefaultValues: Partial<TaskFormData> = useMemo(
    () => ({
      employerId: defaultValues?.employerId ?? "",
      description: defaultValues?.description ?? "",
      employeeIds: defaultValues?.employeeIds ?? selectedEmployeeIds,
      stepStartDates: defaultValues?.stepCompletedDates ?? [
        null,
        null,
        null,
        null,
        null,
      ],
    }),
    [defaultValues]
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema) as Resolver<TaskFormData>,
    defaultValues: cleanedDefaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset(cleanedDefaultValues);
  }, [cleanedDefaultValues, reset]);

  // Load employees when component mounts (for view/edit mode)
  useEffect(() => {
    if (defaultValues?.employerId) {
      setEmployeesOfEmployer(
        getEmployeesByEmployerId(defaultValues.employerId)
      );
    }
    if (defaultValues?.employeeIds) {
      setSelectedEmployeeIds(defaultValues.employeeIds);
    }
  }, [defaultValues?.employerId, defaultValues?.employeeIds]);

  // Sync selectedEmployeeIds with form value
  useEffect(() => {
    setValue("employeeIds", selectedEmployeeIds);
  }, [selectedEmployeeIds, setValue]);

  // Form submit successfully (There is no invalid input)
  const handleFormSubmit = (data: TaskFormData) => {
    setShowValidationAlert(false);
    if (mode === "create") {
      // TODO: POST method `api/employers`
    } else if (mode === "edit") {
      // TODO: PUT method `api/employers/{id}`
    }

    console.log("Form data:", data);

    router.push("/tasks");
  };

  // Form submit failed (There are invalid input )
  const handleFormInvalid = () => {
    setShowValidationAlert(true);
  };

  const isReadOnly = mode === "view";

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
      className="flex flex-col gap-y-[30px]"
    >
      <div className="flex flex-col lg:flex-row gap-[45px]">
        <div className="flex-2 flex flex-col gap-y-[29px] md:gap-y-[45px]">
          {/* EmploymentInfoSection */}
          <div className="flex flex-col gap-y-[25px] p-[27px] border border-slate-300 rounded-2xl shadow-md">
            <div className="flex flex-row gap-x-[5px] items-center">
              <Info />
              <p className="font-normal">ข้อมูลงาน</p>
            </div>
            {/* Combobox Employer */}
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
                              const selectedEmployer = getEmployerById(
                                field.value
                              );

                              return selectedEmployer
                                ? getEmployerFullNameByEmployerId(
                                    selectedEmployer.taxId
                                  )
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
                            {activeEmployers.map((activeEmployer) => (
                              <CommandItem
                                key={activeEmployer.taxId}
                                value={activeEmployer.taxId}
                                onSelect={() => {
                                  field.onChange(activeEmployer.taxId);

                                  // Clear selected employees when employer changes
                                  setSelectedEmployeeIds([]);

                                  // Load new employer's employees
                                  setEmployeesOfEmployer(
                                    getEmployeesByEmployerId(
                                      activeEmployer.taxId
                                    )
                                  );
                                }}
                              >
                                {getEmployerFullNameByEmployerId(
                                  activeEmployer.taxId
                                )}
                                <Check
                                  className={`ml-auto ${
                                    activeEmployer.taxId === field.value
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

            <div className="flex flex-col gap-x-[25px] md:gap-x-[50px] gap-y-[15px]">
              {/* Description  */}
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="desc" className="font-light text-zinc-700">
                  หมายเหตุ
                </Label>
                <Textarea
                  readOnly={isReadOnly}
                  id="desc"
                  {...register("description")}
                  className="font-light hide-scrollbar"
                />
                {errors.description && (
                  <span className="text-red-500 font-light">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* EmployeesTableSection */}
          {/* TODO: Pagination */}
          {/* TODO: filter agents by search or status */}
          <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-x-[5px]">
                <Users2 />
                <p className="font-normal">ค้นหาลูกจ้าง</p>
              </div>
              <p className="font-light text-zinc-400">
                ค้นหาจากส่วนหนึ่งของชื่อหรือนามสกุล
              </p>
            </div>
            <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="ค้นหานายจ้างที่ต้องการ..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <Button type="button" className="font-light cursor-pointer">
                ค้นหา
              </Button>
            </div>

            <div className="rounded-md border">
              {/* Employees Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-[20px] font-normal">
                      เลือก
                    </TableHead>
                    <TableHead className="px-[20px] font-normal">
                      ชื่อ-นามสกุล
                    </TableHead>
                    <TableHead className="px-[20px] font-normal">
                      สถานะ
                    </TableHead>
                    <TableHead className="px-[20px] font-normal text-right">
                      ดำเนินการ
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeesOfEmployer.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-8 text-muted-foreground"
                      >
                        ไม่พบข้อมูลลูกจ้าง
                      </TableCell>
                    </TableRow>
                  ) : (
                    employeesOfEmployer.map((employee) => {
                      return (
                        <TableRow key={employee.id} className="cursor-pointer">
                          <TableCell className="font-light px-[20px]">
                            <Checkbox
                              disabled={isReadOnly}
                              checked={selectedEmployeeIds.includes(
                                employee.id
                              )}
                              onCheckedChange={(checked) => {
                                if (checked)
                                  setSelectedEmployeeIds((prev) => [
                                    ...prev,
                                    employee.id,
                                  ]);
                                else
                                  setSelectedEmployeeIds((prev) =>
                                    prev.filter((id) => id !== employee.id)
                                  );
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-light px-[20px]">
                            {employee.firstname + " " + employee.lastname}
                          </TableCell>
                          <TableCell className="font-light px-[20px]">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                employee.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {employee.status === "active"
                                ? "ใช้งาน"
                                : "ไม่ได้ใช้งาน"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right px-[20px]">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                className="cursor-pointer"
                              >
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  asChild
                                  className="cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link href={`/employees/${employee.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    ดูข้อมูล
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  asChild
                                  className="cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link href={`/employees/${employee.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    แก้ไข
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive cursor-pointer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  ลบ
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {errors.employeeIds && (
              <span className="text-red-500 font-light px-2">
                {errors.employeeIds.message}
              </span>
            )}

            <div className="flex flex-row justify-between items-center">
              <p className="font-light text-zinc-500">
                เลือกแล้ว {selectedEmployeeIds.length} จากทั้งหมด{" "}
                {employeesOfEmployer.length} คน
              </p>
              <div className="flex flex-row gap-x-[10px]">
                <Button
                  variant={"ghost"}
                  type="button"
                  className="font-light border cursor-pointer"
                >
                  กลับ
                </Button>
                <Button
                  variant={"ghost"}
                  type="button"
                  className="font-light border cursor-pointer"
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Step Status Bar */}
        <div className="flex-1">
          {task && <TaskSteps
            task={task}
            stepCompletedDates={
              defaultValues?.stepCompletedDates ?? [
                null,
                null,
                null,
                null,
                null,
              ]
            }
          />}
        </div>
      </div>

      {/* SubmitAndCancelSection */}
      {mode !== "view" && (
        <div className="flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end">
          <Button
            asChild
            type="button"
            variant="ghost"
            className="font-light border border-slate-300"
          >
            <Link href="/tasks">ยกเลิก</Link>
          </Button>
          <Button type="submit" className="font-light">
            {mode === "create" ? "เริ่มดำเนินการ" : "บันทึกการแก้ไข"}
          </Button>
        </div>
      )}

      {/* View Mode Actions */}
      {/* TODO: ชำระเงินขั้นตอนแรกแล้ว แต่ยังแสดงปุ่ม "ชำระเงิน" */}
      {mode === "view" && task && !isTaskCompleted(task) && (
        <div className="flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end">
          {isPaidByTaskIdAndStep(
            task.id,
            getCurrentStep(task.stepCompletedDates)
          ) ? (
            <Button type="button" className="font-light">
              ดำเนินการเสร็จสิ้น
            </Button>
          ) : (
            <Button type="button" className="font-light">
              ชำระเงิน
            </Button>
          )}
        </div>
      )}

      {/* AlertDialogSection */}
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
            <AlertDialogAction className="font-light">ตกลง</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
