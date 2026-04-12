"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  Edit3,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// ---------- TYPES ----------
type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  isCaps?: boolean;
};

type StatusItemProps = {
  icon: React.ReactNode;
  label: string;
  status: string;
};

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.cmAuth);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 text-center">
          <User className="w-12 h-12 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">
            Authenticating user...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">

      {/* HEADER */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
          <Shield className="w-3.5 h-3.5" /> Identity & Security
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">
          Your Personal Identity.
        </h1>

        <p className="text-muted-foreground font-medium max-w-xl">
          Manage your public appearance and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="space-y-8">

          {/* PROFILE CARD */}
          <div className="bg-card border rounded-[3rem] p-10 text-center group shadow-xl relative overflow-hidden">

            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full scale-110"></div>

           
            </div>

            <h2 className="text-2xl font-black mt-6">{user.name}</h2>

            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-[10px] font-bold uppercase">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Verified {user.role}
            </div>
          </div>

          {/* STATUS */}
          <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 space-y-6">
            <h4 className="text-sm font-black uppercase text-primary">
              Account Status
            </h4>

            <div className="space-y-4">
              <StatusItem
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Email Verified"
                status="Active"
              />

              <StatusItem
                icon={<Clock className="w-4 h-4" />}
                label="Member Since"
                status={
                  user.createdAt
                    ? new Date(user.createdAt).getFullYear().toString()
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-8 bg-card border rounded-[3rem] p-10">

          {/* BASIC INFO */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black">Basic Information</h3>

            <div className="grid md:grid-cols-2 gap-8">
              <InfoItem icon={<User />} label="Name" value={user.name} />
              <InfoItem icon={<Mail />} label="Email" value={user.email} />
              <InfoItem icon={<Shield />} label="Role" value={user.role} isCaps />
              <InfoItem icon={<Calendar />} label="Account" value="Pro User" />
            </div>
          </div>

          <hr />

          {/* BIO */}
          <div>
            <h3 className="text-2xl font-black mb-4">Bio</h3>

            <div className="p-6 bg-secondary/30 rounded-2xl">
              <p className="text-muted-foreground italic">
                {user.bio || "No bio added yet."}
              </p>
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full h-14 bg-secondary hover:bg-secondary/70 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase text-xs">
            Connect External Accounts <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

// ---------- COMPONENTS ----------
function InfoItem({ icon, label, value, isCaps }: InfoItemProps) {
  return (
    <div>
      <p className="text-xs uppercase font-bold text-muted-foreground flex items-center gap-2">
        {icon} {label}
      </p>
      <p className={`text-lg font-bold ${isCaps ? "capitalize" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function StatusItem({ icon, label, status }: StatusItemProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-300">
        {icon} {label}
      </span>
      <span className="font-bold text-primary">{status}</span>
    </div>
  );
}