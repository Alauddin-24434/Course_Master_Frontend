"use client";

import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Sparkles,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function ContactPage() {
  const { t } = useTranslation();

  /* ================= MAP CONFIG ================= */
  const position: [number, number] = [22.701, 90.3535]; // Barishal

  return (
    <main className="min-h-screen py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Header Section (UNCHANGED) */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" /> Get in Touch
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9]">
              {t("nav.contact") || "Contact Our Team"}
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Have questions about our courses or need assistance? We're here to help you navigate your learning journey.
            </p>
          </div>

          {/* ================= MAP (ONLY CHANGED PART) ================= */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-50 group-hover:scale-75 transition-transform duration-1000"></div>

            <div className="relative h-[400px] w-full rounded-[3.5rem] overflow-hidden border-8 border-background shadow-2xl">

           <MapContainer
  center={position as any}
  zoom={11}
  scrollWheelZoom={false}
  style={{ height: "100%", width: "100%" }}
>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position}>
                  <Popup>📍 Barishal Location</Popup>
                </Marker>
              </MapContainer>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Contact Form (UNCHANGED) */}
            <div className="bg-background border border-border rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
              <div className="space-y-8">

                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight">
                    {t("extra.send_message") || "Send a Message"}
                  </h2>

                  <p className="text-muted-foreground text-sm font-medium">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-6">
                  <input className="w-full h-14 px-6 border rounded-2xl" placeholder="Full Name" />
                  <input className="w-full h-14 px-6 border rounded-2xl" placeholder="Email" />
                  <textarea className="w-full px-6 py-4 border rounded-2xl" rows={5} placeholder="Message" />

                  <button className="w-full h-16 bg-primary text-white rounded-2xl flex items-center justify-center gap-3">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>

              </div>
            </div>

            {/* Contact Info (UNCHANGED) */}
            <div className="space-y-12 py-10 lg:pl-10">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <ContactInfoCard
                  icon={<Mail className="w-6 h-6" />}
                  title="Email"
                  value="support@coursemaster.com"
                  subtitle="24/7 Support"
                />

                <ContactInfoCard
                  icon={<Phone className="w-6 h-6" />}
                  title="Phone"
                  value="+880 000 000"
                  subtitle="Mon-Fri"
                />

                <ContactInfoCard
                  icon={<MapPin className="w-6 h-6" />}
                  title="Location"
                  value="Barishal"
                  subtitle="Bangladesh"
                />

                <ContactInfoCard
                  icon={<Globe className="w-6 h-6" />}
                  title="Social"
                  value="@CourseMasterHQ"
                  subtitle="Online Support"
                />

              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

/* ================= CARD (UNCHANGED) ================= */
function ContactInfoCard({ icon, title, value, subtitle }: any) {
  return (
    <div className="p-6 bg-card border border-border rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col gap-5">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {icon}
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            {title}
          </h4>
          <p className="text-lg font-black">{value}</p>
          <p className="text-xs text-muted-foreground/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}