"use client";
import type React from "react";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { loadTokens } from "@/redux/features/authSlice";
import { store } from "@/redux/store";
import { ReduxProvider } from "./redux_provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

store.dispatch(loadTokens());

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600"],
});

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
      className={`${poppins.variable} ${nunito.variable} antialiased`}
    >
      <ReduxProvider>
        <body className="font-sans">
          {children}
          <Toaster />
        </body>
      </ReduxProvider>
    </html>
  );
}

// export const metadata = {
//   generator: "v0.app",
// };
