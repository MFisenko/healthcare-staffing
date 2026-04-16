const jobs = [
  {
    badge: 'RN',
    badgeClass: 'bg-primary-fixed text-primary',
    location: 'New York, NY',
    title: 'Critical Care Registered Nurse',
    description: 'Hospital-based acute care. Flexible per diem shifts available.',
    pay: '$75 - $95',
  },
  {
    badge: 'LPN',
    badgeClass: 'bg-secondary-fixed text-secondary',
    location: 'Austin, TX',
    title: 'Licensed Practical Nurse',
    description: 'Long-term care facility. Weekend and night shifts prioritized.',
    pay: '$45 - $55',
  },
  {
    badge: 'CNA',
    badgeClass: 'bg-tertiary-fixed text-tertiary',
    location: 'Miami, FL',
    title: 'Certified Nursing Assistant',
    description: 'Assisted living community. Direct-hire opportunity with benefits.',
    pay: '$25 - $32',
  },
];

function JobCard({ badge, badgeClass, location, title, description, pay }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`${badgeClass} p-3 rounded-lg font-bold text-sm`}>{badge}</div>
        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
          {location}
        </span>
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-on-surface-variant text-sm mb-6">{description}</p>
      <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10">
        <span className="font-bold text-on-surface">
          {pay} <span className="text-xs font-normal text-on-surface-variant">/ hr</span>
        </span>
        <button className="text-sm font-bold text-primary hover:underline">Apply Now</button>
      </div>
    </div>
  );
}

export default function FeaturedRoles() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-4">
              Featured Opportunities
            </h2>
            <p className="text-on-surface-variant">Active roles currently being filled by our network.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all self-start md:self-auto">
            View all jobs <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard key={job.title} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
}
