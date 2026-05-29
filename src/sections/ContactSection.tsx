import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!formRef.current) return;

    const inputs = formRef.current.querySelectorAll(".form-animate");
    gsap.fromTo(
      inputs,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      }
    );

    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll(".social-icon");
      gsap.fromTo(
        icons,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: socialsRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/zorgatimedali1", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-ali-zorgati-b00b6b25b", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@zorgati.dev", label: "Email" },
  ];

  return (
    <section
      id="contact"
      className="relative bg-deep-navy py-[clamp(80px,12vh,140px)] px-5 sm:px-10 lg:px-20 overflow-x-hidden"
    >
      {/* Animated Gradient Mesh Background */}
      <div className="gradient-mesh">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="blob blob-5" />
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto">
        <SectionHeading
          label="GET IN TOUCH"
          title="Let's Build Something Great"
          subtitle="Have a project in mind or want to collaborate? I'm always open to discussing new opportunities."
          centered
        />

        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-animate w-full bg-dark-surface/60 border border-electric-blue/20 rounded-xl px-5 py-3.5 text-text-primary font-inter text-[0.95rem] placeholder:text-text-muted input-glow transition-all duration-300"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-animate w-full bg-dark-surface/60 border border-electric-blue/20 rounded-xl px-5 py-3.5 text-text-primary font-inter text-[0.95rem] placeholder:text-text-muted input-glow transition-all duration-300"
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="form-animate w-full bg-dark-surface/60 border border-electric-blue/20 rounded-xl px-5 py-3.5 text-text-primary font-inter text-[0.95rem] placeholder:text-text-muted input-glow transition-all duration-300 resize-y min-h-[140px]"
            required
          />
          <button
            type="submit"
            className="form-animate w-full bg-electric-blue text-text-primary font-inter text-base font-semibold py-4 rounded-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            {submitted ? "Message Sent!" : "Send Message"}
          </button>
        </form>

        <div ref={socialsRef} className="flex justify-center gap-4 mt-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon w-12 h-12 rounded-full bg-dark-surface/60 border border-electric-blue/20 flex items-center justify-center text-text-muted hover:bg-electric-blue/15 hover:border-electric-blue hover:text-electric-blue hover:scale-110 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
