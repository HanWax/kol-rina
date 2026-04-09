import { motion } from "motion/react";
import { SectionHeading } from "../components/SectionHeading";
import { StainedGlassHero } from "../components/StainedGlassHero";

const learningTopics = [
  {
    title: "Shabbat Drashot",
    description:
      "Community members share divrei Torah on the weekly parasha during our Shabbat services. We encourage a range of voices and perspectives.",
    color: "bg-kr-coral",
  },
  {
    title: "Guest Speakers",
    description:
      "We periodically invite scholars and educators to deliver shiurim and lectures on topics of halacha, Tanakh, Jewish thought, and contemporary issues.",
    color: "bg-kr-teal",
  },
];

export function LearningPage() {
  return (
    <div>
      <StainedGlassHero title="Learning" subtitle="Torah & Education" />

      <div className="navy-rule" />

      <section className="py-20 md:py-24 bg-kr-cream relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-kr-teal/[0.04]" />
        <div className="absolute bottom-10 -right-16 w-44 h-44 rounded-full bg-kr-coral/[0.04]" />

        <div className="relative max-w-4xl mx-auto px-6">
          <SectionHeading>Our Learning Programmes</SectionHeading>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {learningTopics.map((topic, i) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-kr-white rounded-2xl p-8 border border-kr-navy/[0.06] hover:shadow-[0_8px_30px_rgba(58,73,114,0.06)] transition-all duration-500"
              >
                {/* Small colored circle accent */}
                <div className={`w-10 h-10 rounded-full ${topic.color} flex items-center justify-center mb-5 shadow-sm`}>
                  <span className="font-script text-white text-sm">
                    {topic.title[0]}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-kr-navy mb-3">
                  {topic.title}
                </h3>
                <p className="text-kr-muted leading-relaxed text-[15px] font-body">
                  {topic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-kr-parchment relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-kr-navy/[0.02]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex flex-col items-center justify-center w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-kr-teal shadow-[0_8px_50px_rgba(123,152,120,0.2)] mx-auto"
          >
            <h3 className="font-caps text-[10px] md:text-[12px] font-bold tracking-[0.2em] uppercase text-white mb-2">
              Interested in Teaching?
            </h3>
            <div className="w-16 h-[1.5px] bg-white/25 my-3" />
            <p className="text-white/80 text-[13px] md:text-[14px] px-10 md:px-14 leading-relaxed font-body">
              Share a d'var Torah, lead a shiur, or suggest a topic.
            </p>
            <a
              href="mailto:kolrinaminyan@gmail.com"
              className="mt-4 px-6 py-2 bg-kr-navy text-white font-caps text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-kr-navy-deep transition-colors duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
