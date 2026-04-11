"use client"

import { useTranslation } from "react-i18next"
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Clock, Sparkles, Headphones } from "lucide-react"

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* --- Header Section --- */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-primary/20">
               <Sparkles className="w-3.5 h-3.5 fill-primary/20" /> {t("contact.badge") || "Get in Touch"}
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.95]">
               {t("nav.contact") || "Let's start a conversation."}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
               Have a question about our courses or need a custom solution for your team? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            
            {/* --- Contact Form Section (Left) --- */}
            <div className="bg-card border border-border rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-primary/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
              
              <div className="space-y-10">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black tracking-tight text-foreground">{t("extra.send_message") || "Send a Message"}</h2>
                  <p className="text-muted-foreground text-sm font-medium">Expected response time: <span className="text-primary font-bold">under 2 hours</span></p>
                </div>

                <form className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full h-14 px-6 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all font-bold placeholder:opacity-30 text-foreground" 
                      />
                    </div>
                    <div className="space-y-2.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full h-14 px-6 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all font-bold placeholder:opacity-30 text-foreground" 
                      />
                    </div>
                  </div>

                  {/* Manual Subject Input Box */}
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                    <input 
                      type="text" 
                      placeholder="What is this regarding?" 
                      className="w-full h-14 px-6 bg-secondary/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all font-bold placeholder:opacity-30 text-foreground" 
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us how we can help..." 
                      className="w-full px-6 py-5 bg-secondary/50 border border-border rounded-[2rem] focus:ring-2 focus:ring-primary/20 focus:border-primary/40 outline-none transition-all font-bold placeholder:opacity-30 text-foreground resize-none"
                    ></textarea>
                  </div>

                  <button type="button" className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300">
                    <Send className="w-4 h-4" /> {t("extra.submit") || "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* --- Contact Info & Cards (Right) --- */}
            <div className="flex flex-col justify-between py-2 space-y-12">
              
              <div className="space-y-10">
        
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ContactInfoCard 
                    icon={<Mail className="w-5 h-5" />}
                    title="Email Us"
                    value="hello@yourbrand.com"
                    subtitle="Official Support"
                  />
                  <ContactInfoCard 
                    icon={<Headphones className="w-5 h-5" />}
                    title="Live Support"
                    value="+1 (800) 123-4567"
                    subtitle="Mon - Fri, 10am - 5pm"
                  />
                  <ContactInfoCard 
                    icon={<MapPin className="w-5 h-5" />}
                    title="Our Studio"
                    value="Dhaka, Bangladesh"
                    subtitle="Gulshan-2, Road 45"
                  />
                  <ContactInfoCard 
                    icon={<Globe className="w-5 h-5" />}
                    title="Socials"
                    value="@YourBrandHQ"
                    subtitle="Twitter / Instagram"
                  />
                </div>
              </div>

              {/* --- SLA / Trust Card --- */}
              <div className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-xl font-black tracking-tight text-foreground italic">Rapid Response Team</h4>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed">Our global team ensures that no message goes unanswered. We typically respond faster than you can brew a cup of coffee.</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-black tracking-widest text-primary">Avg. Wait</span>
                            <p className="font-black text-xl text-foreground">42m</p>
                        </div>
                        <div className="w-px h-10 bg-border"></div>
                        <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-black tracking-widest text-primary">Satisfaction</span>
                            <p className="font-black text-xl text-foreground">99.9%</p>
                        </div>
                    </div>
                  </div>
                  <MessageSquare className="absolute bottom-[-40px] right-[-40px] w-56 h-56 text-primary opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000" />
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
    <div className="p-7 bg-card border border-border rounded-[2rem] hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex flex-col gap-5 relative z-10">
        <div className="w-12 h-12 bg-secondary text-foreground rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-sm">
          {icon}
        </div>
        <div className="space-y-1">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/70">{title}</h4>
          <p className="text-base font-black text-foreground tracking-tight break-words">{value}</p>
          <p className="text-[10px] font-bold text-muted-foreground/60">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}