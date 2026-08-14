import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-init Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiAvailable: !!process.env.GEMINI_API_KEY });
});

// API endpoint to generate visual analogy and interactive explanation for any topic
app.post("/api/explain", async (req, res) => {
  const { topic } = req.body;
  if (!topic || typeof topic !== "string") {
    res.status(400).json({ error: "Topic is required" });
    return;
  }

  const ai = getGenAI();
  if (!ai) {
    res.status(200).json({
      fallback: true,
      message: "Gemini API key not configured. Using intelligent template generator.",
    });
    return;
  }

  try {
    const prompt = `You are RealLearn's lead visual educator. Your goal is to explain complex technical, scientific, or everyday concepts through vivid real-world analogies, step-by-step interactive stories, and simulated mechanics.

Target topic to explain: "${topic}"

Provide a structured response in valid JSON following this schema:
{
  "id": "slug-id",
  "title": "Clean concise title (e.g., 'Queue', 'How Wi-Fi Works', 'Gravity', 'Stack')",
  "tagline": "Let's understand [Title] through a real-world situation.",
  "overviewSummary": "Clear 2-sentence high-level educational explanation of what this topic is and how it works conceptually.",
  "keyPoints": [
    {
      "title": "Core Principle",
      "description": "Essential rule or fundamental takeaway",
      "tag": "Core Rule",
      "icon": "Zap | Clock | ShieldCheck | Layers | Compass | Target | Globe"
    },
    {
      "title": "Underlying Mechanism",
      "description": "How the components or steps interact",
      "tag": "Architecture",
      "icon": "Layers"
    },
    {
      "title": "Key Benefit / Constraint",
      "description": "Efficiency, reliability, or specific behavior",
      "tag": "Performance",
      "icon": "ShieldCheck"
    },
    {
      "title": "Real-World Application",
      "description": "Everyday systems where this principle is applied",
      "tag": "Impact",
      "icon": "Globe"
    }
  ],
  "images": [
    {
      "id": "img_1",
      "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      "title": "Real-Life Metaphor or Object",
      "caption": "Clear caption explaining how this physical object or system embodies the concept.",
      "tag": "Everyday Metaphor"
    },
    {
      "id": "img_2",
      "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      "title": "Industrial or Modern System",
      "caption": "Visual showing where this mechanism is engineered in computing or modern infrastructure.",
      "tag": "Practical Engineering"
    },
    {
      "id": "img_3",
      "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      "title": "Scientific or Theoretical Perspective",
      "caption": "Visual perspective on how this rule preserves state or delivers mathematical guarantees.",
      "tag": "Core Theory"
    }
  ],
  "realWorldExamples": [
    {
      "title": "Everyday Technology Case Study",
      "description": "Detailed 2-sentence explanation of where everyday users interact with this principle.",
      "tag": "Everyday Tech",
      "icon": "Smartphone",
      "systemExample": "Specific real-world system or product name"
    },
    {
      "title": "Large Scale Cloud / Industry Infrastructure",
      "description": "How high-throughput or massive production systems deploy this concept for efficiency.",
      "tag": "Infrastructure",
      "icon": "Server",
      "systemExample": "Specific industrial protocol or cloud architecture"
    },
    {
      "title": "Natural or Human Everyday Behavior",
      "description": "Intuitive physical behavior in daily routines mirroring this exact logic.",
      "tag": "Physical Life",
      "icon": "ShieldCheck",
      "systemExample": "Daily life routine or physical machine"
    },
    {
      "title": "Specialized Professional Tooling",
      "description": "How professionals and engineers utilize this mechanism for reliability.",
      "tag": "Engineering",
      "icon": "Zap",
      "systemExample": "Industry tool or software workflow"
    }
  ],
  "category": "Computer Science | Physics | Everyday Tech | Human Biology | Mathematics",
  "difficulty": "Beginner | Intermediate | Advanced",
  "story": {
    "title": "Real-World Story",
    "description": "Vivid 2-sentence analogy explaining the concept through a relatable everyday object or scenario (like waiting in a ticket line, stacking pancakes, throwing a ball, sending post-office letters).",
    "analogyObject": "Everyday Metaphor Object (e.g. Ticket Counter, Trampoline)",
    "steps": [
      {
        "step": 1,
        "title": "Step title",
        "detail": "What happens in real life vs what it means technically",
        "actor1": "First Person / Element name",
        "actor2": "Second Person / Element name",
        "actor3": "Third Person / Element name",
        "target": "Counter / Destination"
      }
    ]
  },
  "interactiveVisual": {
    "title": "Interactive Visual",
    "subtitle": "Simulate the core operations or mechanism in real-time.",
    "type": "queue | stack | waves | nodes | search | flow | custom",
    "initialElements": ["A", "B", "C"],
    "primaryAction": "Operation 1 (e.g. + ENQUEUE, + PUSH, Send Packet, Add Mass)",
    "secondaryAction": "Operation 2 (e.g. - DEQUEUE, - POP, Receive Packet, Remove Mass)",
    "primaryLabel": "FRONT / TOP / SOURCE",
    "secondaryLabel": "REAR / BOTTOM / DESTINATION",
    "keyTakeaways": [
      "Key rule #1 (e.g. FIFO - First-In, First-Out)",
      "Key rule #2",
      "Why this matters in computing / real world"
    ]
  },
  "videoWalkthrough": [
    {
      "id": 1,
      "title": "1. What is this concept?",
      "caption": "Clear opening definition and foundation.",
      "graphicType": "analogy",
      "illustrationDetails": {
        "heading": "Core Definition",
        "subheading": "Everyday Analogy",
        "items": ["Item 1", "Item 2", "Item 3"],
        "accentColor": "#3b82f6"
      }
    }
  ],
  "quiz": {
    "question": "A quick intuition-check question based on the analogy.",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation why this option is correct based on the real-world story."
  },
  "relatedTopics": ["Related Topic 1", "Related Topic 2", "Related Topic 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an award-winning explainer of technical concepts using intuitive real-world physical analogies. Always return valid parseable JSON.",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Gemini generation error:", error);
    res.status(500).json({ error: error.message || "Failed to generate concept explanation" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RealLearn server running on http://localhost:${PORT}`);
  });
}

startServer();
