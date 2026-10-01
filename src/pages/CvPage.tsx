import { useState } from "react";
import { ArrowDown } from "@phosphor-icons/react/dist/csr/ArrowDown";
import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { Atom } from "@phosphor-icons/react/dist/csr/Atom";
import { Brain } from "@phosphor-icons/react/dist/csr/Brain";
import { Check } from "@phosphor-icons/react/dist/csr/Check";
import { DownloadSimple } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Flower } from "@phosphor-icons/react/dist/csr/Flower";
import { GithubLogo } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { education, honors, interests, research, skills } from "../content";
import { profile } from "../profile";
import { asset } from "../lib/site";
import { Reveal } from "../components/Motion";
import { Portrait } from "../components/Portrait";
import { SiteShell } from "../components/SiteShell";
import {
  EducationEntry,
  ResearchEntry,
  SectionLabel,
} from "../components/CvEntries";
import { useCopyEmail } from "../hooks/useCopyEmail";

export default function CvPage() {
  return (
    <SiteShell page="cv">
      {" "}
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
                <br /> <em>Yuyang.</em>
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
        <div className="hero-bottom" data-pause-offscreen>
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
                I’m Yuyang, an undergraduate in Data Science and Technology at
                the Hong Kong University of Science and Technology. I also
                completed an exchange at the Technical University of Munich in
                2026.
              </p>
              <p>
                I enjoy understanding AI from both mathematical and system
                perspectives — from the elegance of probability to the
                possibilities of generative models and embodied intelligence.
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
                  <span className="interest-keywords">{interest.keywords}</span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <ResearchSection />
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
                <EducationEntry key={item.id} item={item} index={index} />
              ))}
            </div>
            <aside className="honors-panel" aria-labelledby="honors-title">
              <Reveal>
                <div className="honors-label">
                  <Flower size={22} weight="light" />
                  <h3 id="honors-title">Along the way</h3>
                </div>
                <span className="eyebrow honors-eyebrow">AWARDS & HONORS</span>
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
      <ContactSection />
    </SiteShell>
  );
}

function ResearchSection() {
  const [openResearch, setOpenResearch] = useState<string | null>(
    research[0].id,
  );
  return (
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
              setOpenResearch(openResearch === project.id ? null : project.id)
            }
          />
        ))}
      </div>
      <Reveal className="research-footnote">
        <Flower size={17} weight="light" />
        <span>
          Research is a process. These are contributions and explorations, with
          more still taking shape.
        </span>
      </Reveal>
    </section>
  );
}

function ContactSection() {
  const { copied, copyFailed, copyEmail } = useCopyEmail(profile.email);
  return (
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
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={27} weight="light" />
          </a>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
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
                {copied ? <Check size={19} /> : <EnvelopeSimple size={19} />}
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
  );
}
