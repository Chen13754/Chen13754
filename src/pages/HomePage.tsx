import { ArrowUpRight } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/csr/EnvelopeSimple";
import { Flower } from "@phosphor-icons/react/dist/csr/Flower";
import { GithubLogo } from "@phosphor-icons/react/dist/csr/GithubLogo";
import { Sparkle } from "@phosphor-icons/react/dist/csr/Sparkle";
import { profile } from "../profile";
import { Reveal } from "../components/Motion";
import { Portrait } from "../components/Portrait";
import { SiteShell } from "../components/SiteShell";
export default function HomePage() {
  return (
    <SiteShell page="home">
      <HomeIntro />
    </SiteShell>
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
