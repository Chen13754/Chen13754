import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Brain,
  Check,
  DownloadSimple,
  EnvelopeSimple,
  Flower,
  GithubLogo,
  Leaf,
  List,
  Minus,
  Plus,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import {
  education,
  honors,
  interests,
  profile,
  research,
  skills,
  type ResearchProject,
} from "./content";

const MotionEnabled = createContext(true);
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const navigation = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const enabled = useContext(MotionEnabled);
  return (
    <motion.div
      className={className}
      initial={enabled ? { opacity: 0, y: 24 } : false}
      animate={!enabled ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: enabled ? 0.65 : 0,
        delay: enabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-rule" />
      <span>{children}</span>
    </div>
  );
}

function Expandable({
  id,
  open,
  children,
}: {
  id: string;
  open: boolean;
  children: ReactNode;
}) {
  const enabled = useContext(MotionEnabled);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          className="expandable"
          initial={enabled ? { height: 0, opacity: 0 } : false}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: enabled ? 0.35 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AmbientGarden() {
  const enabled = useContext(MotionEnabled);
  if (!enabled) return null;
  return (
    <div className="ambient-garden" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <span
          className={`drifting-element drifting-element-${i % 3}`}
          key={i}
          style={{
            left: `${8 + i * 10}%`,
            animationDuration: `${28 + i * 3}s`,
            animationDelay: `${-i * 6}s`,
          }}
        >
          {i % 3 === 0 ? (
            <Leaf weight="duotone" />
          ) : i % 3 === 1 ? (
            <Sparkle weight="fill" />
          ) : (
            <Flower weight="duotone" />
          )}
        </span>
      ))}
    </div>
  );
}

function Portrait() {
  const enabled = useContext(MotionEnabled);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 65, damping: 20 });
  const springY = useSpring(y, { stiffness: 65, damping: 20 });
  const canParallax = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 900px) and (pointer: fine)");
    const update = () => {
      canParallax.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
    }
  }, [enabled, x, y]);
  return (
    <motion.div
      className="portrait-composition"
      initial={enabled ? { opacity: 0, y: 28, rotate: 2 } : false}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: enabled ? 1 : 0, delay: enabled ? 0.2 : 0 }}
      onPointerMove={(event) => {
        if (!enabled || !canParallax.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.025);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.025);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="portrait-backdrop" aria-hidden="true" />
      <div className="portrait-orbit" aria-hidden="true" />
      <motion.div
        className="portrait-parallax"
        style={enabled ? { x: springX, y: springY } : undefined}
      >
        <div className="portrait-frame">
          <img
            src={asset(profile.avatar)}
            alt="Yuyang’s pastel pink and lavender anime avatar"
            width="460"
            height="460"
            fetchPriority="high"
          />
        </div>
      </motion.div>
      <img
        className="hero-blossoms"
        src={asset("images/blossoms.webp")}
        alt=""
        width="1536"
        height="1024"
        aria-hidden="true"
      />
      <div className="curiosity-sticker">
        <Sparkle weight="light" size={22} />
        <span>
          always a<br />
          <em>little curious</em>
        </span>
      </div>
      <span className="portrait-caption">
        a little imagination goes a long way
      </span>
      <div className="portrait-sparkle portrait-sparkle-one" aria-hidden="true">
        <Sparkle weight="light" />
      </div>
      <div className="portrait-sparkle portrait-sparkle-two" aria-hidden="true">
        <Sparkle weight="light" />
      </div>
      <span className="portrait-coordinate" aria-hidden="true">
        THEORY × IMAGINATION
      </span>
    </motion.div>
  );
}

function ResearchEntry({
  project,
  index,
  open,
  onToggle,
}: {
  project: ResearchProject;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal
      delay={index * 0.05}
      className={`research-entry ${open ? "is-open" : ""}`}
    >
      <button
        className="research-trigger"
        aria-expanded={open}
        aria-controls={`research-${project.id}`}
        onClick={onToggle}
      >
        <span className="research-number">0{index + 1}</span>
        <span className="research-heading">
          <span className="project-period">{project.period}</span>
          <span className="project-title">{project.title}</span>
          <span className="project-subtitle">{project.subtitle}</span>
          <span className="project-status">
            <span className="status-dot" />
            {project.status}
          </span>
        </span>
        <span className="expand-icon" aria-hidden="true">
          {open ? <Minus size={21} /> : <Plus size={21} />}
        </span>
      </button>
      <Expandable id={`research-${project.id}`} open={open}>
        <div className="research-detail">
          <div className="research-question">
            <span className="eyebrow">THE QUESTION</span>
            <p>{project.question}</p>
            <span className="supervisor">
              Supervisor · {project.supervisor}
            </span>
          </div>
          <div className="research-contributions">
            {project.contributions.map((item) => (
              <div key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
            ))}
            <div className="topic-tags">
              {project.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </Expandable>
    </Reveal>
  );
}

function EducationEntry({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal className="education-entry" delay={index * 0.1}>
      <div className="timeline-marker" aria-hidden="true" />
      <div className="education-meta">
        <span className="eyebrow">{item.short}</span>
        <span>{item.period}</span>
      </div>
      <h3>{item.name}</h3>
      <p className="qualification">{item.qualification}</p>
      <p className="education-note">{item.note}</p>
      {item.scores.length > 0 && (
        <div className="scores">
          {item.scores.map((score) => (
            <span key={score}>{score}</span>
          ))}
        </div>
      )}
      <button
        className="course-toggle"
        aria-expanded={open}
        aria-controls={`courses-${item.id}`}
        onClick={() => setOpen(!open)}
      >
        Selected coursework {open ? <Minus size={14} /> : <Plus size={14} />}
      </button>
      <Expandable id={`courses-${item.id}`} open={open}>
        <ul className="course-list">
          {item.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </Expandable>
    </Reveal>
  );
}

function HomeIntro() {
  return (
    <section
      id="home"
      className="landing page-width"
      aria-labelledby="landing-title"
    >
      <div className="landing-copy">
        <Reveal>
          <div className="hero-eyebrow">
            <Flower size={17} weight="duotone" />
            <span>A LITTLE CORNER OF THE INTERNET</span>
          </div>
        </Reveal>
        <Reveal delay={0.07}>
          <h1 id="landing-title">
            Hi, I’m
            <br /> <em>Yuyang.</em>
            <Sparkle
              className="landing-star"
              weight="light"
              aria-hidden="true"
            />
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="landing-identity">{profile.identity}</p>
          <p className="landing-bio">{profile.introduction}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="landing-links">
            <a href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={19} />
              Email
              <ArrowUpRight size={14} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <GithubLogo size={19} />
              GitHub
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
      <div className="landing-portrait">
        <Portrait />
      </div>
    </section>
  );
}

export default function App({ page = "cv" }: { page?: "home" | "cv" }) {
  const isHome = page === "home";
  const systemReduced = useReducedMotion();
  const [motionRequested, setMotionRequested] = useState(() => {
    try {
      return localStorage.getItem("garden-motion") !== "off";
    } catch {
      return true;
    }
  });
  const enabled = motionRequested && !systemReduced;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [openResearch, setOpenResearch] = useState<string | null>(
    research[0].id,
  );
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    try {
      localStorage.setItem("garden-motion", motionRequested ? "on" : "off");
    } catch {
      /* Optional browser persistence. */
    }
  }, [enabled, motionRequested]);

  useEffect(() => {
    const update = () => {
      document.documentElement.dataset.visibility = document.hidden
        ? "hidden"
        : "visible";
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActiveSection(entry.target.id === "home" ? "" : entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const query = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (query.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    query.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      query.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen]);

  useEffect(
    () => () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyFailed(false);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <MotionEnabled.Provider value={enabled}>
      <MotionConfig reducedMotion={enabled ? "never" : "always"}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AmbientGarden />
        <header className={`site-header${isHome ? " landing-header" : ""}`}>
          <div className="header-inner">
            <a
              className="brand"
              href={asset("")}
              aria-label="Yuyang, back to home"
              onClick={() => setMenuOpen(false)}
            >
              <Flower size={29} weight="light" />
              <span>
                yuyang<span className="brand-dot">.</span>
              </span>
            </a>
            <nav
              className={isHome ? "landing-nav" : "desktop-nav"}
              aria-label="Main navigation"
            >
              {isHome ? (
                <a href={asset("cv/")}>
                  CV <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ) : (
                navigation.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={
                      activeSection === link.id ? "location" : undefined
                    }
                  >
                    {link.label}
                  </a>
                ))
              )}
            </nav>
            <div className="header-actions">
              <button
                className="motion-toggle"
                aria-label={
                  systemReduced
                    ? "Animation disabled by your system’s reduced motion preference"
                    : "Enable animations"
                }
                aria-pressed={enabled}
                disabled={!!systemReduced}
                title={
                  systemReduced
                    ? "Your system requests reduced motion"
                    : "Toggle decorative animations"
                }
                onClick={() => setMotionRequested(!motionRequested)}
              >
                <Sparkle size={16} weight={enabled ? "duotone" : "regular"} />
                <span>
                  {systemReduced
                    ? "Reduced motion"
                    : `Motion ${enabled ? "on" : "off"}`}
                </span>
                <span className="toggle-track" aria-hidden="true">
                  <span />
                </span>
              </button>
              {!isHome && (
                <button
                  className="menu-toggle"
                  ref={menuButton}
                  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={23} /> : <List size={23} />}
                </button>
              )}
            </div>
          </div>
          <AnimatePresence>
            {!isHome && menuOpen && (
              <motion.nav
                id="mobile-navigation"
                className="mobile-nav"
                aria-label="Mobile navigation"
                initial={enabled ? { opacity: 0, height: 0 } : false}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: enabled ? 0.2 : 0 }}
              >
                {navigation.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={
                      activeSection === link.id ? "location" : undefined
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowUpRight size={18} />
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main id="main" className={isHome ? "landing-main" : undefined}>
          {isHome ? (
            <HomeIntro />
          ) : (
            <>
              <section
                id="home"
                className="hero page-width"
                aria-labelledby="hero-title"
              >
                <div className="hero-grid">
                  <div className="hero-copy">
                    <Reveal>
                      <div className="hero-eyebrow">
                        <Flower size={17} weight="duotone" />
                        <span>A PERSONAL RESEARCH GARDEN</span>
                      </div>
                    </Reveal>
                    <Reveal delay={0.07}>
                      <h1 id="hero-title">
                        Hi, I’m
                        <br />
                        <em>Yuyang.</em>
                        <span className="heading-star" aria-hidden="true">
                          <Sparkle weight="light" />
                        </span>
                      </h1>
                    </Reveal>
                    <Reveal delay={0.15}>
                      <p className="hero-subtitle">
                        A curious mind, between
                        <br />
                        theory &amp; possibility.
                      </p>
                    </Reveal>
                    <Reveal delay={0.22}>
                      <p className="hero-description">
                        Data Science &amp; Technology at HKUST.
                        <br />
                        Exploring intelligent worlds, one question at a time.
                      </p>
                      <div className="hero-buttons">
                        <a className="button button-primary" href="#research">
                          Explore my research <ArrowUpRight size={19} />
                        </a>
                        <a
                          className="button button-text"
                          href={asset(profile.cv)}
                          download="Yuyang-Chen-CV.pdf"
                        >
                          Download CV <DownloadSimple size={18} />
                        </a>
                      </div>
                    </Reveal>
                  </div>
                  <Portrait />
                </div>
                <div className="hero-bottom">
                  <span>BASED IN HONG KONG</span>
                  <a href="#about">
                    A little more about me <ArrowDown size={15} />
                  </a>
                  <span className="hero-bottom-note">LET CURIOSITY BLOOM.</span>
                </div>
              </section>

              <section
                id="about"
                className="about-section section-pad"
                aria-labelledby="about-title"
              >
                <div className="page-width">
                  <Reveal>
                    <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
                  </Reveal>
                  <div className="about-intro">
                    <Reveal>
                      <h2 id="about-title">
                        Rooted in mathematics.
                        <br />
                        <em>
                          Growing toward
                          <br className="desktop-break" /> intelligent worlds.
                        </em>
                      </h2>
                    </Reveal>
                    <Reveal className="about-prose" delay={0.1}>
                      <p>
                        I’m Yuyang, an undergraduate in Data Science and
                        Technology at the Hong Kong University of Science and
                        Technology. I also completed an exchange at the
                        Technical University of Munich in 2026.
                      </p>
                      <p>
                        I enjoy understanding AI from both mathematical and
                        system perspectives — from the elegance of probability
                        to the possibilities of generative models and embodied
                        intelligence.
                      </p>
                      <span className="handwritten-note">
                        A little rigor. A little wonder.
                      </span>
                    </Reveal>
                  </div>
                  <div className="interest-grid">
                    {interests.map((interest, i) => {
                      const Icon = [Atom, Sparkle, Brain][i];
                      return (
                        <Reveal
                          className="interest-item"
                          key={interest.title}
                          delay={i * 0.08}
                        >
                          <div className="interest-top">
                            <Icon size={32} weight="light" />
                            <span>0{i + 1}</span>
                          </div>
                          <h3>{interest.title}</h3>
                          <p>{interest.description}</p>
                          <span className="interest-keywords">
                            {interest.keywords}
                          </span>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </section>

              <section
                id="research"
                className="research-section section-pad page-width"
                aria-labelledby="research-title"
              >
                <Reveal>
                  <SectionLabel number="02">SELECTED RESEARCH</SectionLabel>
                </Reveal>
                <Reveal className="section-heading-row">
                  <h2 id="research-title">
                    Questions I’m
                    <br />
                    <em>growing with.</em>
                  </h2>
                  <p>
                    From theoretical foundations to physical worlds.
                    <br />A few chapters of an ongoing exploration.
                  </p>
                </Reveal>
                <div className="research-list">
                  {research.map((project, index) => (
                    <ResearchEntry
                      key={project.id}
                      project={project}
                      index={index}
                      open={openResearch === project.id}
                      onToggle={() =>
                        setOpenResearch(
                          openResearch === project.id ? null : project.id,
                        )
                      }
                    />
                  ))}
                </div>
                <Reveal className="research-footnote">
                  <Flower size={17} weight="light" />
                  <span>
                    Research is a process. These are contributions and
                    explorations, with more still taking shape.
                  </span>
                </Reveal>
              </section>

              <section
                id="journey"
                className="journey-section section-pad"
                aria-labelledby="journey-title"
              >
                <div className="page-width">
                  <Reveal>
                    <SectionLabel number="03">LEARNING & GROWING</SectionLabel>
                  </Reveal>
                  <Reveal className="section-heading-row">
                    <h2 id="journey-title">
                      A path of
                      <br />
                      <em>small discoveries.</em>
                    </h2>
                    <p>
                      The places, people, and ideas
                      <br />
                      that shape how I think.
                    </p>
                  </Reveal>
                  <div className="journey-grid">
                    <div className="education-timeline">
                      {education.map((item, index) => (
                        <EducationEntry
                          key={item.id}
                          item={item}
                          index={index}
                        />
                      ))}
                    </div>
                    <aside
                      className="honors-panel"
                      aria-labelledby="honors-title"
                    >
                      <Reveal>
                        <div className="honors-label">
                          <Flower size={22} weight="light" />
                          <h3 id="honors-title">Along the way</h3>
                        </div>
                        <span className="eyebrow honors-eyebrow">
                          AWARDS & HONORS
                        </span>
                        {honors.map((honor) => (
                          <div className="honor" key={honor.title}>
                            <span className="honor-period">{honor.period}</span>
                            <h4>{honor.title}</h4>
                            <p>{honor.detail}</p>
                          </div>
                        ))}
                      </Reveal>
                    </aside>
                  </div>
                  <Reveal className="skills-block">
                    <div className="skills-heading">
                      <span className="eyebrow">MY TOOLKIT</span>
                      <p>Ideas, meet practice.</p>
                    </div>
                    <dl>
                      {skills.map((skill) => (
                        <div key={skill.label}>
                          <dt>{skill.label}</dt>
                          <dd>{skill.text}</dd>
                        </div>
                      ))}
                    </dl>
                  </Reveal>
                </div>
              </section>

              <section
                id="contact"
                className="contact-section page-width"
                aria-labelledby="contact-title"
              >
                <Reveal>
                  <SectionLabel number="04">LET’S CONNECT</SectionLabel>
                </Reveal>
                <div className="contact-grid">
                  <Reveal>
                    <h2 id="contact-title">
                      Good things begin
                      <br />
                      <em>with a hello.</em>
                    </h2>
                    <p>
                      Have a question, a research idea, or a shared curiosity?
                      <br />
                      I’d love to hear from you.
                    </p>
                    <a
                      className="contact-email"
                      href={`mailto:${profile.email}`}
                    >
                      {profile.email}
                      <ArrowUpRight size={27} weight="light" />
                    </a>
                    <div className="contact-links">
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubLogo size={19} />
                        GitHub
                        <ArrowUpRight size={13} />
                      </a>
                      <a href={asset(profile.cv)} download="Yuyang-Chen-CV.pdf">
                        <DownloadSimple size={19} />
                        Download CV
                      </a>
                      <button onClick={copyEmail}>
                        <span aria-hidden="true">
                          {copied ? (
                            <Check size={19} />
                          ) : (
                            <EnvelopeSimple size={19} />
                          )}
                        </span>
                        {copied ? "Email copied" : "Copy email"}
                      </button>
                    </div>
                    <p className="copy-status" role="status">
                      {copyFailed
                        ? `Copy unavailable. You can select the address above: ${profile.email}`
                        : copied
                          ? "Email address copied to your clipboard."
                          : ""}
                    </p>
                  </Reveal>
                  <Reveal className="contact-illustration">
                    <img
                      src={asset("images/blossoms.webp")}
                      alt=""
                      width="1536"
                      height="1024"
                      loading="lazy"
                    />
                    <span>
                      keep growing,
                      <br />
                      <em>keep wondering.</em>
                    </span>
                  </Reveal>
                </div>
              </section>
            </>
          )}
        </main>

        <footer
          className={`site-footer page-width${isHome ? " landing-footer" : ""}`}
        >
          <a className="footer-brand" href="#home">
            yuyang.
          </a>
          <p>{profile.motto}</p>
          {!isHome && (
            <a href="#home">
              Back to top <ArrowRight className="back-to-top-icon" size={15} />
            </a>
          )}
          <span className="footer-copyright">
            © {new Date().getFullYear()} Yuyang Chen
          </span>
        </footer>
      </MotionConfig>
    </MotionEnabled.Provider>
  );
}
