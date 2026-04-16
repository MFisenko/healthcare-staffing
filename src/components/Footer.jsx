const serviceLinks = ['Hire Professionals', 'Browse Jobs', 'Pricing'];
const resourceLinks = ['Case Studies', 'Staffing Blog', 'Help Center'];
const companyLinks = ['Privacy Policy', 'Terms of Service', 'About Us'];

export default function Footer() {
  return (
    <footer className="w-full rounded-t-[2rem] mt-20 bg-[#f2f3f6]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 md:px-12 py-16 max-w-7xl mx-auto text-sm leading-relaxed">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-lg font-bold text-[#191c1e] mb-6">HealLink</div>
          <p className="text-[#484555] mb-6">
            Revolutionizing healthcare staffing through technology and transparency.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-[#6C4CF1] cursor-pointer">public</span>
            <span className="material-symbols-outlined text-[#6C4CF1] cursor-pointer">chat</span>
            <span className="material-symbols-outlined text-[#6C4CF1] cursor-pointer">share</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Services</h5>
          <ul className="space-y-4">
            {serviceLinks.map((link) => (
              <li key={link}>
                <a className="text-[#484555] hover:text-[#6C4CF1] underline-offset-4 hover:underline" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Resources</h5>
          <ul className="space-y-4">
            {resourceLinks.map((link) => (
              <li key={link}>
                <a className="text-[#484555] hover:text-[#6C4CF1] underline-offset-4 hover:underline" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-wider text-xs">Company</h5>
          <ul className="space-y-4">
            {companyLinks.map((link) => (
              <li key={link}>
                <a className="text-[#484555] hover:text-[#6C4CF1] underline-offset-4 hover:underline" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 py-8 border-t border-outline-variant/10 text-center text-[#484555] text-xs">
        © 2024 HealLink Healthcare Staffing. All rights reserved.
      </div>
    </footer>
  );
}
