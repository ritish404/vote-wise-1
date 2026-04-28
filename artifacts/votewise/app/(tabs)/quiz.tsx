import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { getQuiz, type QuizQuestion } from "@/constants/electionContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuizProgress } from "@/contexts/QuizProgressContext";
import { useColors } from "@/hooks/useColors";

type Stage = "intro" | "playing" | "review" | "done";

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const { bestScore, recordScore } = useQuizProgress();
  const questions = useMemo<QuizQuestion[]>(() => getQuiz(language), [language]);

  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const tabBarHeight = Platform.OS === "web" ? 84 : 60 + insets.bottom;
  const current = questions[index];

  const startQuiz = () => {
    setStage("playing");
    setIndex(0);
    setSelected(null);
    setScore(0);
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    }
  };

  const onSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === current.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => {},
        );
      }
    } else if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {},
      );
    }
    setStage("review");
  };

  const onNext = () => {
    if (index + 1 >= questions.length) {
      const finalScore = score;
      recordScore(finalScore);
      setStage("done");
      if (Platform.OS !== "web") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
          () => {},
        );
      }
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setStage("playing");
  };

  if (stage === "intro") {
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <ScreenHeader title={t.quiz.heading} subtitle={t.quiz.subheading} />
        <View
          style={[
            styles.introContent,
            { paddingBottom: tabBarHeight + 24 },
          ]}
        >
          <View
            style={[
              styles.heroCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.heroIcon,
                { backgroundColor: colors.secondary },
              ]}
            >
              <Feather name="award" size={28} color={colors.primary} />
            </View>
            <Text
              style={[
                styles.heroTitle,
                { color: colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              {questions.length}
            </Text>
            <Text
              style={[
                styles.heroLabel,
                { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
              ]}
            >
              {t.quiz.subheading}
            </Text>
            {bestScore > 0 ? (
              <View style={styles.bestRow}>
                <Feather name="star" size={14} color={colors.accent} />
                <Text
                  style={[
                    styles.bestText,
                    {
                      color: colors.secondaryForeground,
                      fontFamily: "Inter_600SemiBold",
                    },
                  ]}
                >
                  {t.quiz.best(bestScore)}
                </Text>
              </View>
            ) : null}
          </View>
          <Pressable
            onPress={startQuiz}
            style={({ pressed }) => [
              styles.primaryBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.primaryBtnText,
                { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              {t.quiz.start}
            </Text>
            <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
          </Pressable>
        </View>
      </View>
    );
  }

  if (stage === "done") {
    const total = questions.length;
    const message =
      score === total ? t.quiz.perfect : score >= total * 0.6 ? t.quiz.good : t.quiz.learning;
    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <ScreenHeader title={t.quiz.heading} />
        <ScrollView
          contentContainerStyle={[
            styles.doneContent,
            { paddingBottom: tabBarHeight + 24 },
          ]}
        >
          <View
            style={[
              styles.scoreCircle,
              { borderColor: colors.primary, backgroundColor: colors.card },
            ]}
          >
            <Text
              style={[
                styles.scoreNumber,
                { color: colors.primary, fontFamily: "Inter_700Bold" },
              ]}
            >
              {score}
            </Text>
            <Text
              style={[
                styles.scoreOf,
                { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
              ]}
            >
              / {total}
            </Text>
          </View>
          <Text
            style={[
              styles.scoreLine,
              { color: colors.foreground, fontFamily: "Inter_700Bold" },
            ]}
          >
            {t.quiz.score(score, total)}
          </Text>
          <Text
            style={[
              styles.scoreMsg,
              { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
            ]}
          >
            {message}
          </Text>
          {bestScore > 0 ? (
            <View
              style={[
                styles.bestPill,
                { backgroundColor: colors.secondary, borderColor: colors.border },
              ]}
            >
              <Feather name="star" size={14} color={colors.accent} />
              <Text
                style={{
                  color: colors.secondaryForeground,
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 13,
                }}
              >
                {t.quiz.best(bestScore)}
              </Text>
            </View>
          ) : null}
          <Pressable
            onPress={startQuiz}
            style={({ pressed }) => [
              styles.primaryBtn,
              {
                backgroundColor: colors.primary,
                opacity: pressed ? 0.85 : 1,
                marginTop: 24,
                width: "100%",
              },
            ]}
          >
            <Feather name="rotate-ccw" size={18} color={colors.primaryForeground} />
            <Text
              style={[
                styles.primaryBtnText,
                { color: colors.primaryForeground, fontFamily: "Inter_600SemiBold" },
              ]}
            >
              {t.quiz.restart}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // playing or review
  const progressPct = ((index + 1) / questions.length) * 100;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t.quiz.heading} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: tabBarHeight + 24,
        }}
      >
        <View style={styles.progressHeader}>
          <Text
            style={[
              styles.progressLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            {t.quiz.progress(index + 1, questions.length)}
          </Text>
          <Text
            style={[
              styles.progressLabel,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            {score} / {questions.length}
          </Text>
        </View>
        <View
          style={[styles.progressTrack, { backgroundColor: colors.muted }]}
        >
          <View
            style={[
              styles.progressFill,
              { width: `${progressPct}%`, backgroundColor: colors.primary },
            ]}
          />
        </View>
        <Text
          style={[
            styles.questionText,
            { color: colors.foreground, fontFamily: "Inter_700Bold" },
          ]}
        >
          {current.prompt}
        </Text>
        <View style={styles.optionsList}>
          {current.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === current.correctIndex;
            const showCorrect = stage === "review" && isCorrect;
            const showWrong = stage === "review" && isSelected && !isCorrect;

            const borderColor = showCorrect
              ? colors.accent
              : showWrong
                ? colors.destructive
                : isSelected
                  ? colors.primary
                  : colors.border;
            const background = showCorrect
              ? `${colors.accent}15`
              : showWrong
                ? `${colors.destructive}15`
                : colors.card;

            return (
              <Pressable
                key={opt}
                disabled={selected !== null}
                onPress={() => onSelect(i)}
                style={({ pressed }) => [
                  styles.option,
                  {
                    backgroundColor: background,
                    borderColor,
                    borderWidth: showCorrect || showWrong || isSelected ? 2 : StyleSheet.hairlineWidth,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: colors.foreground,
                      fontFamily: "Inter_500Medium",
                    },
                  ]}
                >
                  {opt}
                </Text>
                {showCorrect ? (
                  <Feather name="check-circle" size={20} color={colors.accent} />
                ) : showWrong ? (
                  <Feather name="x-circle" size={20} color={colors.destructive} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
        {stage === "review" ? (
          <View
            style={[
              styles.explainCard,
              {
                backgroundColor:
                  selected === current.correctIndex
                    ? `${colors.accent}12`
                    : `${colors.primary}10`,
                borderColor:
                  selected === current.correctIndex ? colors.accent : colors.primary,
              },
            ]}
          >
            <Text
              style={[
                styles.explainTitle,
                {
                  color:
                    selected === current.correctIndex ? colors.accent : colors.primary,
                  fontFamily: "Inter_700Bold",
                },
              ]}
            >
              {selected === current.correctIndex ? t.quiz.correct : t.quiz.incorrect}
            </Text>
            <Text
              style={[
                styles.explainBody,
                { color: colors.foreground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {current.explanation}
            </Text>
            <Pressable
              onPress={onNext}
              style={({ pressed }) => [
                styles.primaryBtn,
                {
                  backgroundColor: colors.primary,
                  opacity: pressed ? 0.85 : 1,
                  marginTop: 16,
                },
              ]}
            >
              <Text
                style={[
                  styles.primaryBtnText,
                  {
                    color: colors.primaryForeground,
                    fontFamily: "Inter_600SemiBold",
                  },
                ]}
              >
                {index + 1 >= questions.length ? t.quiz.finish : t.quiz.next}
              </Text>
              <Feather
                name={index + 1 >= questions.length ? "flag" : "arrow-right"}
                size={18}
                color={colors.primaryForeground}
              />
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  introContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 16,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 24,
    alignItems: "center",
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 48,
    letterSpacing: -1,
  },
  heroLabel: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
  },
  bestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  bestText: {
    fontSize: 13,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  primaryBtnText: {
    fontSize: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 24,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  questionText: {
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.4,
    marginBottom: 20,
  },
  optionsList: {
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
  },
  explainCard: {
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  explainTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  explainBody: {
    fontSize: 14,
    lineHeight: 20,
  },
  doneContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    alignItems: "center",
  },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  scoreNumber: {
    fontSize: 64,
    letterSpacing: -2,
  },
  scoreOf: {
    fontSize: 22,
    marginLeft: 4,
    marginTop: 12,
  },
  scoreLine: {
    fontSize: 18,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  scoreMsg: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  bestPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
