import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { QuizQuestion } from "@/data/quizData";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  message: string;
  onRestart: () => void;
  questions: QuizQuestion[];
  userAnswers: (number | null)[];
}

export const QuizResults = ({
  score,
  totalQuestions,
  message,
  onRestart,
  questions,
  userAnswers,
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4 space-y-6"
    >
      {/* Score Card */}
      <Card className="relative overflow-hidden shadow-glow border-2">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        
        <div className="relative p-8 md:p-12 text-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-accent rounded-full blur-xl opacity-50" />
              <Trophy className="relative w-20 h-20 md:w-24 md:h-24 text-accent mx-auto" />
            </div>
          </motion.div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Quiz Complete!
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {message}
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 py-6">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gradient-primary">
                {score}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Correct Answers
              </div>
            </div>
            
            <div className="h-16 w-px bg-border" />
            
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-gradient-accent">
                {percentage}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Score
              </div>
            </div>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Restart Quiz
          </Button>
        </div>
      </Card>

      {/* Answer Review */}
      <Card className="p-6 md:p-8 shadow-card border-2">
        <h3 className="text-2xl font-display font-bold mb-6 text-foreground">
          Review Your Answers
        </h3>
        
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? "border-success/30 bg-success/5"
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  )}
                  
                  <div className="flex-1 space-y-2">
                    <p className="font-medium text-sm md:text-base">
                      {index + 1}. {question.question}
                    </p>
                    
                    <div className="text-sm space-y-1">
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-destructive">
                          Your answer: {question.options[userAnswer]}
                        </p>
                      )}
                      <p className="text-success font-medium">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                      {question.explanation && (
                        <p className="text-muted-foreground mt-2">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};
