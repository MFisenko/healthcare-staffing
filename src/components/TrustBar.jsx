const logos = [
  {
    alt: "Logo 1",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQoI67GkL_H6UdRL-Kp69VUXKW69D1NF1SdadYYIgHCSb79s-qhBLuRsjN64er6glL67Vnn5qut_lilDL1h83e-2PffdNAosCZl25UBXwTllDCWXLh1W2rUQQUukS3fkXvos-_McmEx0nAlF3Rp-QKYE6GXh4j4PymfPfJvyU6BbN8CCPhm7jYKlRKIlCpzP6sFpQQpyMAmGw866ZsvdgJkvXciskLX4K0IlpigQOETDx58-B9asyVpMY0pb9Ps9-AUSABaPGy0PKM",
  },
  {
    alt: "Logo 2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKgpK8qTQpmNfrGqSOldJ6XKp2jeHOSfGTSUA8IMxLJ8YXFegfAZtY4_dCl5_7grHl7KoKUx36W9ZR9XmQj2bj-WlyghXl-ZKvRrhv1SSGOzrZ_rp9xYkJgO4RgnFTnVgY3UZrTXK4T6eBDV50dD1danDn3BOgGCi2CXhg07Dgpsuy_PghphI6cnp3Whb6aRse84D75JTDVNoANADTbpBwUjTa6HWe_1VH6EBwEPgf4iOl4ZVr1uJxd11dewG9OJuwgm_L50W9NW-R",
  },
  {
    alt: "Logo 3",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAR-tR_B_eWFjMfYsyeThtZodu2UGAvgveh1nM1UzzZThUYRePAiiPMshR1ulFGD7EFkDlvPQ701_XzlwGcKCV-I6sREqnuhITpn5y2QHxyebr9BrrfHeY9K7ap4QJqtrXGNvg6r3lZwcEJCzMl_gMSqWYpNyaZ8AvCbDXosrUxRuVRgJefy8xoFAcEH-YW83zlrPY4b89ZyS9cciVw9kKZWE9LJk5EfmG7SsYLR_F806eayJk2_CUaunN1Po496OPVb_IrOG18mVV",
  },
  {
    alt: "Logo 4",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL-apwS63LkuqCJ-rEFF5cwYbq0WnSH6FEZEKWSYY2-iwko_y2g34Z-REiG7y3b49s08YO9gef3mybWj1pMNz57uHeax3kKppxPk7C0hry1HC63MuQ9qur979YwLmi8d9VYSYGITllyCeUNrvnuqX50BM2h4Jiz8dmlIaFxm_XEwjDEDcIJtH3twbjxBwCvaWpCg4HjWMKkURsvpYr8vTOUiG3zyloxZChcDsVnPHEHydOeXkjM2MN_fsEnCBYfK2n6UjiodnnvlW8",
  },
  {
    alt: "Logo 5",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbA9ImOfOuzmC5EQ8nVdbMh03dkPQZHumQha0bWICNHDc6LM6emMv63g8quLD9bp7r_9T6R_-H3Y5EEMrFA9xlGYw9DfHWOS0pjcer_VVlZ9yqdMdCv5sxkkHpJpzxmtww8jzs14MbrUSLVpVl8ZBbonAeuTpD9w7bwIifiwlB1_C4IyX7zjs0khKbpbPJl-5hi9-YTQZX7d2NlsfLi4cddvlU1tb_FiGEdu2QMLsQjXfaJYd43WETRi_rqoZkLrAqUGW3tXJKNGXa",
  },
];

export default function TrustBar() {
  return (
    <section className="bg-surface-container-low py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8">
          Trusted by healthcare facilities nationwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {logos.map((logo) => (
            <img key={logo.alt} alt={logo.alt} className="h-8" src={logo.src} />
          ))}
        </div>
      </div>
    </section>
  );
}
