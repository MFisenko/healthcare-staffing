const features = [
  {
    icon: 'check_circle',
    title: 'Pre-screened professionals',
    description: 'Every professional undergoes a 7-step clinical verification process.',
  },
  {
    icon: 'flash_on',
    title: 'Rapid response',
    description: 'Our network reacts in real-time to your urgent staffing gaps.',
  },
  {
    icon: 'map',
    title: 'Nationwide coverage',
    description: 'Access a talent pool spanning every major US metropolitan area.',
  },
  {
    icon: 'security',
    title: 'Compliance verification',
    description: 'Automated credential tracking ensures 100% compliance at all times.',
  },
];

const stats = [
  { value: '500+', label: 'Professionals', offset: 'mt-12' },
  { value: '24h', label: 'Avg. Placement', offset: '' },
  { value: '98%', label: 'Satisfaction', offset: '' },
  { value: '12k', label: 'Hours Filled', offset: '-mt-12' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-6">
            Why Modern Facilities Choose HealLink
          </h2>
          <p className="text-on-surface-variant text-lg mb-12">
            We combine healthcare expertise with cutting-edge technology to solve the staffing crisis once and for all.
          </p>
          <div className="space-y-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="material-symbols-outlined text-primary icon-filled flex-shrink-0">{f.icon}</span>
                <div>
                  <h5 className="font-bold text-on-surface">{f.title}</h5>
                  <p className="text-sm text-on-surface-variant">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stats grid */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`bg-surface-container-lowest p-8 rounded-xl shadow-lg border border-primary/5 text-center ${s.offset}`}
            >
              <div className="text-5xl font-headline font-extrabold text-primary mb-2">{s.value}</div>
              <p className="text-on-surface-variant font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
