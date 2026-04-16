import { useState, useRef } from 'react';

// ─── Static data ───────────────────────────────────────────────────
const SERVICES = [
  { icon: 'schedule',          title: 'Temporary Staffing',    accent: 'bg-primary-fixed text-primary',   body: 'When unexpected staffing gaps arise, trust Tender Smiles Healthcare Staffing to provide the right professionals at the right time.' },
  { icon: 'handshake',         title: 'Direct Hire Placement', accent: 'bg-secondary-fixed text-secondary', body: "We carefully match candidates with your organization's values and culture, ensuring they seamlessly integrate into your team." },
  { icon: 'calendar_today',    title: 'Per Diem Staffing',     accent: 'bg-primary-fixed text-primary',   body: 'Our per diem staffing service offers the flexibility you need to maintain optimal staffing levels — during peak periods, emergencies, or short-term assignments.' },
  { icon: 'medical_information', title: 'Locum Tenens',        accent: 'bg-secondary-fixed text-secondary', body: 'Maintain continuity of care with our locum tenens service. When your facility needs temporary coverage for physicians or other healthcare professionals, we are here to help.' },
];

const WHY = [
  { icon: 'groups',   title: 'Extensive Network of Highly Qualified Professionals', body: "Access a deep pool of thoroughly screened healthcare professionals ready to meet your facility's specific needs." },
  { icon: 'bolt',     title: 'Rapid Response to Staffing Needs',                   body: 'Our team acts fast — matching your facility with the right candidate within hours, not days.' },
  { icon: 'verified', title: 'Trusted and Reliable Partner',                       body: 'Let us handle your staffing needs while you focus on what you do best — providing exceptional care to your patients.' },
];

const STATS = [
  { value: '24/7',  label: 'Day Services' },
  { value: '100%',  label: 'Screened Professionals' },
  { value: '< 24h', label: 'Average Placement' },
  { value: 'Local', label: 'Nationwide Reach' },
];

const ROLE_OPTIONS = ['Registered Nurse (RN)', 'Licensed Practical Nurse (LPN)', 'Certified Nursing Assistant (CNA)', 'Physician / Locum Tenens', 'Medical Assistant', 'Allied Health Professional', 'Other'];

// ─── Validation helpers ────────────────────────────────────────────
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isPhone = v => /^\+?[\d\s\-(). ]{7,}$/.test(v.trim());

// ─── Form primitives ───────────────────────────────────────────────
const STATES = { idle: 'idle', loading: 'loading', success: 'success', error: 'error' };

const baseCls = 'w-full px-4 py-2.5 rounded-xl border bg-white text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition text-sm';
const inputCls = (err) => `${baseCls} ${err ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary'}`;

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-error text-xs mt-1.5 font-medium">
      <span className="material-symbols-outlined text-[14px]">error</span>
      {msg}
    </p>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-on-surface mb-1">
        {label}{' '}
        {required
          ? <span className="text-error font-normal">*</span>
          : <span className="text-on-surface-variant font-normal text-xs">(optional)</span>}
      </label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

function SubmitButton({ loading, label }) {
  return (
    <button type="submit" disabled={loading}
      className="w-full primary-gradient text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
      {loading
        ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>Sending…</>
        : <>{label}<span className="material-symbols-outlined text-[18px]">send</span></>}
    </button>
  );
}

function ServerError({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-center gap-2 text-error text-sm bg-error-container px-4 py-2.5 rounded-xl">
      <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>{msg}
    </div>
  );
}

function SuccessCard({ title, body, onReset }) {
  return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-primary icon-filled" style={{ fontSize: 32 }}>check_circle</span>
      </div>
      <h3 className="text-xl font-headline font-extrabold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm mb-6">{body}</p>
      <button onClick={onReset} className="primary-gradient text-white font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm">
        Submit another
      </button>
    </div>
  );
}

// ─── Candidate form ────────────────────────────────────────────────
function CandidateForm() {
  const [form, setForm]     = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState(STATES.idle);
  const [serverErr, setServerErr] = useState('');
  const fileRef = useRef();

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(ev => ({ ...ev, [name]: '' }));
  };

  const onBlur = e => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    if (err) setErrors(ev => ({ ...ev, [name]: err }));
  };

  function validateField(name, value) {
    if (name === 'name'  && !value.trim())  return 'Full name is required.';
    if (name === 'email' && !value.trim())  return 'Email address is required.';
    if (name === 'email' && !isEmail(value)) return 'Please enter a valid email address.';
    if (name === 'phone' && !value.trim())  return 'Phone number is required.';
    if (name === 'phone' && !isPhone(value)) return 'Please enter a valid phone number.';
    return '';
  }

  function validate() {
    const errs = {};
    Object.entries(form).forEach(([k, v]) => {
      const e = validateField(k, v);
      if (e) errs[k] = e;
    });
    if (!cvFile) errs.cv = 'Please attach your CV or resume.';
    return errs;
  }

  const onFile = e => {
    const file = e.target.files[0];
    if (file?.size > 10 * 1024 * 1024) { setErrors(ev => ({ ...ev, cv: 'File must be under 10 MB.' })); return; }
    setCvFile(file || null);
    setErrors(ev => ({ ...ev, cv: '' }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus(STATES.loading); setServerErr('');
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    data.append('cv', cvFile);
    try {
      const res  = await fetch('/api/apply', { method: 'POST', body: data });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus(STATES.success);
    } catch (err) { setServerErr(err.message); setStatus(STATES.error); }
  }

  if (status === STATES.success) return (
    <SuccessCard title="Application sent!" body="We've received your CV and will be in touch soon."
      onReset={() => { setStatus(STATES.idle); setForm({ name: '', email: '', phone: '', message: '' }); setCvFile(null); setErrors({}); }} />
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Field label="Full name" required error={errors.name}>
        <input className={inputCls(errors.name)} name="name" type="text" placeholder="Jane Smith"
          value={form.name} onChange={onChange} onBlur={onBlur} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email address" required error={errors.email}>
          <input className={inputCls(errors.email)} name="email" type="email" placeholder="jane@example.com"
            value={form.email} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input className={inputCls(errors.phone)} name="phone" type="tel" placeholder="(443) 000-0000"
            value={form.phone} onChange={onChange} onBlur={onBlur} />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea className={`${inputCls(false)} resize-none`} name="message" rows={3}
          placeholder="Tell us about your experience, preferred roles, or availability…"
          value={form.message} onChange={onChange} />
      </Field>

      <Field label="CV / Resume" required error={errors.cv}>
        <button type="button" onClick={() => fileRef.current.click()}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed transition text-left ${
            errors.cv ? 'border-error bg-red-50' : cvFile ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant bg-white hover:border-primary/40'}`}>
          <span className={`material-symbols-outlined flex-shrink-0 text-[22px] ${cvFile ? 'text-primary' : errors.cv ? 'text-error' : 'text-on-surface-variant'}`}>
            {cvFile ? 'description' : 'upload_file'}
          </span>
          <div className="flex-1 min-w-0">
            {cvFile
              ? <><p className="text-sm font-semibold text-primary truncate">{cvFile.name}</p>
                  <p className="text-xs text-on-surface-variant">{(cvFile.size / 1024).toFixed(0)} KB</p></>
              : <><p className="text-sm font-semibold text-on-surface">Click to upload your CV</p>
                  <p className="text-xs text-on-surface-variant">PDF, DOC, DOCX — max 10 MB</p></>}
          </div>
          {cvFile && (
            <span role="button" tabIndex={0}
              onClick={ev => { ev.stopPropagation(); setCvFile(null); fileRef.current.value = ''; }}
              className="material-symbols-outlined text-on-surface-variant hover:text-error transition flex-shrink-0 text-[20px]">close</span>
          )}
        </button>
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={onFile} className="hidden" />
      </Field>

      <ServerError msg={serverErr} />
      <SubmitButton loading={status === STATES.loading} label="Submit Application" />
    </form>
  );
}

// ─── Agency form ───────────────────────────────────────────────────
function AgencyForm() {
  const [form, setForm]     = useState({ orgName: '', contactName: '', email: '', phone: '', roleType: '', headcount: '', startDate: '', requirements: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(STATES.idle);
  const [serverErr, setServerErr] = useState('');

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(ev => ({ ...ev, [name]: '' }));
  };

  const onBlur = e => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    if (err) setErrors(ev => ({ ...ev, [name]: err }));
  };

  function validateField(name, value) {
    if (name === 'orgName'     && !value.trim())  return 'Organisation name is required.';
    if (name === 'contactName' && !value.trim())  return 'Your name is required.';
    if (name === 'email'       && !value.trim())  return 'Email address is required.';
    if (name === 'email'       && !isEmail(value)) return 'Please enter a valid email address.';
    if (name === 'roleType'    && !value)         return 'Please select the role you need.';
    if (name === 'headcount'   && value && (isNaN(value) || Number(value) < 1)) return 'Please enter a valid number.';
    return '';
  }

  function validate() {
    const errs = {};
    ['orgName', 'contactName', 'email', 'roleType'].forEach(k => {
      const e = validateField(k, form[k]);
      if (e) errs[k] = e;
    });
    if (form.headcount) {
      const e = validateField('headcount', form.headcount);
      if (e) errs.headcount = e;
    }
    return errs;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus(STATES.loading); setServerErr('');
    try {
      const res  = await fetch('/api/request-staff', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setStatus(STATES.success);
    } catch (err) { setServerErr(err.message); setStatus(STATES.error); }
  }

  if (status === STATES.success) return (
    <SuccessCard title="Request received!" body="Our team will match you with available professionals and follow up shortly."
      onReset={() => { setStatus(STATES.idle); setForm({ orgName: '', contactName: '', email: '', phone: '', roleType: '', headcount: '', startDate: '', requirements: '' }); setErrors({}); }} />
  );

  const sel = (name, err) => `${baseCls} cursor-pointer ${err ? 'border-error focus:border-error focus:ring-error/20' : 'border-outline-variant focus:border-primary'}`;

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Organisation name" required error={errors.orgName}>
          <input className={inputCls(errors.orgName)} name="orgName" type="text" placeholder="Metro General Hospital"
            value={form.orgName} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Your name" required error={errors.contactName}>
          <input className={inputCls(errors.contactName)} name="contactName" type="text" placeholder="Dr. Sarah Jenkins"
            value={form.contactName} onChange={onChange} onBlur={onBlur} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email address" required error={errors.email}>
          <input className={inputCls(errors.email)} name="email" type="email" placeholder="sarah@hospital.com"
            value={form.email} onChange={onChange} onBlur={onBlur} />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input className={inputCls(errors.phone)} name="phone" type="tel" placeholder="(443) 000-0000"
            value={form.phone} onChange={onChange} onBlur={onBlur} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Role needed" required error={errors.roleType}>
          <select className={sel('roleType', errors.roleType)} name="roleType" value={form.roleType} onChange={onChange} onBlur={onBlur}>
            <option value="">Select a role…</option>
            {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Headcount" error={errors.headcount}>
          <input className={inputCls(errors.headcount)} name="headcount" type="number" min="1" placeholder="e.g. 3"
            value={form.headcount} onChange={onChange} onBlur={onBlur} />
        </Field>
      </div>

      <Field label="Desired start date">
        <input className={inputCls(false)} name="startDate" type="date" value={form.startDate} onChange={onChange} />
      </Field>

      <Field label="Specific requirements">
        <textarea className={`${inputCls(false)} resize-none`} name="requirements" rows={3}
          placeholder="Shift pattern, certifications required, location details…"
          value={form.requirements} onChange={onChange} />
      </Field>

      <ServerError msg={serverErr} />
      <SubmitButton loading={status === STATES.loading} label="Request Staff" />
    </form>
  );
}

// ─── Page ──────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('candidate');

  return (
    <div className="bg-background font-body text-on-surface antialiased">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_2px_16px_-4px_rgba(83,44,216,0.08)]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center flex-shrink-0 shadow-sm shadow-primary/30">
              <span className="material-symbols-outlined text-white icon-filled text-[16px]">favorite</span>
            </div>
            <div className="leading-tight">
              <div className="font-headline font-extrabold text-on-surface text-[14px] leading-none">Tender Smiles</div>
              <div className="text-[9px] font-bold tracking-widest text-primary uppercase">Healthcare Staffing</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-on-surface-variant">
            {[['#about','About'],['#services','Services'],['#why','Why Us'],['#contact','Contact']].map(([href,label]) => (
              <a key={href} href={href} className="hover:text-primary transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:4435592447" className="hidden sm:flex items-center gap-1.5 text-on-surface text-sm font-bold hover:text-primary transition-colors">
              <span className="material-symbols-outlined icon-filled text-primary text-[17px]">phone</span>
              (443) 559-2447
            </a>
            <a href="#apply" className="primary-gradient text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm shadow-primary/25 hover:opacity-90 transition-all active:scale-95">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main>

        {/* Hero */}
        <section className="relative overflow-hidden bg-on-surface pt-20">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-12 pb-0 grid lg:grid-cols-2 gap-10 items-center">
            <div className="py-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ts-gold/20 text-ts-gold text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined icon-filled text-[13px]">schedule</span>
                24/7 Day Services · Essex, MD
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-white leading-[1.1] tracking-tight">
                Your Trusted Partner for{' '}
                <span className="text-ts-gold">Healthcare Staffing</span>
              </h1>
              <p className="text-white/70 leading-relaxed max-w-lg">
                Connecting healthcare organizations with highly skilled professionals — ensuring seamless integration and exceptional patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a href="#apply" className="bg-ts-gold text-on-surface font-bold px-7 py-3.5 rounded-xl hover:brightness-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                  Apply Now <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </a>
                <a href="#apply" onClick={() => setActiveTab('agency')}
                  className="border-2 border-white/25 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all text-center">
                  Request Staff
                </a>
              </div>
              <div className="flex flex-wrap gap-5 pt-3 border-t border-white/10">
                {['Fully Screened Professionals', 'Rapid Placement', 'Nationwide Reach'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-white/60 text-sm">
                    <span className="material-symbols-outlined icon-filled text-primary-fixed-dim text-[15px]">check_circle</span>{t}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center py-8">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full" style={{ height: 400 }}>
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&auto=format&fit=crop"
                  alt="Tender Smiles healthcare professionals"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 glass-card rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ts-gold flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-surface icon-filled text-[17px]">groups</span>
                  </div>
                  <div>
                    <p className="text-on-surface font-bold text-sm">Local Service. Nationwide Reach.</p>
                    <p className="text-on-surface-variant text-xs">Serving healthcare facilities across the US</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full block -mb-px fill-background">
            <path d="M0,32 C360,56 1080,8 1440,32 L1440,48 L0,48 Z" />
          </svg>
        </section>

        {/* Stats bar */}
        <section className="bg-surface-container-low border-b border-outline-variant/20">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant/20">
            {STATS.map(s => (
              <div key={s.label} className="text-center px-4">
                <div className="text-2xl font-headline font-extrabold text-primary">{s.value}</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-primary-fixed/50 blur-3xl pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop"
                alt="Tender Smiles nursing team"
                className="relative rounded-2xl shadow-[0_16px_48px_-8px_rgba(83,44,216,0.18)] w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 primary-gradient rounded-xl px-4 py-3 shadow-lg text-center">
                <div className="text-xl font-headline font-extrabold text-white">24/7</div>
                <div className="text-[10px] font-bold text-white/80 uppercase tracking-wide">Day Services</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined icon-filled text-[13px]">info</span>About Us
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface leading-tight">About Tender Smiles</h2>
              <p className="text-on-surface-variant leading-relaxed">
                At Tender Smiles Healthcare Staffing, we are dedicated to revolutionizing the way healthcare organizations find their perfect staffing solutions.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Our mission is to connect you with top-tier professionals who not only possess the necessary qualifications but also seamlessly integrate into your facility's culture.
              </p>
              <div className="space-y-2.5 pt-1">
                {['Extensive Network of Highly Qualified Professionals', 'Rapid Response to Staffing Needs', 'Trusted and Reliable Partner'].map(item => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined icon-filled text-ts-gold flex-shrink-0 text-[18px]">star</span>
                    <span className="text-on-surface font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 bg-surface-container-low border-y border-outline-variant/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-3">
                <span className="material-symbols-outlined icon-filled text-[13px]">medical_services</span>Our Services
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-3">Staffing Solutions for Every Need</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                At Tender Smiles Healthcare Staffing, we bring expertise and a deep understanding of the unique staffing needs in the healthcare industry.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICES.map(s => (
                <div key={s.title}
                  className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10 hover:shadow-[0_8px_32px_-8px_rgba(83,44,216,0.15)] hover:-translate-y-0.5 transition-all group">
                  <div className={`w-10 h-10 rounded-xl ${s.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-on-surface mb-2">{s.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 primary-gradient rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.07)_0%,_transparent_70%)] pointer-events-none" />
              <h3 className="text-2xl md:text-3xl font-headline font-extrabold mb-3 relative z-10">Local Service. Nationwide Reach.</h3>
              <p className="text-white/80 max-w-2xl mx-auto text-sm leading-relaxed relative z-10">
                At Tender Smiles Healthcare Staffing, our commitment to excellence and a personalized approach sets us apart. Choose us as your staffing partner and experience the benefits of a tailored solution that meets your facility's needs, drives efficiency, and elevates the quality of patient care.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why" className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ts-gold/20 text-on-surface text-xs font-bold uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined icon-filled text-ts-gold text-[13px]">emoji_events</span>Why Choose Us
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-3 leading-tight">
                Your Trusted Partner for Healthcare Staffing
              </h2>
              <p className="text-on-surface-variant leading-relaxed mb-6 text-sm">
                Choose Tender Smiles Healthcare Staffing as your trusted partner and experience the difference of working with a company that values your success. Let us handle your staffing needs while you focus on what you do best — providing exceptional care to your patients.
              </p>
              <div className="space-y-3">
                {WHY.map(w => (
                  <div key={w.title} className="flex gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm hover:border-primary/20 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary icon-filled text-[20px]">{w.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm mb-0.5">{w.title}</h4>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{w.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-3">
                  <span className="material-symbols-outlined icon-filled text-[13px]">workspace_premium</span>Our Commitment
                </div>
                <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Our Commitment to Excellence</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-2">
                  At Tender Smiles Healthcare Staffing, we strive for excellence in everything we do. We are dedicated to delivering top-quality staffing solutions that meet the highest industry standards.
                </p>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Our team of experienced recruiters ensures that every healthcare professional we place is thoroughly screened, qualified, and suited to your facility's specific needs. With Tender Smiles Healthcare Staffing, you can trust that you are getting the best talent and exceptional service.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="primary-gradient rounded-xl p-5 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1.5">Our Mission</div>
                  <p className="text-white/90 text-sm leading-relaxed">
                    To connect healthcare organizations with highly skilled professionals, ensuring seamless integration and exceptional patient care.
                  </p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1.5">Our Vision</div>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    To be the leading provider of innovative and exceptional healthcare staffing solutions, transforming the way organizations and professionals connect.
                  </p>
                </div>
              </div>

              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop"
                alt="Smiling healthcare professional"
                className="w-full rounded-xl object-cover shadow-sm"
                style={{ height: 180 }}
              />
            </div>
          </div>
        </section>

        {/* Contact bar */}
        <section id="contact" className="bg-on-surface py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-center text-white font-headline font-extrabold text-xl mb-8">Get In Touch With Us</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: 'phone',       label: 'Call Us',    value: '(443) 559-2447',                         href: 'tel:4435592447' },
                { icon: 'mail',        label: 'Email Us',   value: 'info@tendersmileshealthcarestaffing.com', href: 'mailto:info@tendersmileshealthcarestaffing.com' },
                { icon: 'location_on', label: 'Our Office', value: '1102 Hartland Road, Suite I, Essex, MD 21221', href: null },
              ].map(c => (
                <div key={c.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center shadow-sm shadow-primary/30">
                    <span className="material-symbols-outlined text-white icon-filled text-[20px]">{c.icon}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{c.label}</div>
                  {c.href
                    ? <a href={c.href} className="text-white font-semibold text-sm hover:text-primary-fixed-dim transition-colors break-all">{c.value}</a>
                    : <p className="text-white/75 text-sm">{c.value}</p>}
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-white/40 text-xs">
              <a href="https://www.tendersmileshealthcarestaffing.com" className="hover:text-white/70 transition-colors">
                www.tendersmileshealthcarestaffing.com
              </a>
            </p>
          </div>
        </section>

        {/* Forms */}
        <section id="apply" className="py-16 px-6 bg-surface-container-low border-t border-outline-variant/20">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase tracking-widest mb-3">
                <span className="material-symbols-outlined icon-filled text-[13px]">handshake</span>Get In Touch
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2">Let's Work Together</h2>
              <p className="text-on-surface-variant text-sm">
                Whether you're a healthcare professional looking for work, or a facility seeking qualified staff — we're here to help.
              </p>
            </div>

            <div className="flex gap-1.5 p-1 bg-surface-container rounded-xl mb-6 shadow-sm">
              {[
                { id: 'candidate', icon: 'person',          label: 'Apply for a Job' },
                { id: 'agency',    icon: 'business_center', label: 'Find Staff' },
              ].map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === t.id
                      ? 'primary-gradient text-white shadow-sm shadow-primary/25'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}>
                  <span className="material-symbols-outlined text-[17px]">{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-[0_4px_32px_-4px_rgba(83,44,216,0.10)] border border-outline-variant/10 p-6">
              {activeTab === 'candidate' ? (
                <>
                  <div className="mb-5">
                    <h3 className="text-xl font-headline font-extrabold text-on-surface mb-1">Apply to Tender Smiles</h3>
                    <p className="text-on-surface-variant text-sm">Send us your CV and we'll match you with the right opportunities.</p>
                  </div>
                  <CandidateForm />
                </>
              ) : (
                <>
                  <div className="mb-5">
                    <h3 className="text-xl font-headline font-extrabold text-on-surface mb-1">Request Healthcare Staff</h3>
                    <p className="text-on-surface-variant text-sm">Tell us what you need and we'll connect you with verified professionals fast.</p>
                  </div>
                  <AgencyForm />
                </>
              )}
            </div>
            <p className="text-center text-xs text-on-surface-variant mt-4">
              Your data is handled securely and never shared with third parties.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-on-surface text-white pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full primary-gradient flex items-center justify-center shadow-sm shadow-primary/30">
                  <span className="material-symbols-outlined text-white icon-filled text-[16px]">favorite</span>
                </div>
                <div>
                  <div className="font-headline font-extrabold text-white text-sm leading-none">Tender Smiles</div>
                  <div className="text-[9px] font-bold tracking-widest text-primary-fixed-dim uppercase">Healthcare Staffing Agency</div>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Revolutionizing healthcare staffing through technology, transparency, and a genuine commitment to exceptional patient care.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-primary-fixed-dim mb-4">Services</h5>
              <ul className="space-y-2.5 text-sm">
                {['Temporary Staffing', 'Direct Hire', 'Per Diem', 'Locum Tenens'].map(s => (
                  <li key={s}><a href="#services" className="text-white/50 hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-widest text-primary-fixed-dim mb-4">Contact</h5>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><a href="tel:4435592447" className="hover:text-white transition-colors">(443) 559-2447</a></li>
                <li><a href="mailto:info@tendersmileshealthcarestaffing.com" className="hover:text-white transition-colors break-all">info@tendersmileshealthcarestaffing.com</a></li>
                <li className="leading-relaxed">1102 Hartland Road, Suite I<br />Essex, MD 21221</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 text-center text-white/30 text-xs">
            © 2024 Tender Smiles Healthcare Staffing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
