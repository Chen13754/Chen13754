export interface ResearchProject {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  status: string;
  supervisor: string;
  question: string;
  contributions: { label: string; text: string }[];
  topics: string[];
}

export const interests = [
  {
    title: "Embodied intelligence",
    description:
      "Connecting perception, action, and learning to understand intelligence in the physical world.",
    keywords: "Real-to-sim · Reinforcement learning",
  },
  {
    title: "Generative worlds",
    description:
      "Exploring how generative models represent, imagine, and simulate the world around us.",
    keywords: "Diffusion · Multimodal understanding",
  },
  {
    title: "Reasoning & learning",
    description:
      "Understanding the mathematical foundations of learning, LLM reasoning, and self-improvement.",
    keywords: "Probability · LLM reasoning",
  },
];

export const research: ResearchProject[] = [
  {
    id: "real-to-sim",
    title: "From the real world to simulation",
    subtitle: "Agent-Guided Real-to-Sim and World-Model Evaluation · FYP",
    period: "2026 — present",
    status: "Early-stage research",
    supervisor: "Song Guo",
    question:
      "How can feedback-driven coding agents help reconstruct physical robot environments, and how should we evaluate the resulting simulations beyond calibration demonstrations?",
    contributions: [
      {
        label: "Exploring",
        text: "Feedback-driven coding agents for Franka real-to-sim reconstruction, with validation beyond the demonstrations used for calibration.",
      },
      {
        label: "Planned work",
        text: "Develop a MuJoCo / Blender pipeline and compare agent-guided calibration with manual configuration and numerical search.",
      },
      {
        label: "Further planned work",
        text: "Study simulation-derived motion conditioning and supervised adaptation for video world models, evaluated against held-out real-robot recordings.",
      },
    ],
    topics: ["Embodied AI", "Real-to-sim", "World models"],
  },
  {
    id: "multimodal",
    title: "Understanding movement, across modalities",
    subtitle:
      "Multimodal Behavior Monitoring & Personalized Intervention · UROP",
    period: "2025 — 2026",
    status: "Preliminary exploration",
    supervisor: "Xiaomin Ouyang",
    question:
      "Can wearable wrist-motion signals and video-based trajectories be connected to support multimodal behavior analysis in children with autism?",
    contributions: [
      {
        label: "Contribution",
        text: "Helped set up a data collection system combining wearable IMU sensors and camera recordings; collected and organized paired IMU and video data.",
      },
      {
        label: "Proposed approach",
        text: "Match IMU-derived wrist motion with video-based wrist trajectories, using monocular depth estimation from Depth Anything V2 to approximate 3D motion.",
      },
      {
        label: "Preliminary tests",
        text: "Conducted qualitative tests of Depth Anything V2 on project videos to assess the feasibility of depth-aware wrist trajectories.",
      },
    ],
    topics: ["Multimodal learning", "IMU + video", "Depth estimation"],
  },
  {
    id: "random-walks",
    title: "A walk through probability",
    subtitle: "Random Walks and Percolation on Graphs · UROP Guided Reading",
    period: "2023 — 2024",
    status: "Completed reading project",
    supervisor: "Maximilian Alexander Nitzschner",
    question:
      "How does the structure of a graph shape the behavior of random walks and percolation?",
    contributions: [
      {
        label: "Guided reading",
        text: "Studied recurrence and transience, hitting times, stationary distributions, and asymptotic behavior on different graph structures.",
      },
      {
        label: "Written synthesis",
        text: "Produced a structured summary report bringing together key definitions, theoretical results, proof ideas, and examples from the literature.",
      },
    ],
    topics: ["Probability", "Random walks", "Graph theory"],
  },
];

export const education = [
  {
    id: "hkust",
    name: "Hong Kong University of Science and Technology",
    short: "HKUST",
    period: "Sep 2023 — Jun 2027",
    qualification: "B.Sc. in Data Science and Technology",
    note: "Expected graduation · June 2027",
    scores: ["CGA 3.8 / 4.3", "Major GPA 3.97 / 4.3"],
    courses: [
      "Honors Mathematical Analysis · A",
      "Honors Probability · A+",
      "Statistical Inference · A",
      "Bayesian Statistics · A",
      "Statistical Machine Learning · A−",
      "Programming with C++ · A+",
      "Honors Discrete Mathematical Tools for Computer Science · A",
      "Multivariable Calculus · A+",
      "Linear Algebra · A",
      "Exploring Artificial Intelligence · A",
    ],
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    short: "TUM",
    period: "Mar 2026 — Aug 2026",
    qualification: "Official Exchange Program",
    note: "Completed exchange · Munich, Germany",
    scores: [],
    courses: [
      "Causal Inference in Time Series",
      "Deep Generative Models",
      "Introduction to Deep Learning",
      "Applied Regression",
    ],
  },
];

export const honors = [
  {
    title: "Dean’s List",
    detail:
      "School of Science & School of Engineering · Fall and Spring semesters",
    period: "2024 — 2026",
  },
  {
    title: "S.S. Chern Class Scholarship",
    detail: "Department of Mathematics · HKUST",
    period: "2024 — present",
  },
  {
    title: "University Scholarship",
    detail: "Scholarship for Continuing Undergraduate Students · HKUST",
    period: "2025 — present",
  },
];

export const skills = [
  {
    label: "Building",
    text: "Python · C++ · PyTorch · TensorFlow · NumPy · Git · Linux · LaTeX",
  },
  {
    label: "Models",
    text: "CNNs · U-Nets · ResNets · Transformers · VAE · GANs · DDPM · Normalizing flows · Flow matching",
  },
  {
    label: "Foundations",
    text: "Probability · Statistical inference · Bayesian statistics · Regression · Causal inference",
  },
];
