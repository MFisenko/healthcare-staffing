function Step({ number, title, description, filled }) {
  return (
    <div className="flex gap-6">
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${
          filled
            ? 'bg-primary-container text-white'
            : 'border-2 border-secondary text-secondary'
        }`}
      >
        {number}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-on-surface-variant">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Employers */}
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-primary bg-primary-fixed p-3 rounded-lg">
                business_center
              </span>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface">For Employers</h2>
            </div>
            <div className="space-y-10">
              <Step number="1" title="Submit request" description="Post your facility's requirements via our intuitive dashboard in under 60 seconds." filled />
              <Step number="2" title="Get matched" description="Our AI-driven engine identifies pre-screened professionals matching your exact criteria." filled />
              <Step number="3" title="Hire quickly" description="Review profiles, chat directly, and confirm placement with a single click." filled />
            </div>
            <button className="mt-12 w-full primary-gradient text-white py-4 rounded-xl font-bold">
              Request Talent Now
            </button>
          </div>

          {/* For Candidates */}
          <div className="bg-surface-container-low p-8 md:p-12 rounded-xl border border-outline-variant/30">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-3 rounded-lg">
                person
              </span>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface">For Candidates</h2>
            </div>
            <div className="space-y-10">
              <Step number="1" title="Create profile" description="Upload your credentials and set your availability for per diem or permanent roles." filled={false} />
              <Step number="2" title="Get matched" description="Receive personalized job alerts that align with your career goals and location." filled={false} />
              <Step number="3" title="Start working" description="Get onboarded seamlessly and start your new journey with full support." filled={false} />
            </div>
            <button className="mt-12 w-full bg-surface-container-lowest text-on-surface py-4 rounded-xl font-bold border border-outline-variant hover:bg-white transition-all">
              Apply to Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
