import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ConditionalSidebar } from "@/components/layout/ConditionalSidebar";
import { cookies } from "next/headers";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/contexts/AuthContext";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "MTF Manpower",
  description: "Foreign Employee Document Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value == "true";

  return (
    <html lang="en">
      <body className={`${kanit.variable} antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <ConditionalSidebar defaultOpen={defaultOpen}>
              {children}
            </ConditionalSidebar>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
