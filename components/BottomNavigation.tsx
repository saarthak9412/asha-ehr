"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, MessageSquare, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    icon: Home,
    label: "Home",
    href: "/home",
  },
  {
    icon: Users,
    label: "Patients",
    href: "/patients",
  },
  {
    icon: Calendar,
    label: "Reminders",
    href: "/reminders",
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/messages",
  },
  {
    icon: Settings,
    label: "Profile",
    href: "/profile",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50"
    >
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-6 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
