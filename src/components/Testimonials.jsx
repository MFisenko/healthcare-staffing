const testimonials = [
  {
    quote:
      '"HealLink has been a lifesaver for our ER staffing. We were able to find qualified RNs within 12 hours of our request. The platform is incredibly intuitive."',
    name: 'Sarah Jenkins',
    role: 'Director of Nursing, Metropolitan General',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuARmWEb_oO304In1nwxBaXfTGDiXpX8Y2hFviYyXWx9CNoGG76cY2P1X5ON9YzivG69iG0kR7JfR9h0k2BQJlY9EA3D3J1DewJFcJaTJ8OrYNPLGFnnXe2UZKXmJtsryKDHmyPHnjxrRnB9c8UvEJSrBb0GBFboaQL6rXy43hmBWzESR0Ccmj2hNQRu1eaKJRC7T_iFg8y01Zyvw4NLj3OZVvg8z8HOMj7y3GFyaVQz25zxHVTZDEREtOUXG1B8U9JpZ1js8-IR8MaU',
  },
  {
    quote:
      '"As a traveling nurse, I\'ve used many agencies. HealLink is by far the most transparent and professional. The pay rates are competitive and the support is 24/7."',
    name: 'Mark Davis',
    role: 'Registered Nurse, BSN',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYVQG72oMUP2xYbgPYtPS98esJBUNqW3zxdMKMpPqC7YE6Tg79MwNePvCP5qH4U_xPqmB9w_EULpYfbE6mgyLqownORvm7ZyJGZt5nv5F3RGZ5DxxrZH7jY1I7VE1pbGsmEbar5LL4ubvVST-amHoLM_KJeAmvnIkuk8kJDUyHfQ0b_DwRvpda4sHZ9gRrxBhuK7Lb-sNkS_NHe0AX_sFKzQAv7izgLbJtF2GfzaK44lSBQd3UsspoVeyhoBYCtym17gqNakOly4Mi',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-1 mb-6 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="material-symbols-outlined icon-filled">star</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-headline font-extrabold text-center mb-16">
        What the Community is Saying
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-surface-container-lowest p-10 rounded-xl shadow-[0px_12px_32px_-4px_rgba(108,76,241,0.06)]"
          >
            <StarRating />
            <p className="text-lg italic text-on-surface mb-8">{t.quote}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex-shrink-0 overflow-hidden">
                <img alt={t.name} className="w-full h-full object-cover" src={t.avatar} />
              </div>
              <div>
                <h5 className="font-bold text-on-surface leading-none">{t.name}</h5>
                <span className="text-sm text-on-surface-variant">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
