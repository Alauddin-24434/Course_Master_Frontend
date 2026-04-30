"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Calendar, Clock, User, Mail, Phone, ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import toast from "react-hot-toast"
import { useRegisterForSessionMutation } from "@/redux/features/liveSession/liveSessionApi"
import { useTranslation } from "react-i18next"
import { useMemo } from "react"


type RegistrationValues = {
  name: string
  email: string
  phone: string
}

interface Session {
  id: string
  title: string
  description: string
  sessionDate: string
  registrationDeadline: string
  thumbnail?: string
}

export function SessionRegistration({ session }: { session: Session }) {
  const { t } = useTranslation()
  const [registerForSession, { isLoading: isSubmitting }] = useRegisterForSessionMutation()
  
  const isDeadlinePassed = new Date() > new Date(session.registrationDeadline)

  const registrationSchema = useMemo(() => z.object({
    name: z.string().min(2, t("live_sessions.registration.validation.name_short")),
    email: z.string().email(t("live_sessions.registration.validation.email_invalid")),
    phone: z.string().min(10, t("live_sessions.registration.validation.phone_invalid")),
  }), [t])

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema)
  })

  const onSubmit = async (data: RegistrationValues) => {
    if (isDeadlinePassed) {
      toast.error(t("live_sessions.registration.error_deadline"))
      return
    }

    try {
      await registerForSession({ ...data, sessionId: session.id }).unwrap()
      toast.success(t("live_sessions.registration.success_msg"))
      reset()
    } catch (error: any) {
      toast.error(error?.data?.message || t("live_sessions.registration.error_generic"))
    }
  }

  return (
    <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5">
      <div className="p-8 lg:p-12 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20 text-primary">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">{t("live_sessions.registration.badge")}</span>
          </div>
          <h2 className="text-3xl font-black tracking-tighter leading-none">{session.title}</h2>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed">{session.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t("live_sessions.registration.date_time")}</p>
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">{new Date(session.sessionDate).toLocaleString()}</span>
            </div>
          </div>
          <div className="p-4 bg-secondary/30 rounded-2xl border border-border/50">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{t("live_sessions.registration.deadline")}</p>
            <div className="flex items-center gap-2 text-foreground">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold">{new Date(session.registrationDeadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <div className="h-px flex-1 bg-border/60"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">{t("live_sessions.registration.secure_badge")}</span>
            <div className="h-px flex-1 bg-border/60"></div>
          </div>

          {isDeadlinePassed ? (
            <div className="p-6 bg-destructive/5 border border-destructive/10 rounded-2xl text-center space-y-2">
              <p className="text-destructive font-black uppercase text-xs tracking-widest">{t("live_sessions.registration.closed_title")}</p>
              <p className="text-muted-foreground text-xs font-medium">{t("live_sessions.registration.closed_desc")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("live_sessions.registration.full_name")}</label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText><User className="w-4 h-4" /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput 
                    {...register("name")}
                    placeholder={t("live_sessions.registration.full_name_placeholder")}
                    className="h-14"
                  />
                </InputGroup>
                {errors.name && <p className="text-[10px] font-bold text-destructive ml-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("live_sessions.registration.email")}</label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText><Mail className="w-4 h-4" /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput 
                    {...register("email")}
                    type="email"
                    placeholder={t("live_sessions.registration.email_placeholder")}
                    className="h-14"
                  />
                </InputGroup>
                {errors.email && <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t("live_sessions.registration.phone")}</label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText><Phone className="w-4 h-4" /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput 
                    {...register("phone")}
                    placeholder={t("live_sessions.registration.phone_placeholder")}
                    className="h-14"
                  />
                </InputGroup>
                {errors.phone && <p className="text-[10px] font-bold text-destructive ml-1">{errors.phone.message}</p>}
              </div>

              <Button 
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" /> {t("live_sessions.registration.processing")}</>
                ) : (
                  t("live_sessions.registration.submit")
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
