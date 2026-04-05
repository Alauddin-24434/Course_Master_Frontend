"use client"

import { useTranslation } from "react-i18next"
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Clock, Sparkles } from "lucide-react"

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-zinc-950/50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-purple-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header Section */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form Section */}
            <div className="bg-background border border-border rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight">{t("extra.send_message") || "Send a Message"}</h2>
                  <p className="text-muted-foreground text-sm font-medium">Fill out the form below and we'll get back to you within 24 hours.</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Ex. Alauddin Ali" 
                        className="w-full h-14 px-6 bg-muted/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold placeholder:opacity-50" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="name@example.com" 
                        className="w-full h-14 px-6 bg-muted/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold placeholder:opacity-50" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                    <select className="w-full h-14 px-6 bg-muted/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm">
                      <option>General Inquiry</option>
                      <option>Course Support</option>
                      <option>Instructor Partnership</option>
                      <option>Billing Issues</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="How can we help you today?" 
                      className="w-full px-6 py-4 bg-muted/30 border border-border rounded-[2rem] focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold placeholder:opacity-50 resize-none"
                    ></textarea>
                  </div>

                  <button type="button" className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:translate-y-[-2px] hover:shadow-2xl active:translate-y-0 transition-all">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-12 py-10 lg:pl-10">
              
              <div className="space-y-8">
                <h3 className="text-3xl font-black tracking-tight">Connect with Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContactInfoCard 
                    icon={<Mail className="w-6 h-6" />}
                    title="Email Us"
                    value="support@coursemaster.com"
                    subtitle="24/7 Support Response"
                  />
                  <ContactInfoCard 
                    icon={<Phone className="w-6 h-6" />}
                    title="Call Us"
                    value="+1 (555) 000-0000"
                    subtitle="Mon-Fri, 9am - 6pm EST"
                  />
                  <ContactInfoCard 
                    icon={<MapPin className="w-6 h-6" />}
                    title="Visit Us"
                    value="Tech Plaza, Silicon Valley"
                    subtitle="California, USA"
                  />
                  <ContactInfoCard 
                    icon={<Globe className="w-6 h-6" />}
                    title="Social Support"
                    value="@CourseMasterHQ"
                    subtitle="Direct Twitter/X Support"
                  />
                </div>
              </div>

              {/* Office Hours / Extras */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <div className="p-3 bg-white/10 w-fit rounded-2xl border border-white/10">
                        <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black tracking-tight">Global Support Hours</h4>
                        <p className="text-white/60 text-sm font-medium">Our team is distributed globally to ensure you get the fastest support regardless of your timezone.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">UTC Response</span>
                            <p className="font-bold">~ 2 hours</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">SLA Success Rate</span>
                            <p className="font-bold">99.8%</p>
                        </div>
                    </div>
                  </div>
                  <MessageSquare className="absolute bottom-[-30px] right-[-30px] w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactInfoCard({ icon, title, value, subtitle }: any) {
  return (
    <div className="p-6 bg-card border border-border rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col gap-5">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">{title}</h4>
          <p className="text-lg font-black text-foreground">{value}</p>
          <p className="text-xs font-medium text-muted-foreground/60">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
