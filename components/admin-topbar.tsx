"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  Bell,
  Search,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export function AdminTopbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* === Middle: Search Bar === */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-72 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="bg-transparent outline-none text-sm text-gray-700 w-full"
          />
        </div>

        {/* === Right Section === */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-blue-50 text-gray-600"
          >
            <Bell className="w-5 h-5" />
          </Button>

          {/* Settings Button */}
          <Button
            variant="outline"
            size="sm"
            className="border-blue-200 hover:bg-blue-50 bg-transparent text-sm font-medium"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>

          {/* === Avatar Dropdown === */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="ring-2 ring-blue-100 shadow-sm cursor-pointer">
                <AvatarImage src="/placeholder-32px.png" alt="Admin Avatar" />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 mt-2" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleLogout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
