export default function HeroSection() {
  return (
    <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]" style={{ fontSize: 14 }}>verified_user</span>
            Healthcare Staffing Agency
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
            Healthcare Staffing Solutions{' '}
            <span className="text-transparent bg-clip-text primary-gradient">You Can Trust</span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
            Connecting verified healthcare professionals with nationwide facilities. Specialized in temporary staffing, nurse staffing, and medical placement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="primary-gradient text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-primary/25 hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Find Staff <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-surface-variant transition-all text-center">
              Find Jobs
            </button>
          </div>

          <div className="flex flex-wrap gap-6 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center gap-2 text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-primary icon-filled">schedule</span>
              24/7 staffing
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-primary icon-filled">verified</span>
              Verified professionals
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-primary icon-filled">bolt</span>
              Fast placement
            </div>
          </div>
        </div>

        {/* Right: Image + Overlay */}
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              alt="Healthcare professionals working"
              className="w-full h-auto object-cover aspect-[4/3]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjGbmrqDmVcKsl35cRRsFaaTbBI8ajWWiEJv1V2drSNObUVc6HAD38LiwvUvyaSrjEWu66uuSIuBJBuZtikQmt1HFj0c3ZZK-9F7ycEL9DERnRm73mIxY9aPNLpCGY2cQm9OZ91_R6AeRiNjhsCcKGX0dfsG-68Ds-Uq119QsQDhPilUoLMoV1UFZ0BLl2FmTjxa3_Kadq1w4gkDx3w1jxap5DoCj36JtrGyebqv6boyhUE7PXqNF9cgtJsMhTRdQz0m8fc0cTsL6u"
            />

            {/* Glass overlay card */}
            <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-xl shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-headline font-bold text-on-surface">Live Availability</h4>
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">LIVE</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 bg-surface-container-lowest/50 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">person_search</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-24 bg-surface-variant rounded-full mb-2" />
                    <div className="h-1.5 w-16 bg-surface-container rounded-full" />
                  </div>
                  <div className="text-xs font-bold text-primary">Matching...</div>
                </div>
                <div className="flex items-center gap-4 bg-surface-container-lowest/50 p-3 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-secondary">medical_services</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-32 bg-surface-variant rounded-full mb-2" />
                    <div className="h-1.5 w-20 bg-surface-container rounded-full" />
                  </div>
                  <div className="text-xs font-bold text-on-surface-variant">42 Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
