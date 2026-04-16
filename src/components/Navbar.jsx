export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f9fc]/70 backdrop-blur-xl shadow-[0px_12px_32px_-4px_rgba(108,76,241,0.06)]">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight text-[#191c1e] font-headline">HealLink</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-headline text-sm font-medium">
          <a className="text-[#6C4CF1] font-semibold" href="#">Find Talent</a>
          <a className="text-[#484555] hover:text-[#6C4CF1] transition-colors duration-200" href="#">Find Work</a>
          <a className="text-[#484555] hover:text-[#6C4CF1] transition-colors duration-200" href="#">Solutions</a>
          <a className="text-[#484555] hover:text-[#6C4CF1] transition-colors duration-200" href="#">Resources</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-[#484555] hover:text-[#6C4CF1] transition-colors duration-200">
            Sign In
          </button>
          <button className="primary-gradient text-white px-6 py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-transform shadow-lg shadow-primary/20">
            Post a Job
          </button>
        </div>
      </div>
    </nav>
  );
}
