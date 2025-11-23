export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
}

const LEADERBOARD_KEY = "quiz_leaderboard";

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading leaderboard:", error);
    return [];
  }
};

export const addLeaderboardEntry = (
  name: string,
  score: number,
  totalQuestions: number
): LeaderboardEntry[] => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const newEntry: LeaderboardEntry = {
    id: Date.now().toString(),
    name: name.trim(),
    score,
    totalQuestions,
    percentage,
    date: new Date().toISOString(),
  };

  const leaderboard = getLeaderboard();
  leaderboard.push(newEntry);

  // Sort by percentage (descending), then by score (descending)
  leaderboard.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    return b.score - a.score;
  });

  // Keep only top 10
  const top10 = leaderboard.slice(0, 10);

  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));
  } catch (error) {
    console.error("Error saving to leaderboard:", error);
  }

  return top10;
};

export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error("Error clearing leaderboard:", error);
  }
};

export const isTopScore = (score: number, totalQuestions: number): boolean => {
  const leaderboard = getLeaderboard();
  
  if (leaderboard.length < 10) {
    return true;
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const lowestEntry = leaderboard[leaderboard.length - 1];
  
  return percentage > lowestEntry.percentage || 
         (percentage === lowestEntry.percentage && score > lowestEntry.score);
};
