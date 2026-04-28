import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "votewise.quizBest.v1";

interface QuizProgressValue {
  bestScore: number;
  recordScore: (score: number) => void;
}

const QuizProgressContext = createContext<QuizProgressValue | undefined>(undefined);

export function QuizProgressProvider({ children }: { children: ReactNode }) {
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          const n = parseInt(stored, 10);
          if (!Number.isNaN(n)) setBestScore(n);
        }
      })
      .catch(() => {
        // ignore
      });
  }, []);

  const recordScore = useCallback(
    (score: number) => {
      if (score > bestScore) {
        setBestScore(score);
        AsyncStorage.setItem(STORAGE_KEY, String(score)).catch(() => {
          // ignore
        });
      }
    },
    [bestScore],
  );

  const value = useMemo<QuizProgressValue>(
    () => ({ bestScore, recordScore }),
    [bestScore, recordScore],
  );

  return (
    <QuizProgressContext.Provider value={value}>{children}</QuizProgressContext.Provider>
  );
}

export function useQuizProgress(): QuizProgressValue {
  const ctx = useContext(QuizProgressContext);
  if (!ctx) {
    throw new Error("useQuizProgress must be used inside QuizProgressProvider");
  }
  return ctx;
}
