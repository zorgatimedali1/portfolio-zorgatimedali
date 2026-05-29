export default function Footer() {
  return (
    <footer className="bg-deep-navy border-t border-electric-blue/[0.08] py-10 px-5 sm:px-10 lg:px-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 lg:pl-[0vw] lg:pr-0 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: "#050816",
              border: "1px solid rgba(59,130,246,0.3)",
              boxShadow: "0 0 12px rgba(59,130,246,0.12), inset 0 0 16px rgba(59,130,246,0.04)",
            }}
          >
            <span className="font-inter font-black text-base text-text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]">
              M
            </span>
          </div>
          <span className="font-inter text-sm text-text-muted">
            Mohamed Ali Zorgati
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-inter text-sm text-text-muted">Software Engineer</span>
          <span className="font-space text-xs text-text-muted">2026</span>
        </div>
      </div>
    </footer>
  );
}
