import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { useGetReviewsQuery } from "@/redux/features/review/reviewApi";

export function Testimonials() {
  const { t } = useTranslation();
  const { data: reviewData } = useGetReviewsQuery(undefined);
  
  const fetchedReviews = reviewData?.data || [];

  if (fetchedReviews.length === 0) return null;

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[10px] font-black uppercase text-primary tracking-widest">
            <Star className="w-3 h-3 fill-primary" />
            {t("extra.voices_success")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            {t("extra.testimonial_title")}
          </h2>
          <p className="text-muted-foreground text-lg font-medium italic opacity-80">
            {t("extra.testimonial_subtitle")}
          </p>
        </div>

        {/* Both Sides Marquee Container */}
        <div className="flex flex-col gap-8">
          
          {/* Row 1: Leftward Scroll */}
          <div className="relative flex overflow-x-hidden group">
            <div className="flex animate-marquee whitespace-nowrap py-4 gap-8 group-hover:[animation-play-state:paused]">
              {[...fetchedReviews, ...fetchedReviews].map((review: any, idx: number) => (
                <ReviewCard key={`row1-${idx}`} review={review} />
              ))}
            </div>
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Row 2: Rightward Scroll */}
          <div className="relative flex overflow-x-hidden group">
            <div className="flex animate-marquee-reverse whitespace-nowrap py-4 gap-8 group-hover:[animation-play-state:paused]">
              {[...[...fetchedReviews].reverse(), ...[...fetchedReviews].reverse()].map((review: any, idx: number) => (
                <ReviewCard key={`row2-${idx}`} review={review} />
              ))}
            </div>
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: any }) {
  const reviewer = review.user || {};
  return (
    <div className="inline-flex flex-col w-[350px] sm:w-[400px] bg-card p-8 rounded-[2.5rem] border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:bg-secondary/5 backdrop-blur-sm">
      <div className="flex gap-0.5 mb-5">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-base font-bold leading-relaxed text-foreground/90 whitespace-normal line-clamp-3 italic mb-8">
        &quot;{review.content}&quot;
      </p>

      <div className="flex items-center gap-4">
        <img 
          src={reviewer.avatar || `https://i.pravatar.cc/150?u=${reviewer.name}`} 
          alt={reviewer.name} 
          className="w-12 h-12 rounded-xl object-cover border-2 border-background shadow-md grayscale hover:grayscale-0 transition-all duration-500" 
        />
        <div>
          <h4 className="font-black text-sm text-foreground">{reviewer.name || "Anonymous Student"}</h4>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{reviewer.role || "Verified Student"}</p>
        </div>
      </div>
    </div>
  );
}
