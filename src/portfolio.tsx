import { useState, useEffect, useRef, type CSSProperties } from "react";
import healthup from "./assets/healthup.png";
import dibs from "./assets/dibs.png";
import pasabuy from "./assets/pasabuy.png";
import bayadpo from "./assets/bayadpo.png";

// ── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  number: string;
  title: string;
  description: string;
  stack: string[];
  link: string;
  image: string;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactLink {
  label: string;
  value: string;
}

interface TechItem {
  name: string;
  icon: string;
  color: string;
  inlineSvg?: string;
}

interface TechGroup {
  label: string;
  items: TechItem[];
}

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS: string[] = ["About", "Stack", "Skills", "Projects", "Contact"];

const SKILLS: Skill[] = [
  {
    category: "Frontend",
    items: ["Vue.js", "React", "Blade", "Tailwind CSS", "Lucide", "Shadcn", "Pinia"],
  },
  {
    category: "Backend",
    items: ["Livewire", "Node.js", "Express", "Laravel", "MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  { category: "DevOps", items: ["Git", "Docker", "Prometheus", "Grafana", "Loki"] },
];

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "HealthUP",
    description:
      "A mobile application for health monitoring of UPLB constituents during the COVID-19 pandemic.",
    stack: ["Flutter", "Firebase", "Google Auth"],
    link: "#",
    image: healthup,
  },
  {
    number: "02",
    title: "DIBS",
    description:
      "DIBS is a web application that allows students to book rooms in the ICS building.",
    stack: ["Next.js", "TypeScript", "MongoDB", "TailwindCSS", "FastAPI", "Firebase"],
    link: "https://dibs-kohl.vercel.app/",
    image: dibs,
  },
  {
    number: "03",
    title: "PASABUY UPLB",
    description:
      "An e-commerce website for item ordering, purchasing, and order tracking.",
    stack: ["Laravel", "Livewire", "Alpine.js", "TailwindCSS", "MySQL", "Cloudinary"],
    link: "https://pasabuy.infinityfreeapp.com",
    image: pasabuy,
  },
  {
    number: "04",
    title: "Bayad Po!",
    description:
      "A web application for Filipino commuters to check estimated fares.",
    stack: ["React", "Javascript", "RESTful API", "OpenStreetMap"],
    link: "https://bayad-po-ph.vercel.app/",
    image: bayadpo,
  },
];

const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: "harbilloyd05@gmail.com" },
  { label: "GitHub", value: "https://github.com/Harvs04" },
  {
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/harvey-lloyd-martinez-20b2b62b4",
  },
];

// ── Tech Stack Icons (SVG paths) ──────────────────────────────────────────────
// Java is no longer in Simple Icons; embed the classic cup logo inline
const JAVA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <path fill="#ED8B00" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
  <path fill="#ED8B00" d="M69.802 61.271c6.025 6.929-1.58 13.166-1.58 13.166s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.191z"/>
  <path fill="#ED8B00" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0 .001.359-.327.468-.617z"/>
  <path fill="#ED8B00" d="M76.491 1.587s12.968 12.97-12.303 32.923c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.89 81.722 22.784 76.491 1.587z"/>
  <path fill="#ED8B00" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
</svg>`;

// Using Simple Icons CDN for brand icons
const TECH_STACK: TechGroup[] = [
  {
    label: "Web Development",
    items: [
      { name: "Vue.js", icon: "Vue.js", color: "#4FC08D" },
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Node.js", icon: "nodedotjs", color: "#339933" },
      { name: "Laravel", icon: "laravel", color: "#FF2D20" },
      { name: "Livewire", icon: "livewire", color: "#FB70A9" },
      { name: "Alpine.js", icon: "alpinedotjs", color: "#8BC0D0" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "#06B6D4" },
      { name: "MJML", icon: "mjml", color: "#F4A41D" },
      { name: "Pinia", icon: "pinia", color: "#F4A41D" },
      { name: "Ethereal", icon: "ethereal", color: "#F4A41D" },
    ],
  },
  {
    label: "Database & DevOps",
    items: [
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Prometheus", icon: "prometheus", color: "#E6522C" },
      { name: "Grafana", icon: "grafana", color: "#F46800" },
      { name: "Loki", icon: "grafana", color: "#F5A623" },
      { name: "Git", icon: "git", color: "#F05032" },
    ],
  },
  {
    label: "Programming Languages",
    items: [
      { name: "JavaScript", icon: "javascript", color: "#F7DF1E" },
      { name: "PHP", icon: "php", color: "#777BB4" },
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "C", icon: "c", color: "#A8B9CC" },
      {
        name: "Java",
        icon: "__inline__",
        color: "#ED8B00",
        inlineSvg: JAVA_SVG,
      },
      { name: "HTML/CSS", icon: "html5", color: "#E34F26" },
      { name: "Dart", icon: "dart", color: "#0175C2" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Grafana", icon: "grafana", color: "#F46800" },
      { name: "Prometheus", icon: "prometheus", color: "#E6522C" },
      { name: "Power Automate", icon: "powerautomate", color: "#0066FF" },
      { name: "Github", icon: "github", color: "#0066FF" },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeStackTab, setActiveStackTab] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    document
      .querySelectorAll<HTMLElement>("section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string): void => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <span style={styles.navLogo} onClick={() => scrollTo("hero")}>
          HLM
        </span>
        <div style={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                ...styles.navLink,
                ...(activeSection === link.toLowerCase()
                  ? styles.navLinkActive
                  : {}),
              }}
            >
              {link}
            </button>
          ))}
        </div>
        <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barTop : {}) }} />
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barMid : {}) }} />
          <span style={{ ...styles.bar, ...(menuOpen ? styles.barBot : {}) }} />
        </button>
      </nav>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={styles.mobileLink}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={heroRef} style={styles.hero}>
        <div style={styles.gridOverlay} aria-hidden="true" />
        <div style={styles.heroInner}>
          <h1 style={styles.heroName} className="fade-up delay-1">
            Harvey Lloyd
            <br />
            Martinez
          </h1>
          <p style={styles.heroRole} className="fade-up delay-2">
            Software Developer
          </p>
          <div style={styles.heroDivider} className="fade-up delay-2" />
          <p style={styles.heroDesc} className="fade-up delay-3">
            I build thoughtful, performant web applications.
          </p>
          <div style={styles.heroCtas} className="fade-up delay-4">
            <button
              style={styles.btnPrimary}
              onClick={() => scrollTo("Projects")}
            >
              View Work
            </button>
            <button
              style={styles.btnSecondary}
              onClick={() => scrollTo("Contact")}
            >
              Get in Touch
            </button>
          </div>
        </div>
        <div style={styles.heroDecor} aria-hidden="true">
          <div style={styles.decorRing1} />
          <div style={styles.decorRing2} />
          <div style={styles.decorRing3} />
          <div style={styles.decorCenter} />
        </div>
        <div style={styles.scrollHint}>
          <span style={styles.scrollLine} />
          <span style={styles.scrollText}>scroll</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>01</span>
            <h2 style={styles.sectionTitle}>About</h2>
            <div style={styles.sectionLine} />
          </div>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutAvatar}>
              <div style={styles.avatarBox}>
                <span style={styles.avatarInitials}>HLM</span>
              </div>
              <div style={styles.avatarBadge}>
                <span style={styles.avatarDot} />
                <span style={styles.avatarStatus}>Open to roles</span>
              </div>
            </div>
            <div>
              <p style={styles.aboutLead}>
                I'm an aspiring full stack developer with nearly 1 year of
                experience building web applications focused on functionality
                and user experience.
              </p>

              <p style={styles.aboutBody}>
                I enjoy working with modern web technologies, writing clean and
                maintainable code, and turning ideas into practical projects.
                I'm continuously improving my skills through hands-on
                development, learning new tools, and experimenting with side
                projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>02</span>
            <h2 style={styles.sectionTitle}>Tech Stack</h2>
            <div style={styles.sectionLine} />
          </div>

          {/* Tab Bar */}
          <div style={styles.stackTabs}>
            {TECH_STACK.map((group, i) => (
              <button
                key={group.label}
                onClick={() => setActiveStackTab(i)}
                style={{
                  ...styles.stackTab,
                  ...(activeStackTab === i ? styles.stackTabActive : {}),
                }}
                className="stack-tab"
              >
                {group.label}
              </button>
            ))}
          </div>

          {/* Icon Grid */}
          {/* Icon Grid */}
          <div style={styles.stackGrid}>
            {TECH_STACK[activeStackTab].items.map((tech) => (
              <div
                key={tech.name}
                style={styles.techCard}
                className="tech-card"
              >
                <div style={styles.techIconWrap}>
                  {tech.icon === "__inline__" ? (
                    <div
                      style={styles.techIcon}
                      dangerouslySetInnerHTML={{ __html: tech.inlineSvg ?? "" }}
                    />
                  ) : (
                    <img
                      src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color.replace("#", "")}`}
                      alt={tech.name}
                      style={styles.techIcon}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector(".icon-fallback")) {
                          const fb = document.createElement("span");
                          fb.className = "icon-fallback";
                          fb.textContent = tech.name.slice(0, 2).toUpperCase();
                          fb.style.cssText = `font-size:15px;font-weight:700;color:${tech.color};font-family:'DM Sans',sans-serif;`;
                          parent.appendChild(fb);
                        }
                      }}
                    />
                  )}
                </div>
                <span style={styles.techName}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>03</span>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div style={styles.sectionLine} />
          </div>
          <div style={styles.skillsGrid}>
            {SKILLS.map((group) => (
              <div key={group.category} style={styles.skillGroup}>
                <h3 style={styles.skillCategory}>{group.category}</h3>
                <div style={styles.skillItems}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={styles.skillTag}
                      className="skill-tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ ...styles.section, ...styles.sectionAlt }}
      >
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>04</span>
            <h2 style={styles.sectionTitle}>Projects</h2>
            <div style={styles.sectionLine} />
          </div>
          <div style={styles.projectList}>
            {PROJECTS.map((project, i) => (
              <div
                key={project.number}
                style={{
                  ...styles.projectRow,
                  ...(hoveredProject === i ? styles.projectRowHover : {}),
                  ...(i !== PROJECTS.length - 1 ? styles.projectRowBorder : {}),
                }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <span style={styles.projectNum}>{project.number}</span>

                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    ...styles.projectImage,
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(project.image)}
                />

                <div style={styles.projectInfo}>
                  <h3
                    style={{
                      ...styles.projectTitle,
                      ...(hoveredProject === i ? styles.projectTitleHover : {}),
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={styles.projectDesc}>{project.description}</p>
                  <div style={styles.projectStack}>
                    {project.stack.map((tag) => (
                      <span key={tag} style={styles.stackTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  style={{
                    ...styles.projectArrow,
                    ...(hoveredProject === i ? styles.projectArrowHover : {}),
                  }}
                >
                  →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionNum}>05</span>
            <h2 style={styles.sectionTitle}>Contact</h2>
            <div style={styles.sectionLine} />
          </div>
          <div style={styles.contactGrid}>
            <div>
              <p style={styles.contactLead}>
                Have a project in mind or just want to chat? I'd love to hear
                from you.
              </p>
              <div style={styles.contactLinks}>
                {CONTACT_LINKS.map(({ label, value }) => (
                  <div key={label} style={styles.contactLink}>
                    <span style={styles.contactLinkLabel}>{label}</span>
                    <span style={styles.contactLinkVal}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {submitted ? (
                <div style={styles.successMsg}>
                  <span style={styles.successIcon}>✓</span>
                  <p style={styles.successText}>
                    Message sent! I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  {(["name", "email"] as const).map((field) => (
                    <div key={field} style={styles.formGroup}>
                      <label style={styles.label}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        required
                        value={formState[field]}
                        onChange={handleInputChange}
                        style={styles.input}
                        className="form-input"
                      />
                    </div>
                  ))}
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      style={{ ...styles.input, ...styles.textarea }}
                      className="form-input"
                    />
                  </div>
                  <button
                    type="submit"
                    style={styles.btnPrimary}
                    className="submit-btn"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        {selectedImage && (
          <div
            style={styles.modalOverlay}
            onClick={() => setSelectedImage(null)}
          >
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                style={styles.modalClose}
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>

              <img
                src={selectedImage}
                alt="Preview"
                style={styles.modalImage}
              />
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>HLM</span>
        <span style={styles.footerText}>© 2026 Harvey Lloyd Martinez</span>
      </footer>
    </div>
  );
}

// ── Design Tokens ─────────────────────────────────────────────────────────────

const C = {
  navy900: "#060d1f",
  navy800: "#0b1735",
  navy700: "#0f2050",
  navy600: "#162a6e",
  gold400: "#d4a853",
  gold300: "#e2bc72",
  white: "#ffffff",
  offwhite: "#e8ecf4",
  muted: "#8892a4",
  border: "#1a2d52",
  borderGold: "#d4a85340",
} as const;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles: Record<string, CSSProperties> = {
  root: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    background: C.navy900,
    color: C.offwhite,
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 56px",
    height: "68px",
    background: "rgba(6,13,31,0.92)",
    backdropFilter: "blur(16px)",
    borderBottom: `1px solid ${C.border}`,
  },
  navLogo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontWeight: 700,
    fontSize: "20px",
    letterSpacing: "0.18em",
    cursor: "pointer",
    color: C.gold400,
    textTransform: "uppercase",
  },
  navLinks: { display: "flex", gap: "40px" },
  navLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    color: C.muted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "color 0.2s",
    padding: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  navLinkActive: { color: C.gold400 },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  bar: {
    display: "block",
    width: "22px",
    height: "1.5px",
    background: C.gold400,
    transition: "all 0.25s",
    transformOrigin: "center",
  },
  barTop: { transform: "translateY(6.5px) rotate(45deg)" },
  barMid: { opacity: 0 },
  barBot: { transform: "translateY(-6.5px) rotate(-45deg)" },
  mobileMenu: {
    position: "fixed",
    top: "68px",
    left: 0,
    right: 0,
    zIndex: 99,
    background: C.navy800,
    borderBottom: `1px solid ${C.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "16px 0",
  },
  mobileLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    color: C.offwhite,
    padding: "14px 56px",
    textAlign: "left",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  },
  hero: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "120px 56px 80px",
    position: "relative",
    overflow: "hidden",
    background: `radial-gradient(ellipse 80% 60% at 60% 50%, ${C.navy700}55 0%, ${C.navy900} 70%)`,
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(${C.border}30 1px, transparent 1px), linear-gradient(90deg, ${C.border}30 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroInner: { maxWidth: "640px", position: "relative", zIndex: 2 },
  heroEyebrow: {
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.gold400,
    marginBottom: "28px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "'DM Sans', sans-serif",
  },
  eyebrowDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: C.gold400,
    boxShadow: `0 0 8px ${C.gold400}`,
  },
  heroName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "clamp(54px, 8vw, 100px)",
    fontWeight: 700,
    lineHeight: 0.95,
    letterSpacing: "-0.01em",
    color: C.white,
    margin: "0 0 20px",
  },
  heroRole: {
    fontSize: "16px",
    fontWeight: 400,
    color: C.muted,
    marginBottom: "16px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  },
  heroDivider: {
    width: "48px",
    height: "1px",
    background: `linear-gradient(90deg, ${C.gold400}, transparent)`,
    marginBottom: "24px",
  },
  heroDesc: {
    fontSize: "16px",
    lineHeight: 1.8,
    color: C.muted,
    maxWidth: "460px",
    marginBottom: "44px",
    fontFamily: "'DM Sans', sans-serif",
  },
  heroCtas: { display: "flex", gap: "16px", flexWrap: "wrap" },
  heroDecor: {
    position: "absolute",
    right: "6%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "460px",
    height: "460px",
    zIndex: 1,
    pointerEvents: "none",
  },
  decorRing1: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: `1px solid ${C.border}`,
  },
  decorRing2: {
    position: "absolute",
    inset: "50px",
    borderRadius: "50%",
    border: `1px solid ${C.borderGold}`,
  },
  decorRing3: {
    position: "absolute",
    inset: "110px",
    borderRadius: "50%",
    border: `1px solid ${C.border}`,
  },
  decorCenter: {
    position: "absolute",
    inset: "170px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${C.navy700} 0%, ${C.navy800} 100%)`,
    border: `1px solid ${C.borderGold}`,
    boxShadow: `0 0 60px ${C.navy600}80`,
  },
  scrollHint: {
    position: "absolute",
    bottom: "40px",
    left: "56px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  scrollLine: {
    display: "block",
    width: "40px",
    height: "1px",
    background: `linear-gradient(90deg, ${C.gold400}, transparent)`,
  },
  scrollText: {
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.muted,
    fontFamily: "'DM Sans', sans-serif",
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${C.gold400}, ${C.gold300})`,
    color: C.navy900,
    border: "none",
    padding: "14px 32px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: `0 4px 20px ${C.gold400}40`,
  },
  btnSecondary: {
    background: "transparent",
    color: C.gold400,
    border: `1px solid ${C.gold400}80`,
    padding: "14px 32px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    borderRadius: "2px",
    transition: "border-color 0.2s, background 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  section: { padding: "108px 56px" },
  sectionAlt: { background: C.navy800 },
  container: { maxWidth: "1000px", margin: "0 auto" },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "60px",
  },
  sectionNum: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    color: C.gold400,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    minWidth: "24px",
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "36px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    margin: 0,
    color: C.white,
    whiteSpace: "nowrap",
  },
  sectionLine: {
    flex: 1,
    height: "1px",
    background: `linear-gradient(90deg, ${C.borderGold}, transparent)`,
  },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "72px",
    alignItems: "start",
  },
  aboutAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  avatarBox: {
    width: "168px",
    height: "168px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${C.navy700}, ${C.navy600})`,
    border: `2px solid ${C.borderGold}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 40px ${C.navy600}60, inset 0 1px 0 ${C.gold400}20`,
  },
  avatarInitials: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "32px",
    fontWeight: 700,
    color: C.gold400,
    letterSpacing: "0.1em",
  },
  avatarBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 14px",
    borderRadius: "20px",
    background: C.navy700,
    border: `1px solid ${C.borderGold}`,
  },
  avatarDot: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#4ade80",
    boxShadow: "0 0 6px #4ade80",
  },
  avatarStatus: {
    fontSize: "11px",
    fontFamily: "'DM Sans', sans-serif",
    color: C.muted,
    letterSpacing: "0.05em",
  },
  aboutLead: {
    fontSize: "19px",
    fontWeight: 600,
    lineHeight: 1.6,
    color: C.white,
    marginBottom: "20px",
    marginTop: 0,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  aboutBody: {
    fontSize: "15px",
    lineHeight: 1.9,
    color: C.muted,
    marginBottom: "40px",
    fontFamily: "'DM Sans', sans-serif",
  },
  aboutStats: {
    display: "flex",
    gap: "48px",
    paddingTop: "32px",
    borderTop: `1px solid ${C.border}`,
  },
  stat: { display: "flex", flexDirection: "column", gap: "4px" },
  statNum: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "36px",
    fontWeight: 700,
    color: C.gold400,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "11px",
    color: C.muted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
  },
  // ── Tech Stack styles ───────────────────────────────────────────────────────
  stackTabs: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
    marginBottom: "44px",
    borderBottom: `1px solid ${C.border}`,
    paddingBottom: "0",
  },
  stackTab: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
    color: C.muted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "10px 20px",
    borderRadius: "2px 2px 0 0",
    transition: "color 0.2s, background 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    bottom: "-1px",
    borderBottom: "2px solid transparent",
  },
  stackTabActive: {
    color: C.gold400,
    borderBottom: `2px solid ${C.gold400}`,
    background: `${C.gold400}08`,
  },
  stackGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: "16px",
  },
  techCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "24px 16px",
    background: `linear-gradient(135deg, ${C.navy900}80, ${C.navy700}30)`,
    border: `1px solid ${C.border}`,
    borderRadius: "6px",
    transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
    cursor: "default",
  },
  techIconWrap: {
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  techIcon: {
    width: "36px",
    height: "36px",
    objectFit: "contain",
    filter: "brightness(0.9)",
    transition: "filter 0.2s, transform 0.2s",
  },
  techName: {
    fontSize: "11px",
    fontWeight: 500,
    color: C.muted,
    letterSpacing: "0.05em",
    textAlign: "center",
    lineHeight: 1.3,
    fontFamily: "'DM Sans', sans-serif",
  },
  // ── Skills styles ───────────────────────────────────────────────────────────
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "28px",
  },
  skillGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "28px",
    border: `1px solid ${C.border}`,
    borderRadius: "4px",
    background: `linear-gradient(135deg, ${C.navy900}80, ${C.navy800}40)`,
  },
  skillCategory: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: C.gold400,
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  skillItems: { display: "flex", flexWrap: "wrap", gap: "8px" },
  skillTag: {
    fontSize: "13px",
    fontWeight: 400,
    padding: "5px 12px",
    borderRadius: "2px",
    background: C.navy700,
    border: `1px solid ${C.border}`,
    color: C.offwhite,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "default",
    transition: "border-color 0.2s, color 0.2s",
  },
  projectList: { display: "flex", flexDirection: "column" },
  projectRow: {
    display: "grid",
    gridTemplateColumns: "56px 220px 1fr 48px",
    gap: "28px",
    alignItems: "center",
    padding: "36px 20px",
    cursor: "pointer",
    transition: "background 0.25s",
    borderRadius: "4px",
    marginLeft: "-20px",
  },
  projectRowHover: { background: C.navy700 },
  projectRowBorder: { borderBottom: `1px solid ${C.border}` },
  projectNum: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    color: C.gold400,
    paddingTop: "6px",
    letterSpacing: "0.1em",
  },
  projectInfo: { display: "flex", flexDirection: "column", gap: "10px" },
  projectTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "0.01em",
    color: C.white,
    transition: "color 0.2s",
  },
  projectTitleHover: { color: C.gold400 },
  projectDesc: {
    fontSize: "14px",
    lineHeight: 1.8,
    color: C.muted,
    margin: 0,
    maxWidth: "580px",
    fontFamily: "'DM Sans', sans-serif",
  },
  projectStack: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "4px",
  },
  stackTag: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: C.gold400,
    padding: "3px 9px",
    border: `1px solid ${C.borderGold}`,
    borderRadius: "2px",
    fontFamily: "'DM Sans', sans-serif",
    background: `${C.gold400}10`,
  },
  projectArrow: {
    fontSize: "22px",
    color: C.muted,
    textDecoration: "none",
    paddingTop: "4px",
    transition: "color 0.2s, transform 0.2s",
    display: "inline-block",
  },
  projectArrowHover: { color: C.gold400, transform: "translate(3px, -3px)" },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "start",
  },
  contactLead: {
    fontSize: "19px",
    fontWeight: 600,
    lineHeight: 1.6,
    color: C.white,
    marginTop: 0,
    marginBottom: "40px",
    fontFamily: "'Cormorant Garamond', Georgia, serif",
  },
  contactLinks: { display: "flex", flexDirection: "column", gap: "24px" },
  contactLink: { display: "flex", flexDirection: "column", gap: "4px" },
  contactLinkLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.gold400,
    fontFamily: "'DM Sans', sans-serif",
  },
  contactLinkVal: {
    fontSize: "14px",
    color: C.offwhite,
    fontWeight: 400,
    fontFamily: "'DM Sans', sans-serif",
  },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: C.gold400,
    fontFamily: "'DM Sans', sans-serif",
  },
  input: {
    background: C.navy900,
    border: `1px solid ${C.border}`,
    borderRadius: "2px",
    padding: "13px 16px",
    fontSize: "14px",
    color: C.offwhite,
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: { resize: "vertical", minHeight: "130px" },
  successMsg: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 40px",
    background: C.navy700,
    border: `1px solid ${C.borderGold}`,
    borderRadius: "4px",
    textAlign: "center",
    gap: "16px",
  },
  successIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: `${C.gold400}20`,
    border: `1px solid ${C.gold400}60`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    color: C.gold400,
    lineHeight: "52px",
    textAlign: "center",
  },
  successText: {
    fontSize: "15px",
    color: C.muted,
    margin: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  footer: {
    padding: "28px 56px",
    borderTop: `1px solid ${C.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: C.navy900,
  },
  footerLogo: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: "16px",
    fontWeight: 700,
    color: C.gold400,
    letterSpacing: "0.15em",
  },
  footerText: {
    fontSize: "12px",
    color: C.muted,
    letterSpacing: "0.05em",
    fontFamily: "'DM Sans', sans-serif",
  },
  projectImage: {
    width: "220px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "12px",
    display: "block",
    border: `1px solid ${C.border}`,
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    padding: "24px",
  },

  modalContent: {
    position: "relative",
    maxWidth: "900px",
    width: "100%",
  },

  modalClose: {
    position: "absolute",
    top: "-14px",
    right: "-14px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    color: "#000",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: 700,
  },

  modalImage: {
    width: "100%",
    maxHeight: "85vh",
    objectFit: "contain",
    borderRadius: "14px",
    display: "block",
  },
};

// ── Global CSS ────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }
  .delay-4 { animation-delay: 0.6s; }

  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }

  .form-input:focus {
    border-color: #d4a853 !important;
    box-shadow: 0 0 0 3px rgba(212,168,83,0.1) !important;
  }

  .submit-btn:hover {
    opacity: 0.88;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(212,168,83,0.35) !important;
  }

  .skill-tag:hover {
    border-color: #d4a85380 !important;
    color: #d4a853 !important;
  }

  .stack-tab:hover {
    color: #e8ecf4 !important;
    background: rgba(212,168,83,0.05) !important;
  }

  .tech-card:hover {
    border-color: #d4a85340 !important;
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 32px rgba(6,13,31,0.5) !important;
  }

  .tech-card:hover img {
    filter: brightness(1.15) !important;
    transform: scale(1.1) !important;
  }

  @media (max-width: 768px) {
    nav { padding: 0 24px !important; }
    nav > div:nth-child(2) { display: none !important; }
    nav > button:last-child { display: flex !important; }
    section { padding: 72px 24px !important; }
    [style*="padding: 120px 56px"] { padding: 100px 24px 72px !important; }
    [style*="grid-template-columns: 220px"] { grid-template-columns: 1fr !important; gap: 32px !important; }
    [style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
    [style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 40px !important; }
    [style*="grid-template-columns: 56px"] { grid-template-columns: 40px 1fr 36px !important; gap: 14px !important; }
    footer { padding: 24px !important; flex-direction: column; gap: 8px; text-align: center; }
    [style*="right: 6%"] { display: none !important; }
    [style*="bottom: 40px"] { left: 24px !important; }
  }
`;
