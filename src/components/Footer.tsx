import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Navy rule */}
      <div className="navy-rule" />

      <div className="bg-kr-cream relative">
        {/* Decorative circles — echoing the site's motif */}
        <div className="absolute -bottom-20 -right-20 w-52 h-52 rounded-full bg-kr-teal/[0.06]" />
        <div className="absolute -bottom-10 -left-16 w-40 h-40 rounded-full bg-kr-coral/[0.05]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-8">
          <div className="grid md:grid-cols-2 gap-10 md:gap-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="inline-flex w-16 h-16 rounded-full bg-kr-navy items-center justify-center mb-3">
                <div>
                  <span className="font-script text-white text-sm block leading-tight">
                    Kol
                  </span>
                  <span className="font-script text-white text-sm block leading-tight -mt-0.5">
                    Rina
                  </span>
                </div>
              </div>
              <p className="font-caps text-[10px] tracking-[0.2em] uppercase text-kr-muted">
                Golders Green Partnership Minyan
              </p>
              <p className="text-xs mt-3 text-kr-muted/60">
                Registered Charity No. 1173200
              </p>
            </div>

            {/* Quick links */}
            <div className="text-center md:text-left">
              <h4 className="font-caps text-[11px] font-semibold tracking-[0.2em] uppercase text-kr-navy mb-3">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2 text-[15px]">
                {[
                  { to: "/minyan-dates" as const, label: "Minyan Dates" },
                  { to: "/learning" as const, label: "Learning" },
                  { to: "/events" as const, label: "Events" },
                  { to: "/get-involved" as const, label: "Get Involved" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-kr-muted hover:text-kr-coral transition-colors duration-300 w-fit mx-auto md:mx-0"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-5 border-t border-kr-navy/[0.08] text-center">
            <p className="text-[11px] text-kr-muted/50 font-caps tracking-wider">
              &copy; {new Date().getFullYear()} Kol Rina Minyan &middot; Supported by
              JOFA UK
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
