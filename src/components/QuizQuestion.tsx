import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion as QuizQuestionType } from "@/data/quizData";
import { Clock, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentQuestion: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  onNext: () => void;
  onSubmit: () => void;
  timeLeft: number;
}

export const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onSubmit,
  timeLeft,
}: QuizQuestionProps) => {
  const [direction, setDirection] = useState(1);
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    setDirection(1);
    onNext();
  };

  const handleSubmit = () => {
    setDirection(1);
    onSubmit();
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-bold text-primary">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="ml-6 flex items-center gap-2 text-sm font-mono font-bold">
          <Clock className={`w-4 h-4 ${timeLeft < 60 ? 'text-destructive' : 'text-secondary'}`} />
          <span className={timeLeft < 60 ? 'text-destructive' : 'text-secondary'}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </motion.div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 md:p-8 shadow-card border-2">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-6 text-foreground">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all ${
                        selectedAnswer === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 text-sm md:text-base">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-end"
      >
        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            size="lg"
            className="bg-gradient-accent hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105"
          >
            Submit Quiz
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105"
          >
            Next Question
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};
