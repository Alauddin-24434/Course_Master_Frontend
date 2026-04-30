"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"


export interface SessionFormValues {
  title: string
  description: string
  thumbnail?: string
  sessionDate: string
  registrationDeadline: string
  maxCapacity?: number
  meetingLink?: string
  isPublished: boolean
}

interface LiveSessionFormProps {
  initialData?: any
  onSubmit: SubmitHandler<SessionFormValues>
  isLoading?: boolean
}

export function LiveSessionForm({ initialData, onSubmit, isLoading }: LiveSessionFormProps) {
  const { t } = useTranslation()

  const sessionSchema = useMemo(() => z.object({
    title: z.string().min(3, t("live_sessions.validation.title_min")),
    description: z.string().min(10, t("live_sessions.validation.desc_min")),
    thumbnail: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().url(t("live_sessions.validation.url_invalid")).optional()
    ),
    sessionDate: z.string().min(1, t("live_sessions.validation.date_required")),
    registrationDeadline: z.string().min(1, t("live_sessions.validation.deadline_required")),
    maxCapacity: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === "number" && isNaN(val)) ? undefined : Number(val)),
      z.number().min(1, t("live_sessions.validation.capacity_min")).optional()
    ),
    meetingLink: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().url(t("live_sessions.validation.url_invalid")).optional()
    ),
    isPublished: z.boolean(),
  }), [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      sessionDate: "",
      registrationDeadline: "",
      maxCapacity: undefined,
      meetingLink: "",
      isPublished: false,
    },
  })
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || "",
        sessionDate: initialData.sessionDate ? new Date(initialData.sessionDate).toISOString().slice(0, 16) : "",
        registrationDeadline: initialData.registrationDeadline ? new Date(initialData.registrationDeadline).toISOString().slice(0, 16) : "",
        maxCapacity: initialData.maxCapacity || undefined,
        meetingLink: initialData.meetingLink || "",
        isPublished: initialData.isPublished || false,
      })
    }
  }, [initialData, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold">{t("live_sessions.form.title")}</label>
          <Input 
            {...register("title")} 
            placeholder={t("live_sessions.form.title_placeholder")}
            className="h-12 rounded-xl"
          />
          {errors.title && <p className="text-xs text-destructive font-medium">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">{t("live_sessions.form.description")}</label>
          <Textarea 
            {...register("description")} 
            placeholder={t("live_sessions.form.description_placeholder")}
            className="min-h-[120px] rounded-xl"
          />
          {errors.description && <p className="text-xs text-destructive font-medium">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">{t("live_sessions.form.date")}</label>
            <Input 
              {...register("sessionDate")} 
              type="datetime-local"
              className="h-12 rounded-xl"
            />
            {errors.sessionDate && <p className="text-xs text-destructive font-medium">{errors.sessionDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">{t("live_sessions.form.deadline")}</label>
            <Input 
              {...register("registrationDeadline")} 
              type="datetime-local"
              className="h-12 rounded-xl"
            />
            {errors.registrationDeadline && <p className="text-xs text-destructive font-medium">{errors.registrationDeadline.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold">{t("live_sessions.form.thumbnail")}</label>
            <Input 
              {...register("thumbnail")} 
              placeholder={t("live_sessions.form.thumbnail_placeholder")}
              className="h-12 rounded-xl"
            />
            {errors.thumbnail && <p className="text-xs text-destructive font-medium">{errors.thumbnail.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold">{t("live_sessions.form.capacity")}</label>
            <Input 
              {...register("maxCapacity", { valueAsNumber: true })} 
              type="number"
              placeholder={t("live_sessions.form.capacity_placeholder")}
              className="h-12 rounded-xl"
            />
            {errors.maxCapacity && <p className="text-xs text-destructive font-medium">{errors.maxCapacity.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold">{t("live_sessions.form.meeting_link")}</label>
          <Input 
            {...register("meetingLink")} 
            placeholder={t("live_sessions.form.meeting_link_placeholder")}
            className="h-12 rounded-xl"
          />
          {errors.meetingLink && <p className="text-xs text-destructive font-medium">{errors.meetingLink.message}</p>}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox 
            id="isPublished" 
            {...register("isPublished")}
          />
          <label 
            htmlFor="isPublished" 
            className="text-sm font-bold cursor-pointer"
          >
            {t("live_sessions.form.publish")}
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20 min-w-[150px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("live_sessions.form.saving")}
            </>
          ) : initialData ? t("live_sessions.form.update") : t("live_sessions.form.create")}
        </Button>
      </div>
    </form>
  )
}
