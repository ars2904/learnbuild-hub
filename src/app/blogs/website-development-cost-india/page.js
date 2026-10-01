// Path in your project: app/blogs/website-development-cost-india/page.js

export const metadata = {
  title: "Website Development Cost in India 2026 | LearnBuild Hub",
  description:
    "How much does a website cost in 2026? Compare simple, e-commerce and custom website prices and tips to choose the right developer.",
  alternates: {
    canonical: "https://learnbuildhub.com/blogs/website-development-cost-india",
  },
  openGraph: {
    title: "How Much Does a Website Cost in 2026?",
    description:
      "Simple, e-commerce and custom website prices explained, plus tips to choose the right developer.",
    url: "https://learnbuildhub.com/blogs/website-development-cost-india",
    type: "article",
  },
};

const rows = [
  ["Simple business website (5-8 pages)", "₹10,000 - ₹30,000"],
  ["E-commerce website", "₹30,000 - ₹1,50,000"],
  ["Custom web application", "₹1,00,000+"],
];

const s = {
  main: { maxWidth: 760, margin: "0 auto", padding: "32px 16px", lineHeight: 1.7 },
  h1: { fontSize: 32, lineHeight: 1.25, marginBottom: 16 },
  h2: { fontSize: 24, marginTop: 32, marginBottom: 8 },
  cell: { border: "1px solid #ccc", padding: "8px 12px", textAlign: "left" },
  cta: {
    display: "inline-block",
    marginTop: 12,
    padding: "12px 20px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: 8,
    textDecoration: "none",
  },
};

export default function BlogPost() {
  return (
    <main style={s.main}>
      <article>
        <h1 style={s.h1}>How Much Does a Website Cost in 2026? (Complete Guide)</h1>

        <p>
          Starting a business or replacing an old site? The first question is
          always: <strong>how much will a website cost?</strong> The answer
          depends on what you need. Here is a simple breakdown.
        </p>

        <h2 style={s.h2}>What Affects Website Cost?</h2>
        <ul>
          <li><strong>Type of website:</strong> simple business site, e-commerce, or custom web app</li>
          <li><strong>Number of pages:</strong> a 5-page site costs less than a 50-page one</li>
          <li><strong>Design:</strong> ready-made template or fully custom design</li>
          <li><strong>Features:</strong> payment gateway, login, admin panel, booking system</li>
          <li><strong>Technology:</strong> WordPress or custom code (Next.js, React)</li>
        </ul>

        <h2 style={s.h2}>Approximate Costs by Website Type</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={s.cell}>Type</th>
                <th style={s.cell}>Approx. Cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([type, cost]) => (
                <tr key={type}>
                  <td style={s.cell}>{type}</td>
                  <td style={s.cell}>{cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p><em>These are averages. The final price depends on your requirements.</em></p>

        <h2 style={s.h2}>Other Costs to Plan For</h2>
        <ol>
          <li><strong>Domain:</strong> ₹700 - ₹1,500 per year</li>
          <li><strong>Hosting:</strong> ₹0 to ₹10,000 per year (platforms like Vercel host small sites for free)</li>
          <li><strong>Maintenance:</strong> updates, backups and security</li>
          <li><strong>SEO and marketing:</strong> to actually bring customers to your site</li>
        </ol>

        <h2 style={s.h2}>The Problem With Very Cheap Websites</h2>
        <p>
          Very low prices often mean copied templates, slow loading, poor mobile
          design and no Google ranking. Look beyond price: check{" "}
          <strong>speed, design, SEO and support</strong>.
        </p>

        <h2 style={s.h2}>How to Choose the Right Developer</h2>
        <ol>
          <li>Check their past projects and live websites</li>
          <li>Read client reviews</li>
          <li>Get deliverables in writing</li>
          <li>Ask about post-launch support</li>
        </ol>

        <h2 style={s.h2}>Conclusion</h2>
        <p>
          A good website is not an expense, it is an <strong>investment</strong>{" "}
          that works for you 24/7. If you need web development, software
          development or digital marketing, <strong>LearnBuild Hub</strong> can
          help.
        </p>

        <a href="/contact" style={s.cta}>Get a Free Consultation</a>
      </article>
    </main>
  );
}
