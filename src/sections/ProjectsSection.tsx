import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import PillBadge from "@/components/PillBadge";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-deep-navy py-[clamp(80px,12vh,140px)] overflow-x-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[0vw] lg:pr-0">
        <SectionHeading
          label="WORK"
          title="Featured Projects"
          subtitle="A selection of projects showcasing my expertise across web, mobile, and AI"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => { setModalProject(project); setVideoLoaded(false); }}
              className="project-card glass-card p-7 cursor-pointer transition-all duration-500 border border-electric-blue/10 hover:border-electric-blue/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:scale-[1.02]"
            >
              <div className="w-full h-60 rounded-lg overflow-hidden mb-5 bg-dark-surface">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-xl font-semibold text-text-primary">
                {project.title}
              </h3>
              <p className="font-inter text-sm text-text-secondary mt-2 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.techStack.map((tech) => (
                  <PillBadge key={tech} text={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalProject && (
        <div
          className="fixed inset-0 z-[100] bg-deep-navy/95 backdrop-blur-[30px] flex items-center justify-center p-5"
          onClick={() => setModalProject(null)}
        >
          <div
            className="glass-card max-w-[800px] w-full max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalIn 0.4s ease-out",
            }}
          >
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {modalProject.gallery ? (
              <div className="flex gap-3 mb-6 overflow-x-auto rounded-xl">
                {modalProject.gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${modalProject.title} screenshot ${i + 1}`}
                    className="h-48 w-auto object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setLightboxSrc(src)}
                  />
                ))}
              </div>
            ) : modalProject.video ? (
              <div className="relative w-full aspect-video rounded-xl mb-6 overflow-hidden bg-dark-surface">
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-10 border-2 border-electric-blue border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <video
                  src={modalProject.video}
                  poster={modalProject.image}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setVideoLoaded(true)}
                />
              </div>
            ) : (
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full aspect-video object-cover rounded-xl mb-6"
              />
            )}

            <h3 className="font-inter text-2xl font-bold text-text-primary">
              {modalProject.title}
            </h3>

            <p className="font-inter text-[0.95rem] text-text-secondary leading-relaxed mt-4">
              {modalProject.fullDescription}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {modalProject.techStack.map((tech) => (
                <PillBadge key={tech} text={tech} />
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              {modalProject.liveUrl && (
                <a
                  href={modalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-electric-blue text-text-primary font-inter text-sm font-medium px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
                >
                  <ExternalLink size={16} />
                  View Live
                </a>
              )}
              {modalProject.githubUrl && (
                <a
                  href={modalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-transparent border border-electric-blue/30 text-text-secondary font-inter text-sm font-medium px-6 py-3 rounded-lg hover:border-electric-blue hover:text-text-primary transition-all duration-300"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[200] bg-deep-navy/95 backdrop-blur-[30px] flex items-center justify-center p-5 cursor-pointer"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Screenshot"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            style={{ animation: "modalIn 0.3s ease-out" }}
          />
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
