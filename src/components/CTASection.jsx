export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto primary-gradient rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">
            Need staff urgently?
          </h2>
          <p className="text-lg text-primary-fixed mb-12 opacity-90">
            Our recruiters are standing by to match you with top healthcare talent right now. Don't let staffing gaps impact your patient care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-lowest transition-all shadow-xl">
              Request Staff Now
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Join as Professional
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
