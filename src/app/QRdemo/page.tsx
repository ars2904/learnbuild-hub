'use client';

import { useEffect, useState } from 'react';

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<string, React.ReactNode> = {
    car: <><path d="M5 17h14" /><path d="M6 17l-1-4 2-5h10l2 5-1 4" /><circle cx="8" cy="17" r="1.5" /><circle cx="16" cy="17" r="1.5" /></>,
    bike: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M6 17l4-8h4l4 8M10 9l3 8M12 6h2" /></>,
    shield: <><path d="M12 3l7 3v5c0 4.6-3 8.3-7 10-4-1.7-7-5.4-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20c.7-3.2 2.5-5 5.5-5s4.8 1.8 5.5 5M15 15.5c2.5.2 4.2 1.6 5 4.5" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
    smartphone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M10 5h4M11 18.5h2" /></>,
    download: <><path d="M12 3v11" /><path d="m8 10 4 4 4-4" /><path d="M5 20h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export default function Home() {
  const [mobileNav, setMobileNav] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'book' | 'share' | 'login'>('login');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [installEvent, setInstallEvent] = useState<InstallEvent | null>(null);
  const [installOpen, setInstallOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallEvent);
    };

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua) && !('MSStream' in window));

    window.addEventListener('beforeinstallprompt', handler);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const openAuth = (mode: 'book' | 'share' | 'login') => {
    setAuthMode(mode);
    setOtpSent(false);
    setOtp('');
    setAuthOpen(true);
    setMobileNav(false);
  };

  const sendOtp = () => {
    if (mobile.replace(/\D/g, '').length !== 10) return;
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) return;
    setAuthOpen(false);
    // Next step: replace this with Supabase OTP verification + redirect.
    window.location.href = authMode === 'share' ? '/share-ride' : '/book-ride';
  };

  const installApp = async () => {
    if (installEvent) {
      await installEvent.prompt();
      await installEvent.userChoice;
      setInstallEvent(null);
      setInstallOpen(false);
      return;
    }
    setInstallOpen(true);
  };

  return (
    <main className="offigo-page">
      <header className="site-header">
        <div className="container nav-inner">
          <a className="brand" href="#home" aria-label="OffiGo home">
            <img src="/offigo-logo.png" alt="OffiGo" className="brand-logo" />
            <span className="brand-fallback"><b>Offi</b><strong>Go</strong></span>
          </a>

          <nav className={mobileNav ? 'nav-links mobile-open' : 'nav-links'}>
            <a href="#home" onClick={() => setMobileNav(false)}>Home</a>
            <a href="#how-it-works" onClick={() => setMobileNav(false)}>How It Works</a>
            <a href="#safety" onClick={() => setMobileNav(false)}>Safety</a>
            <a href="#corporate" onClick={() => setMobileNav(false)}>Corporate</a>
            <a href="#faq" onClick={() => setMobileNav(false)}>FAQ</a>
            <a href="#contact" onClick={() => setMobileNav(false)}>Contact</a>
          </nav>

          <div className="nav-actions">
            <button className="login-btn" onClick={() => openAuth('login')}>Login</button>
            <button className="mobile-menu" onClick={() => setMobileNav(v => !v)} aria-label="Open menu">
              <Icon name={mobileNav ? 'x' : 'menu'} size={23} />
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />

        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="mini-brand">
              <img src="/offigo-logo.png" alt="" />
              <span>OffiGo</span>
            </div>

            <p className="eyebrow">YOUR DAILY CORPORATE COMMUTE NETWORK</p>

            <h1>
              Same Office.<br />
              Same Route.<br />
              <em>Better Together.</em>
            </h1>

            <p className="hero-text">
              Join verified professionals, share or book rides,
              and make your daily commute easier, safer and more affordable.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => openAuth('book')}>
                <Icon name="car" size={19} /> Book a Ride
              </button>
              <button className="secondary-btn" onClick={() => openAuth('share')}>
                <Icon name="users" size={19} /> Share a Ride
              </button>
            </div>

            <button className="install-link" onClick={installApp}>
              <Icon name="smartphone" size={17} /> Add OffiGo to Home Screen
            </button>
          </div>

          <div className="hero-art" aria-label="Corporate car and bike commute">
            <div className="sun" />
            <div className="city">
              {[55, 80, 105, 72, 125, 92, 145, 68, 115, 82].map((h, i) => (
                <span key={i} style={{ height: `${h}px` }} />
              ))}
            </div>
            <div className="road road-back" />
            <div className="road road-main">
              <div className="lane lane-one" />
              <div className="lane lane-two" />
              <div className="lane lane-three" />
            </div>
            <div className="route-orbit" />
            <div className="hero-car">
              <div className="car-roof" />
              <div className="car-body" />
              <i className="wheel w1" /><i className="wheel w2" />
              <i className="headlight h1" /><i className="headlight h2" />
            </div>
            <div className="hero-bike">
              <i className="bike-wheel b1" /><i className="bike-wheel b2" />
              <div className="bike-frame" />
              <div className="bike-person" />
            </div>
            <div className="arrow-orbit">↗</div>
            <div className="art-caption">Corporate commute, reimagined.</div>
          </div>
        </div>

        <div className="container trust-row">
          <div className="trust-card how-card">
            <h2>How OffiGo Works</h2>
            <div className="steps">
              <div className="step">
                <span className="step-icon"><Icon name="search" /></span>
                <div><b>1</b><strong>Choose your route</strong><small>Enter your office location and preferred time.</small></div>
              </div>
              <div className="step">
                <span className="step-icon"><Icon name="users" /></span>
                <div><b>2</b><strong>Find a matching commute</strong><small>View available rides from verified professionals.</small></div>
              </div>
              <div className="step">
                <span className="step-icon"><Icon name="shield" /></span>
                <div><b>3</b><strong>Connect & ride</strong><small>Book or share a ride and commute together.</small></div>
              </div>
            </div>
          </div>

          <div className="trust-card feature-card">
            <div><Icon name="shield" size={30} /><b>Corporate<br />Verified</b></div>
            <div><span className="vehicle-icons"><Icon name="car" size={26} /><Icon name="bike" size={25} /></span><b>Car & Bike<br />Options</b></div>
            <div><Icon name="shield" size={30} /><b>Safe &<br />Reliable</b></div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section light-section">
        <div className="container">
          <div className="section-heading">
            <span>HOW IT WORKS</span>
            <h2>Your daily commute, without the daily hassle.</h2>
            <p>Built around office routes, shift timings and trusted corporate communities.</p>
          </div>
          <div className="info-grid">
            {[
              ['01', 'Set your office route', 'Select your locality, office or tech park and preferred commute time.'],
              ['02', 'Find the right match', 'See compatible car and bike rides based on route, time and availability.'],
              ['03', 'Book or share', 'Need a seat? Book one. Driving? Share your empty seats with colleagues.'],
              ['04', 'Commute with confidence', 'Use verified profiles, ratings and safety controls before every ride.'],
            ].map(([n, title, text]) => (
              <article className="info-card" key={n}>
                <span>{n}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="safety" className="section dark-section">
        <div className="container safety-grid">
          <div>
            <span className="section-kicker">SAFETY FIRST</span>
            <h2>Built for people you can trust.</h2>
            <p>OffiGo is designed around corporate identity, transparent profiles and safer pickup points.</p>
          </div>
          <div className="safety-list">
            {['Mobile OTP verification', 'Corporate/work-email verification', 'Profile, vehicle & ride details', 'Ratings, reports and blocking', 'Safe pickup-point sharing', 'Ride status and support'].map(item => (
              <div key={item}><Icon name="check" size={19} /><span>{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="corporate" className="section corporate-section">
        <div className="container corporate-box">
          <div>
            <span className="section-kicker">FOR COMPANIES</span>
            <h2>Turn employee commute into a connected community.</h2>
            <p>OffiGo can help companies create verified employee commute networks, improve ride availability and support more efficient daily travel.</p>
          </div>
          <button className="secondary-btn dark-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Talk to OffiGo <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>

      <section id="faq" className="section light-section">
        <div className="container">
          <div className="section-heading"><span>FAQ</span><h2>Simple questions. Clear answers.</h2></div>
          <div className="faq-grid">
            <details><summary>Is OffiGo only for office commute?</summary><p>Yes. OffiGo is focused on recurring home-to-office and office-to-home commuting rather than generic city rides.</p></details>
            <details><summary>Can I use both carpool and bikepool?</summary><p>Yes. Your profile can support both ride-seeking and ride-sharing, subject to availability and applicable rules.</p></details>
            <details><summary>Do I need to login before searching?</summary><p>No. The public landing experience can be explored first. Login is requested when you want to book or share a ride.</p></details>
            <details><summary>How does corporate verification work?</summary><p>After mobile OTP, you can verify your work email/company identity. Verified profiles receive a corporate verification badge.</p></details>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand"><img src="/offigo-logo.png" alt="OffiGo" /><span>OffiGo</span></div>
            <p>Your Daily Corporate Commute Network.</p>
            <button className="install-footer" onClick={installApp}><Icon name="download" size={17} /> Install OffiGo</button>
          </div>
          <div><b>Product</b><a href="#how-it-works">How It Works</a><a href="#safety">Safety</a><a href="#corporate">Corporate</a></div>
          <div><b>Support</b><a href="#faq">FAQ</a><a href="mailto:hello@offigo.in">Contact</a><a href="#home">Privacy</a></div>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} OffiGo. Powered by LearnBuild Hub.</div>
      </footer>

      {authOpen && (
        <div className="modal-backdrop" onMouseDown={() => setAuthOpen(false)}>
          <div className="auth-modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setAuthOpen(false)}><Icon name="x" size={20} /></button>
            <div className="auth-icon"><Icon name="lock" size={25} /></div>
            <span className="section-kicker">OFFIGO ACCOUNT</span>
            <h2>{authMode === 'book' ? 'Login to book a ride' : authMode === 'share' ? 'Login to share a ride' : 'Welcome to OffiGo'}</h2>
            <p>Search and explore first. We only ask you to login when you are ready to continue.</p>
            {!otpSent ? (
              <>
                <label>Mobile number</label>
                <div className="phone-input"><span>+91</span><input inputMode="numeric" maxLength={10} value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} placeholder="Enter 10-digit mobile number" /></div>
                <button className="primary-btn full-btn" onClick={sendOtp}>Send OTP <Icon name="arrow" size={18} /></button>
              </>
            ) : (
              <>
                <label>Enter OTP</label>
                <input className="otp-input" inputMode="numeric" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="6-digit OTP" />
                <button className="primary-btn full-btn" onClick={verifyOtp}>Verify & Continue <Icon name="arrow" size={18} /></button>
                <button className="text-btn" onClick={() => setOtpSent(false)}>Change mobile number</button>
              </>
            )}
            <small className="privacy-note">By continuing, you agree to OffiGo's Terms and Privacy Policy.</small>
          </div>
        </div>
      )}

      {installOpen && (
        <div className="modal-backdrop" onMouseDown={() => setInstallOpen(false)}>
          <div className="install-modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setInstallOpen(false)}><Icon name="x" size={20} /></button>
            <div className="auth-icon"><Icon name="smartphone" size={25} /></div>
            <span className="section-kicker">INSTALL OFFIGO</span>
            <h2>Add OffiGo to your Home Screen</h2>
            {isIOS ? (
              <ol><li>Tap the <b>Share</b> button in Safari.</li><li>Select <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b> to finish.</li></ol>
            ) : (
              <ol><li>Open OffiGo in Chrome.</li><li>Tap the browser menu and choose <b>Install app</b> or <b>Add to Home screen</b>.</li><li>Confirm the installation.</li></ol>
            )}
            <p className="install-note">On supported Android browsers, OffiGo can also show the native install prompt automatically.</p>
          </div>
        </div>
      )}
    </main>
  );
}
