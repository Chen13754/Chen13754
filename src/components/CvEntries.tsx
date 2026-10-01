import { useState, type ReactNode } from "react";
import { Minus } from "@phosphor-icons/react/dist/csr/Minus";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { education, type ResearchProject } from "../content";
import { Expandable, Reveal } from "./Motion";
export function SectionLabel({
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

export function ResearchEntry({
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

export function EducationEntry({
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
