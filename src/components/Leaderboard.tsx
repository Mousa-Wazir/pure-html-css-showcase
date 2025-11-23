import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";
import { LeaderboardEntry } from "@/lib/leaderboard";
import { format } from "date-fns";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard = ({ entries }: LeaderboardProps) => {
  if (entries.length === 0) {
    return (
      <Card className="p-6 border-2">
        <h3 className="text-xl font-display font-bold mb-4 text-center">
          Top Scores
        </h3>
        <p className="text-center text-muted-foreground">
          No scores yet. Be the first to complete the quiz!
        </p>
      </Card>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-accent" />;
      case 1:
        return <Medal className="w-5 h-5 text-secondary" />;
      case 2:
        return <Award className="w-5 h-5 text-primary" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-muted-foreground font-semibold">{index + 1}</span>;
    }
  };

  return (
    <Card className="p-6 border-2">
      <h3 className="text-xl font-display font-bold mb-4 text-center">
        🏆 Top Scores
      </h3>
      
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              index === 0
                ? "bg-accent/5 border-accent/30"
                : index === 1
                ? "bg-secondary/5 border-secondary/30"
                : index === 2
                ? "bg-primary/5 border-primary/30"
                : "bg-muted/30 border-border"
            }`}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {entry.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(entry.date), "MMM d, yyyy")}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-lg">
                {entry.percentage}%
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.score}/{entry.totalQuestions}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};
