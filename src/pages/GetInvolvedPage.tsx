import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { StainedGlassHero } from "../components/StainedGlassHero";

const roles = [
  {
    title: "Lead Davening",
    description: "Lead Pesukei d'Zimra, Shacharit, or Musaf for the community.",
    color: "bg-kr-navy",
  },
  {
    title: "Lein Torah",
    description: "Read from the Torah scroll on Shabbat mornings. All levels welcome.",
    color: "bg-kr-coral",
  },
  {
    title: "Give a D'var Torah",
    description: "Share your insight on the weekly parasha or a relevant Torah topic.",
    color: "bg-kr-teal",
  },
  {
    title: "Sponsor a Kiddush",
    description: "Provide refreshments for a simcha or in memory of a loved one.",
    color: "bg-kr-gold",
  },
  {
    title: "Help With Setup",
    description: "Arrive early to prepare the venue, mechitza, and seating.",
    color: "bg-kr-coral",
  },
  {
    title: "Join the Committee",
    description: "Help shape the future of Kol Rina by joining our organising committee.",
    color: "bg-kr-navy",
  },
];

export function GetInvolvedPage() {
  return (
    <div>
      <StainedGlassHero title="Get Involved" subtitle="Join the Community" />

      <div className="navy-rule" />

      {/* Roles */}
      <section className="py-20 md:py-24 bg-kr-cream relative overflow-hidden">
        <div className="absolute -top-20 -right-24 w-56 h-56 rounded-full bg-kr-teal/[0.04]" />
        <div className="absolute bottom-0 -left-16 w-44 h-44 rounded-full bg-kr-coral/[0.04]" />

        <div className="relative max-w-5xl mx-auto px-6">
          <SectionHeading>Ways to Participate</SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-kr-white rounded-2xl p-7 border border-kr-navy/[0.06] hover:shadow-[0_8px_30px_rgba(58,73,114,0.06)] transition-all duration-500 group"
              >
                {/* Colored circle initial */}
                <div className={`w-11 h-11 rounded-full ${role.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <span className="font-script text-white text-[15px]">
                    {role.title[0]}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-kr-navy mb-2">
                  {role.title}
                </h3>
                <p className="text-sm text-kr-muted leading-relaxed font-body">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-24 bg-kr-parchment relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHeading>Stay Connected</SectionHeading>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10 mt-8">
            {/* Email circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-[220px] h-[220px] md:w-[240px] md:h-[240px] rounded-full bg-kr-coral shadow-[0_8px_40px_rgba(186,145,146,0.2)] flex flex-col items-center justify-center text-center"
            >
              <h3 className="font-caps text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                Email Us
              </h3>
              <div className="w-12 h-[1.5px] bg-white/30 my-2" />
              <p className="text-white/80 text-[11px] md:text-[12px] px-7 leading-relaxed font-body mb-3">
                Questions, suggestions, or volunteer?
              </p>
              <a
                href="mailto:kolrinaminyan@gmail.com"
                className="px-5 py-2 bg-kr-navy text-white font-caps text-[8px] md:text-[9px] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-kr-navy-deep transition-colors duration-300"
              >
                Send Email
              </a>
            </motion.div>

            {/* WhatsApp circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-[220px] h-[220px] md:w-[240px] md:h-[240px] rounded-full bg-[#25D366] shadow-[0_8px_40px_rgba(37,211,102,0.2)] flex flex-col items-center justify-center text-center"
            >
              <svg className="w-7 h-7 text-white mb-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <h3 className="font-caps text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white mb-1">
                WhatsApp
              </h3>
              <div className="w-12 h-[1.5px] bg-white/30 my-2" />
              <p className="text-white/80 text-[11px] md:text-[12px] px-7 leading-relaxed font-body mb-3">
                Join our community group
              </p>
              <a
                href="https://chat.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-white/20 text-white font-caps text-[8px] md:text-[9px] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-white/30 transition-colors duration-300"
              >
                Join Group
              </a>
            </motion.div>

            {/* Mailing list circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[220px] h-[220px] md:w-[240px] md:h-[240px] rounded-full bg-kr-teal shadow-[0_8px_40px_rgba(123,152,120,0.2)] flex flex-col items-center justify-center text-center"
            >
              <h3 className="font-caps text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white mb-2">
                Mailing List
              </h3>
              <div className="w-12 h-[1.5px] bg-white/30 my-2" />
              <p className="text-white/80 text-[11px] md:text-[12px] px-7 leading-relaxed font-body mb-3">
                Updates on dates and events
              </p>
              <a
                href="mailto:kolrinaminyan@gmail.com?subject=Please add me to the mailing list"
                className="px-5 py-2 bg-kr-gold text-kr-navy-deep font-caps text-[8px] md:text-[9px] font-semibold tracking-[0.15em] uppercase rounded-full hover:bg-kr-gold-light transition-colors duration-300"
              >
                Join List
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section className="py-20 md:py-28 bg-kr-cream relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-kr-navy/[0.015]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex flex-col items-center justify-center w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full bg-kr-navy shadow-[0_8px_50px_rgba(58,73,114,0.3)] mx-auto"
          >
            <span className="font-caps text-[9px] md:text-[11px] font-medium tracking-[0.25em] uppercase text-white/50 mb-1">
              Support
            </span>
            <span className="font-script text-3xl md:text-4xl text-kr-gold drop-shadow-[0_2px_8px_rgba(179,153,98,0.3)]">
              Kol Rina
            </span>
            <div className="w-20 md:w-28 h-[1.5px] bg-kr-gold/40 my-3" />
            <p className="text-white/50 text-[12px] md:text-[13px] px-10 md:px-14 leading-relaxed font-body mb-4">
              Registered charity No. 1173200. Your donations help us provide a welcoming
              space for partnership prayer.
            </p>
            <a
              href="mailto:kolrinaminyan@gmail.com?subject=Donation enquiry"
              className="px-7 py-2.5 bg-kr-gold text-kr-navy-deep font-caps text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-kr-gold-light transition-colors duration-300"
            >
              Donate
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
