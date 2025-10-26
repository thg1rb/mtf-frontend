"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Users, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login, isLoading: isLoadingLogin, isAuthenticated, user, isLoading } = useAuth();

  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "ADMIN") {
        router.push("/agents");
      } else if (user.role === "AGENT") {
        router.push("/tasks");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        await login(email, password);
        setLoginError(null);
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      }
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Don't show login form if user is authenticated (they will be redirected)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-[1000px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center px-4">
          <div className="w-1/2 hidden lg:flex flex-col gap-y-[18px]">
            <div className="flex flex-row items-center gap-x-[12px]">
              <div className="flex flex-col justify-center items-center w-14 h-14 bg-black rounded-[12px]">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="font-medium">MTF Manpower</p>
                <p className="font-light">ระบบจัดการเอกสารแรงงานต่างด้าว</p>
              </div>
            </div>
            <div className="font-normal !text-lg text-zinc-500">
              <p>
                ระบบจัดการเอกสารแรงงานต่างด้าวจากประเทศเมียนม่า ลาว
                <br />
                และกัมพูชา ที่จะช่วยทำให้การจัดการเอกสารเป็นระบบระเบียบ
                <br />
                ราบรื่น และถูกต้อง
              </p>
            </div>
            <div className="flex flex-col gap-y-[10px] px-[53px]">
              <div className="flex flex-col">
                <p className="font-normal !text-[18px]">
                  จัดการข้อมูลแรงงานและเอกสาร
                </p>
                <p className="font-light text-zinc-400">
                  เพิ่ม แก้ไข และติดตามข้อมูลของนายจ้างและลูกจ้างได้ในระบบเดียว
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-normal !text-[18px]">
                  ติดตามความคืบหน้าการดำเนินงาน
                </p>
                <p className="font-light text-zinc-400">
                  แสดงสถานะและขั้นตอนปัจจุบัน ช่วยให้นายหน้าตรวจสอบได้สะดวก
                </p>
              </div>
              <div className="flex flex-col">
                <p className="font-normal !text-[18px]">
                  แจ้งเตือนอัตโนมัติเมื่อเอกสารใกล้หมดอายุ
                </p>
                <p className="font-light text-zinc-400">
                  ลดปัญหาการลืมวันหมดอายุ และช่วยป้องกันความผิดพลาด
                </p>
              </div>
            </div>
          </div>

          <div className="w-[350px] lg:w-1/2 flex flex-col gap-y-[32px] bg-white px-[36px] lg:px-[48px] py-[24px] lg:py-[36px] rounded-2xl border-[1px] shadow-2xl">
            <div className="flex flex-col items-center gap-y-[8px]">
              <p className="font-medium">เข้าสู่ระบบ</p>
              <p className="font-light text-center text-zinc-400">
                กรุณาเข้าสู่ระบบเพื่อจัดการแรงงานต่างด้าว
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="email" className="font-light">
                  อีเมล
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="กรุณากรอกอีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <Label htmlFor="password" className="font-light">
                  รหัสผ่าน
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="กรุณากรอกรหัสผ่าน"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="font-light"
              disabled={isLoadingLogin}
            >
              {isLoadingLogin ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </div>
        </div>
      </form>

      {/* Alert Dialog If Login Failed */}
      <AlertDialog
        open={!!loginError}
        onOpenChange={(open) => !open && setLoginError(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p className="font-normal">การเข้าสู่ระบบล้มเหลว</p>
            </AlertDialogTitle>
            <AlertDialogDescription className="font-light">
              {loginError}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setLoginError(null)}>
              <p className="font-light">ตกลง</p>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
