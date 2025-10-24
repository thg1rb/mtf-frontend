"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  ChevronsUpDown,
  Edit,
  Eye,
  FileText,
  Info,
  MoreHorizontal,
  Search,
  Trash2,
  Users2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { TableSkeleton } from "../shared/TableSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  createWorkMutationOptions,
  completeStepMutationOptions,
  getEmployeesByEmployerIdQueryOption,
  getEmployerSelectsQueryOption,
} from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateWorkRequest } from "@/lib/api/works/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getBillDetailsQueryOption } from "@/lib/api/bills/bills";
import { BillResponse } from "@/lib/api/bills/types";

interface TaskFormProps {
  typeOfTask: "register" | "renew";
  mode: "create" | "view" | "edit";
  defaultValues?: Partial<TaskFormData>;
  workId?: string; // Added for view/edit modes to fetch bills
}

export default function TaskFormNew({
  typeOfTask,
  mode,
  defaultValues,
  workId,
}: TaskFormProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(0); // Start with 0

  // Input states (what user types)
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>(" "); // Default to "All"

  // Filter states (applied on search button click)
  const [searchFullName, setSearchFullName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [selectedEmployerId, setSelectedEmployerId] = useState<string>("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema) as Resolver<TaskFormData>,
    defaultValues: {
      employerId: defaultValues?.employerId ?? "",
      description: defaultValues?.description ?? "",
      employeeIds: defaultValues?.employeeIds ?? [],
      currentStepIndex: defaultValues?.currentStepIndex ?? 1,
    },
    mode: "onChange",
  });

  const { data: employerSelects, isLoading: isLoadingEmployerSelects } =
    useQuery(getEmployerSelectsQueryOption());
  const {
    data: employeesByEmployerId,
    isLoading: isLoadingEmployeesByEmployerId,
  } = useQuery(
    getEmployeesByEmployerIdQueryOption(selectedEmployerId || "not-found", {
      page,
      size: 5,
      nameContains: searchFullName || undefined,
      status:
        filterStatus && filterStatus.trim() !== ""
          ? (filterStatus as "ACTIVE" | "INACTIVE")
          : undefined,
    }),
  );

  // Fetch bills data for view/edit modes (only when workId is available)
  const { data: billsData = [] } = useQuery({
    ...getBillDetailsQueryOption(workId ? { workId } : undefined),
    enabled: !!workId, // Only fetch when workId exists
  });

  // Define mutations at component level (not inside handlers)
  const createMutation = useMutation({
    ...createWorkMutationOptions,
    onSuccess: () => {
      router.push("/tasks");
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  
  // Complete step mutation
  const completeStepMutation = useMutation({
    ...completeStepMutationOptions,
    onSuccess: () => {
      // Refresh the page to show updated step status
      router.refresh();
    },
    onError: (error) => {
      console.error("Complete step failed:", error);
    },
  });

  // Handle search button click
  const handleSearch = () => {
    setSearchFullName(searchTerm);
    setFilterStatus(statusInput);
    setPage(0); // Reset to first page on new search
  };

  // Handle Enter key in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      e.stopPropagation(); // Stop event propagation
      handleSearch();
    }
  };

  // Load employees when component mounts (for view/edit mode)
  useEffect(() => {
    if (defaultValues?.employerId) {
      setSelectedEmployerId(defaultValues.employerId);
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
      // Transform form data to match API request format
      const payload: CreateWorkRequest = {
        agentId: "1234567890126", // TODO: Get from auth context
        employerId: data.employerId, // Use the selected employer ID from form
        workType:
          typeOfTask === "register"
            ? "ขึ้นทะเบียนใหม่"
            : "ต่ออายุใบอนุญาตทำงาน",
        currentStepIndex: 1, // Get the current step number
        // currentStep: "รวบรวมเอกสารเพิ่มเติม",
        detail: data.description,
        employeeIds: data.employeeIds,
      };

      createMutation.mutate(payload);
    } else if (mode === "edit") {
      // TODO: PUT method `api/employers/{id}`
      router.push("/tasks");
    }
  };

  // Form submit failed (There are invalid input )
  const handleFormInvalid = () => {
    setShowValidationAlert(true);
  };

  // Helper functions for button states and actions
  const getCurrentStepBill = () => {
    if (!workId || !defaultValues?.currentStepIndex) return null;
    return billsData?.find(
      (bill: BillResponse) => bill.stepIndex === defaultValues.currentStepIndex,
    );
  };

  const getCurrentStepBillId = () => {
    const currentBill = getCurrentStepBill();
    return currentBill?.id;
  };

  // Button handlers
  const handlePayBill = () => {
    const billId = getCurrentStepBillId();
    if (billId) {
      router.push(`/receipts/${billId}`);
    }
  };

  const handleCompleteStep = () => {
    if (workId) {
      completeStepMutation.mutate(workId);
    }
  };

  // Determine what button to show
  const getActionButtonConfig = () => {
    if (mode === "create") {
      return {
        text: "เริ่มดำเนินการ",
        action: () => {}, // Will be handled by form submit
        disabled: false,
        isSubmitButton: true,
      };
    }

    // For both view and edit modes
    if (mode === "view" || mode === "edit") {
      const currentStepBill = getCurrentStepBill();

      // If there's no bill for current step, show complete button
      if (!currentStepBill) {
        return {
          text: "เสร็จสิ้น",
          action: handleCompleteStep,
          disabled: false,
          isSubmitButton: false,
        };
      }

      // If bill exists but not paid, show pay button
      if (currentStepBill.status === "NOT_PAID") {
        return {
          text: "ชำระเงิน",
          action: handlePayBill,
          disabled: false,
          isSubmitButton: false,
        };
      }

      // If bill is paid, show complete button
      if (currentStepBill.status === "PAID") {
        return {
          text: "เสร็จสิ้น",
          action: handleCompleteStep,
          disabled: false,
          isSubmitButton: false,
        };
      }
    }

    return {
      text: "เริ่มดำเนินการ",
      action: () => {},
      disabled: false,
      isSubmitButton: true,
    };
  };

  const isReadOnly = mode === "view";
  const actionButtonConfig = getActionButtonConfig();

  const totalSteps = typeOfTask === "register" ? 4 : 5;
  const MappingSequenceOfStepLabels = {
    register: [
      "รวบรวมเอกสารเพิ่มเติม",
      "ตรวจสอบโรคและซื้อประกันสุขภาพ",
      "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)",
      "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)",
    ],
    renew: [
      "รวบรวมเอกสารเพิ่มเติม",
      "ตรวจสอบโรคและซื้อประกันสุขภาพ",
      "ยื่น Calling Visa กับกรมแรงงาน",
      "ซื้อใบอนุญาตการทำงานกับกรมแรงงาน",
      "ตีซ่าตรวจคนเข้าเมือง",
    ],
  };
  const stepsMapping = () => {
    return Array.from({ length: totalSteps }, (_, i) => {
      return {
        number: i + 1,
        label: MappingSequenceOfStepLabels[typeOfTask][i],
      };
    });
  };

  // TODO: Loading Component (Skeleton)
  if (isLoadingEmployerSelects) {
    return <div>Loading...</div>;
  }

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
          <div className="flex flex-col gap-y-[20px] p-[20px] border rounded-2xl shadow-lg">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-x-[5px]">
                <Users2 />
                <p className="font-normal">
                  {isReadOnly ? "รายชื่อลูกจ้างที่เลือก" : "ค้นหาลูกจ้าง"}
                </p>
              </div>
              <p className="font-light text-zinc-400">
                {isReadOnly
                  ? "ลูกจ้างที่เลือกสำหรับงานนี้"
                  : "ค้นหาจากส่วนหนึ่งของชื่อหรือนามสกุล"}
              </p>
            </div>
            {!isReadOnly && (
              <div className="flex flex-row gap-x-[14px] md:gap-x-[26px]">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    className="pl-10"
                    placeholder="ค้นหาลูกจ้างที่ต้องการ..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <Select value={statusInput} onValueChange={setStatusInput}>
                  <SelectTrigger className="font-light cursor-pointer">
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" " className="cursor-pointer">
                      ทั้งหมด
                    </SelectItem>
                    <SelectItem value="ACTIVE" className="cursor-pointer">
                      ใช้งาน
                    </SelectItem>
                    <SelectItem value="INACTIVE" className="cursor-pointer">
                      ไม่ใช้งาน
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  className="font-light cursor-pointer"
                  onClick={handleSearch}
                >
                  ค้นหา
                </Button>
              </div>
            )}

            {/* Employees Table */}
            {isReadOnly ? (
              // View mode - show only selected employees
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
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
                    {selectedEmployeeIds.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-center py-8 text-muted-foreground"
                        >
                          ไม่ได้เลือกลูกจ้าง
                        </TableCell>
                      </TableRow>
                    ) : (
                      employeesByEmployerId?.content
                        .filter((employee) =>
                          selectedEmployeeIds.includes(employee.id),
                        )
                        .map((employee) => {
                          return (
                            <TableRow
                              key={employee.id}
                              className="cursor-pointer"
                            >
                              <TableCell className="font-light px-[20px]">
                                {employee.fullName}
                              </TableCell>
                              <TableCell className="font-light px-[20px]">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    employee.status === "ACTIVE"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-200 text-red-800"
                                  }`}
                                >
                                  {employee.status === "ACTIVE"
                                    ? "ใช้งาน"
                                    : "ไม่ใช้งาน"}
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
            ) : // Edit/Create mode - show searchable employees table
            isLoadingEmployeesByEmployerId ? (
              <TableSkeleton rows={5} columns={4} />
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-[20px] font-normal">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            disabled={!employeesByEmployerId?.content?.length}
                            checked={
                              employeesByEmployerId?.content &&
                              employeesByEmployerId.content.length > 0 &&
                              selectedEmployeeIds.length ===
                                employeesByEmployerId.content.length
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Select all
                                const allIds =
                                  employeesByEmployerId?.content.map(
                                    (emp) => emp.id,
                                  );
                                setSelectedEmployeeIds(allIds || []);
                              } else {
                                // Deselect all
                                setSelectedEmployeeIds([]);
                              }
                            }}
                          />
                          <span>เลือก</span>
                        </div>
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
                    {!employeesByEmployerId?.content ||
                    employeesByEmployerId.content.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-8 text-muted-foreground"
                        >
                          ไม่พบข้อมูลลูกจ้าง
                        </TableCell>
                      </TableRow>
                    ) : (
                      employeesByEmployerId.content.map((employee) => {
                        return (
                          <TableRow
                            key={employee.id}
                            className="cursor-pointer"
                          >
                            <TableCell className="font-light px-[20px]">
                              <Checkbox
                                checked={selectedEmployeeIds.includes(
                                  employee.id,
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked)
                                    setSelectedEmployeeIds((prev) => [
                                      ...prev,
                                      employee.id,
                                    ]);
                                  else
                                    setSelectedEmployeeIds((prev) =>
                                      prev.filter((id) => id !== employee.id),
                                    );
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-light px-[20px]">
                              {employee.fullName}
                            </TableCell>
                            <TableCell className="font-light px-[20px]">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  employee.status === "ACTIVE"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-200 text-red-800"
                                }`}
                              >
                                {employee.status === "ACTIVE"
                                  ? "ใช้งาน"
                                  : "ไม่ใช้งาน"}
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
                                    <Link
                                      href={`/employees/${employee.id}/edit`}
                                    >
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
            )}

            {errors.employeeIds && (
              <span className="text-red-500 font-light px-2">
                {errors.employeeIds.message}
              </span>
            )}

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-y-[5px] px-2">
                {!isReadOnly && (
                  <p className="font-light text-zinc-500">
                    หน้า {page + 1} จาก {employeesByEmployerId?.totalPages}
                  </p>
                )}
                <p className="font-light text-zinc-500">
                  {isReadOnly
                    ? `รายชื่อลูกจ้างที่เลือก ${selectedEmployeeIds.length} คน`
                    : `เลือกแล้ว ${selectedEmployeeIds.length} คน จากทั้งหมด ${employeesByEmployerId?.totalElements || 0} คน`}
                </p>
              </div>
              {/* Pagination - only show in edit/create mode */}
              {!isReadOnly &&
                employeesByEmployerId &&
                employeesByEmployerId.totalPages !== 0 &&
                employeesByEmployerId.totalPages > 1 && (
                  <div className="flex flex-row gap-x-[10px]">
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="font-light border cursor-pointer"
                      disabled={page === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      กลับ
                    </Button>
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="font-light border cursor-pointer"
                      disabled={page >= employeesByEmployerId.totalPages - 1}
                      onClick={() =>
                        setPage((p) =>
                          Math.min(employeesByEmployerId.totalPages - 1, p + 1),
                        )
                      }
                    >
                      ถัดไป
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* StepCompletedSection */}
        <div className="flex-1">
          <div className="flex flex-col gap-y-[40px] w-full p-[27px] border border-slate-300 rounded-2xl shadow-md">
            <div className="flex flex-col">
              <div className="flex flex-row gap-x-[5px] items-center">
                <FileText />
                <p className="font-normal">ขั้นตอนการดำเนินการ</p>
              </div>
              <p className="font-light text-zinc-400">
                ขั้นตอนทั้งหมดสำหรับการต่ออายุใบอนุญาตทำงาน
              </p>
            </div>
            <div className="flex flex-col gap-y-[18px]">
              <div>
                {stepsMapping().map(
                  (step: { number: number; label: string }) => {
                    // Find the bill for this step (if any)
                    const stepBill = billsData?.find(
                      (bill: BillResponse) => bill.stepIndex === step.number,
                    );
                    const isPaid = stepBill?.status === "PAID";

                    // Determine current step
                    const currentStepIndex =
                      defaultValues?.currentStepIndex || 1;
                    const isCurrentStep = step.number === currentStepIndex;
                    const isCompletedStep = step.number < currentStepIndex;

                    // Determine step styling based on status
                    let stepStyle =
                      "bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0";
                    let stepTextStyle = "text-gray-700";
                    const labels = [];

                    if (isCurrentStep) {
                      if (isPaid) {
                        stepStyle =
                          "bg-green-200 w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0";
                        stepTextStyle = "text-green-800";
                        labels.push(
                          <div
                            key="current"
                            className="bg-green-200 p-[5px] rounded-md"
                          >
                            <p className="font-light text-green-700">
                              ขั้นตอนปัจจุบัน
                            </p>
                          </div>,
                        );
                        labels.push(
                          <div
                            key="paid"
                            className="bg-green-200 p-[5px] rounded-md"
                          >
                            <p className="font-light text-green-700">
                              ชำระแล้ว
                            </p>
                          </div>,
                        );
                      } else {
                        stepStyle =
                          "bg-sky-200 w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0";
                        stepTextStyle = "text-sky-800";
                        labels.push(
                          <div
                            key="current"
                            className="bg-sky-200 p-[5px] rounded-md"
                          >
                            <p className="font-light text-sky-700">
                              ขั้นตอนปัจจุบัน
                            </p>
                          </div>,
                        );
                      }
                    } else if (isCompletedStep) {
                      stepStyle =
                        "bg-black w-12 h-12 rounded-full flex items-center justify-center font-medium flex-shrink-0";
                      stepTextStyle = "text-white";
                      labels.push(
                        <div
                          key="paid"
                          className="bg-green-200 p-[5px] rounded-md"
                        >
                          <p className="font-light text-green-700">ชำระแล้ว</p>
                        </div>,
                      );
                    }
                    // Future steps keep the default gray style with no labels

                    return (
                      <div key={step.number} className="flex flex-col">
                        <div className="flex flex-row items-center gap-x-3">
                          <div className={stepStyle}>
                            <p className={stepTextStyle}>{step.number}</p>
                          </div>
                          <div>
                            <div className="flex flex-col">
                              <div className="flex flex-row gap-x-[5px]">
                                <p className="font-normal">
                                  ขั้นตอนที่ {step.number}
                                </p>
                                {labels}
                              </div>
                              <p className="font-light">{step.label}</p>
                            </div>
                          </div>
                        </div>
                        {step.number !== totalSteps ? (
                          <div className="w-[1px] h-10 ml-[23px] my-[10px] bg-zinc-300"></div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CompletedOrPaidButtonSection */}
      {mode !== "create" && (
        <div className="flex flex-col md:flex-row gap-x-[10px] gap-y-[10px] justify-end">
          <Button
            type="button"
            variant="ghost"
            className="font-light border border-slate-300"
            onClick={() => router.back()}
          >
            ยกเลิก
          </Button>
          {actionButtonConfig.isSubmitButton ? (
            <Button
              type="submit"
              className="font-light"
              disabled={actionButtonConfig.disabled || createMutation.isPending}
            >
              {createMutation.isPending
                ? "กำลังดำเนินการ..."
                : actionButtonConfig.text}
            </Button>
          ) : (
            <Button
              type="button"
              className="font-light"
              onClick={actionButtonConfig.action}
              disabled={
                actionButtonConfig.disabled ||
                completeStepMutation.isPending
              }
            >
              {completeStepMutation.isPending
                ? "กำลังดำเนินการ..."
                : actionButtonConfig.text}
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
