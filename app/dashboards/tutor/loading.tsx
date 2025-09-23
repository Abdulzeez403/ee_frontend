import { Brain } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[color:var(--color-ai-tutor-bg)] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[color:var(--color-ai-tutor-accent)] rounded-full mb-4 animate-pulse">
          <Brain className="w-8 h-8 text-[color:var(--color-ai-tutor-accent-foreground)]" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Loading AI Tutor...</h2>
        <p className="text-gray-400">
          Preparing your personalized learning experience
        </p>
      </div>
    </div>
  );
}
