export default function ServicesSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-4">
          Staffing Specialized for Excellence
        </h2>
        <p className="text-on-surface-variant">
          We provide agile workforce solutions that adapt to your facility's unique demands, ensuring zero compromise on patient care quality.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Large Card: Temporary Staffing */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary text-3xl">timer</span>
            </div>
            <h3 className="text-2xl font-headline font-bold mb-3">Temporary Staffing</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Fill urgent vacancies with qualified RNs, LPNs, and CNAs. Our flexible short-term staffing solutions keep your facility operational during peak demands and unexpected shortages.
            </p>
          </div>
          <a className="text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
            Learn more <span className="material-symbols-outlined">chevron_right</span>
          </a>
        </div>

        {/* Per Diem */}
        <div className="md:col-span-4 bg-primary-container text-white rounded-xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 pointer-events-none">
            <span className="material-symbols-outlined" style={{ fontSize: 120 }}>calendar_today</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-headline font-bold mb-3">Per Diem Staffing</h3>
            <p className="text-on-primary-container text-sm leading-relaxed mb-6">
              As-needed support for day-to-day fluctuations. Scale your team instantly with verified local professionals.
            </p>
          </div>
          <a className="relative z-10 text-white font-bold flex items-center gap-2" href="#">
            View slots <span className="material-symbols-outlined">open_in_new</span>
          </a>
        </div>

        {/* Locum Tenens */}
        <div className="md:col-span-4 bg-surface-container-high rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
          <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">medical_information</span>
          <h3 className="text-xl font-headline font-bold mb-2">Locum Tenens</h3>
          <p className="text-on-surface-variant text-sm mb-6">
            Strategic physician placement for long-term specialized coverage and clinical continuity.
          </p>
          <a className="text-secondary font-bold text-sm" href="#">Find physicians →</a>
        </div>

        {/* Direct Hire */}
        <div className="md:col-span-8 bg-surface-container-low rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-headline font-bold mb-2">Direct Hire Placement</h3>
            <p className="text-on-surface-variant text-sm mb-4">
              Building permanent foundations. We source, screen, and vet long-term talent for your core team roles.
            </p>
            <a className="text-on-surface font-bold text-sm" href="#">Browse talent database →</a>
          </div>
          <div className="w-full md:w-48 h-32 bg-surface-container-lowest rounded-lg border border-outline-variant/20 flex items-center justify-center flex-shrink-0">
            <img
              alt="Talent"
              className="w-32 opacity-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr6_8weTUKyCV8r5DkYmdRmipJwADUIU6fvjUqVgzc6EYKW5eEogN05nNyPqKhyVczMrsIcsJX3qM-Ppum_IVUmCaWXUArVrwq6N9QYoOp_LfeTUOzHcwRyhU6oqpZNq8GkVEtmtuSwax9e_F0LWfj52SpjxJoJ7IQGDbHpfuyzPcjtn3r5Qese8YBBTIFw2q8ezumqnKUrVZfxVfDbW0m4N8CJ_zldz87UYJnBPLMEw9ntj5yDAfsyFTf2_0QkxOBZFqczQnKx9G-"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
