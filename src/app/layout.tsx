import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConditionalSidebar } from "@/components/layout/ConditionalSidebar";
import { cookies } from "next/headers";
import QueryProvider from "@/providers/query-provider";

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
          <SidebarProvider defaultOpen={defaultOpen}>
            <ConditionalSidebar>{children}</ConditionalSidebar>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
