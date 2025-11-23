import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";

interface QuizStartProps {
  onStart: () => void;
}

export const QuizStart = ({ onStart }: QuizStartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <Card className="relative overflow-hidden shadow-glow border-2">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        
        <div className="relative p-8 md:p-12 text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50" />
              <Brain className="relative w-20 h-20 md:w-24 md:h-24 text-primary mx-auto" />
            </div>
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient-primary">
              Quiz Challenge
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Test your knowledge of HTML, CSS & JavaScript!
            </p>
          </div>

          <div className="space-y-4 py-6">
            <div className="flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>8 questions</span>
              <span className="text-border">•</span>
              <span>5 minutes</span>
              <span className="text-border">•</span>
              <span>Multiple choice</span>
            </div>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105"
          >
            Start Quiz
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
