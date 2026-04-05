"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
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
  Sparkles
} from "lucide-react"

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.cmAuth)

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 text-center">
            <User className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">Authenticating user...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-5xl space-y-12">
      
      {/* Header Branding */}
      <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <Shield className="w-3.5 h-3.5" /> Identity & Security
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight italic">
              Your Personal Identity.
          </h1>
          <p className="text-muted-foreground font-medium max-w-xl">
              Manage your public appearance and account security. Your role determines your platform capabilities.
          </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Avatar & Role */}
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border/60 rounded-[3rem] p-10 text-center relative overflow-hidden group shadow-xl shadow-black/5">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative z-10 space-y-6">
                    <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full scale-110"></div>
                        <div className="relative w-full h-full bg-secondary rounded-full border-4 border-background overflow-hidden flex items-center justify-center text-primary text-4xl font-black italic shadow-2xl">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0)
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-black tracking-tight">{user.name}</h2>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Verified {user.role}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-12 h-12" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-primary italic">Account Status</h4>
                <div className="space-y-4">
                    <StatusItem icon={<CheckCircle2 className="w-4 h-4" />} label="Email Verified" status="Active" />
                    <StatusItem icon={<Clock className="w-4 h-4" />} label="Member Since" status={user.createdAt ? new Date(user.createdAt).getFullYear().toString() : new Date().getFullYear().toString()} />
                </div>
            </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border/60 rounded-[3rem] p-10 shadow-2xl shadow-black/5 space-y-12">
                
                <section className="space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black tracking-tight italic">Basic Information</h3>
                        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <InfoItem icon={<User />} label="Full Display Name" value={user.name} />
                        <InfoItem icon={<Mail />} label="Primary Email Address" value={user.email} />
                        <InfoItem icon={<Shield />} label="System Access Role" value={user.role} isCaps />
                        <InfoItem icon={<Calendar />} label="Account Type" value="Professional Developer" />
                    </div>
                </section>

                <hr className="border-border/50" />

                <section className="space-y-6">
                    <h3 className="text-2xl font-black tracking-tight italic">Biographical Notes</h3>
                    <div className="p-6 bg-secondary/30 rounded-2xl border border-border/40">
                         <p className="text-muted-foreground font-medium leading-relaxed italic">
                            {user.bio || "This user hasn't curated a personal bio yet. Update your profile to showcase your achievements and expertise to the community."}
                         </p>
                    </div>
                </section>

                <section className="pt-4">
                     <button className="w-full h-16 bg-secondary/50 hover:bg-secondary rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest transition-all border border-border/50">
                        Connect External Accounts <ExternalLink className="w-4 h-4" />
                     </button>
                </section>

            </div>
        </div>

      </div>
    </div>
  )
}

function InfoItem({ icon, label, value, isCaps }: any) {
    return (
        <div className="space-y-2 group">
            <div className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-primary">
                <div className="w-3 h-3">{icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <p className={`text-lg font-bold text-foreground ${isCaps ? 'capitalize' : ''}`}>{value}</p>
        </div>
    )
}

function StatusItem({ icon, label, status }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-white/60">
                 {icon}
                 <span className="text-xs font-bold">{label}</span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-primary">{status}</span>
        </div>
    )
}
