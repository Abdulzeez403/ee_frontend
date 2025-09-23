"use client";
import type React from "react";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { loadTokens } from "@/redux/features/authSlice";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { ReduxProvider } from "../redux_provider";

store.dispatch(loadTokens());

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <html
      lang="en"
      // className={`${poppins.variable} ${nunito.variable} antialiased`}
    >
      <ReduxProvider>
        <body className="font-sans">
          {children}
          <Toaster />
          <DashboardNav />
        </body>
      </ReduxProvider>
    </html>
  );
}
