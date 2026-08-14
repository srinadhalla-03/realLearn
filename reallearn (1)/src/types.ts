export type TabType = 'home' | 'explore' | 'lessons' | 'bookmarks' | 'profile';

export type SimulationType = 'queue' | 'stack' | 'wifi' | 'gravity' | 'binary_search' | 'dns' | 'custom';

export interface ConceptStep {
  step: number;
  title: string;
  detail: string;
  actor1?: string;
  actor2?: string;
  actor3?: string;
  target?: string;
  visualIcon?: string;
}

export interface ConceptStory {
  title: string;
  description: string;
  analogyObject: string; // e.g. "Ticket Counter", "Pancake Stack", "Radio Tower"
  steps?: ConceptStep[];
}

export interface ConceptKeyPoint {
  title: string;
  description: string;
  icon?: string;
  tag?: string;
}

export interface VideoWalkthroughFrame {
  id: number;
  title: string;
  caption: string;
  durationMs?: number;
  graphicType: 'diagram' | 'analogy' | 'animation';
  illustrationDetails: {
    heading: string;
    subheading: string;
    items: string[];
    accentColor: string;
  };
}

export interface ConceptImage {
  id: string;
  url: string;
  title: string;
  caption: string;
  tag?: string;
}

export interface RealWorldExample {
  title: string;
  description: string;
  tag?: string;
  icon?: string;
  systemExample?: string;
}

export interface ConceptInteractive {
  title: string;
  subtitle: string;
  type: SimulationType;
  initialElements?: string[];
  primaryAction?: string;
  secondaryAction?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  keyTakeaways: string[];
  realWorldApplications?: { title: string; desc: string; icon: string }[];
}

export interface ConceptQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  tagline: string;
  overviewSummary?: string;
  keyPoints?: ConceptKeyPoint[];
  images?: ConceptImage[];
  realWorldExamples?: RealWorldExample[];
  category: 'Computer Science' | 'Physics' | 'Everyday Tech' | 'Human Biology' | 'Mathematics' | 'General';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  story: ConceptStory;
  interactiveVisual: ConceptInteractive;
  videoWalkthrough?: VideoWalkthroughFrame[];
  quiz?: ConceptQuiz;
  relatedTopics: string[];
  isCustomGenerated?: boolean;
}

export interface UserStats {
  conceptsCompleted: string[];
  bookmarkedIds: string[];
  streakDays: number;
  totalSimulationsRun: number;
  quizzesPassed: number;
}

