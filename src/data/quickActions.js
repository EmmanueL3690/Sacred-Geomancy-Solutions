import { Binary, History, Heart, User } from "lucide-react";

export const quickActions = [
  {
    id: "action-submit",
    title: "Submit Numbers",
    description: "Submit your four numbers for guidance.",
    icon: Binary,
    path: "/app/submit",
    actionLabel: "Go",
  },
  {
    id: "action-history",
    title: "Submission History",
    description: "View all previous submissions.",
    icon: History,
    path: "/app/history",
    actionLabel: "View",
  },
  {
    id: "action-testimony",
    title: "Share Testimony",
    description: "Share your experience.",
    icon: Heart,
    path: "/app/testimonies",
    actionLabel: "Share",
  },
  {
    id: "action-profile",
    title: "My Profile",
    description: "Update your information.",
    icon: User,
    path: "/app/profile",
    actionLabel: "Manage",
  },
];