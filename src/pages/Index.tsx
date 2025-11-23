import { useState, useEffect } from "react";
import { QuizStart } from "@/components/QuizStart";
import { QuizQuestion } from "@/components/QuizQuestion";
import { QuizResults } from "@/components/QuizResults";
import { quizQuestions, getScoreMessage } from "@/data/quizData";
import { useToast } from "@/hooks/use-toast";

type QuizState = "start" | "quiz" | "results";

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    Array(quizQuestions.length).fill(null)
  );
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (quizState !== "quiz") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState]);

  // Warning when time is low
  useEffect(() => {
    if (timeLeft === 60 && quizState === "quiz") {
      toast({
        title: "⏰ One minute remaining!",
        description: "Hurry up and finish the quiz!",
        variant: "destructive",
      });
    }
  }, [timeLeft, quizState]);

  const handleStart = () => {
    setQuizState("quiz");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(Array(quizQuestions.length).fill(null));
    setScore(0);
    setTimeLeft(300);
  };

  const handleSelectAnswer = (answer: number) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedAnswer;
    setUserAnswers(newAnswers);

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(newAnswers[currentQuestion + 1]);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newAnswers);

      // Calculate score
      const finalScore = newAnswers.reduce((acc, answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
          return acc + 1;
        }
        return acc;
      }, 0);

      setScore(finalScore);
    } else {
      // If no answer selected for last question, just calculate with existing answers
      const finalScore = userAnswers.reduce((acc, answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setScore(finalScore);
    }

    setQuizState("results");
  };

  const handleRestart = () => {
    setQuizState("start");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(Array(quizQuestions.length).fill(null));
    setScore(0);
    setTimeLeft(300);
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="container mx-auto">
        {quizState === "start" && <QuizStart onStart={handleStart} />}
        
        {quizState === "quiz" && (
          <QuizQuestion
            question={quizQuestions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={quizQuestions.length}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onSubmit={handleSubmit}
            timeLeft={timeLeft}
          />
        )}
        
        {quizState === "results" && (
          <QuizResults
            score={score}
            totalQuestions={quizQuestions.length}
            message={getScoreMessage(score, quizQuestions.length)}
            onRestart={handleRestart}
            questions={quizQuestions}
            userAnswers={userAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
