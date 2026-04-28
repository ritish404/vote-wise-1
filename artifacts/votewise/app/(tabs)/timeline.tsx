import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
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
import { getTimeline } from "@/constants/electionContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColors } from "@/hooks/useColors";

export default function TimelineScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const steps = getTimeline(language);
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id ?? null);

  const tabBarHeight = Platform.OS === "web" ? 84 : 60 + insets.bottom;

  const toggle = (id: string) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t.timeline.heading} subtitle={t.timeline.subheading} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: tabBarHeight + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {steps.map((step, idx) => {
          const isOpen = openId === step.id;
          const isLast = idx === steps.length - 1;
          return (
            <View key={step.id} style={styles.stepRow}>
              <View style={styles.timelineCol}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isOpen ? colors.primary : colors.card,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: isOpen ? colors.primaryForeground : colors.primary,
                      fontFamily: "Inter_700Bold",
                      fontSize: 13,
                    }}
                  >
                    {idx + 1}
                  </Text>
                </View>
                {!isLast ? (
                  <View
                    style={[styles.connector, { backgroundColor: colors.border }]}
                  />
                ) : null}
              </View>
              <Pressable
                onPress={() => toggle(step.id)}
                style={({ pressed }) => [
                  styles.card,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: colors.foreground, fontFamily: "Inter_700Bold" },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <View style={styles.metaRow}>
                      <Feather name="clock" size={12} color={colors.mutedForeground} />
                      <Text
                        style={[
                          styles.metaText,
                          {
                            color: colors.mutedForeground,
                            fontFamily: "Inter_500Medium",
                          },
                        ]}
                      >
                        {step.duration}
                      </Text>
                    </View>
                  </View>
                  <Feather
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={colors.mutedForeground}
                  />
                </View>
                <Text
                  style={[
                    styles.summary,
                    { color: colors.foreground, fontFamily: "Inter_400Regular" },
                  ]}
                >
                  {step.summary}
                </Text>
                {isOpen ? (
                  <View style={styles.detailsBlock}>
                    {step.details.map((detail) => (
                      <View key={detail} style={styles.detailItem}>
                        <View
                          style={[
                            styles.detailBullet,
                            { backgroundColor: colors.primary },
                          ]}
                        />
                        <Text
                          style={[
                            styles.detailText,
                            {
                              color: colors.secondaryForeground,
                              fontFamily: "Inter_400Regular",
                            },
                          ]}
                        >
                          {detail}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  stepRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
  },
  timelineCol: {
    width: 32,
    alignItems: "center",
    paddingTop: 14,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  connector: {
    flex: 1,
    width: 2,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  cardTitle: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  detailsBlock: {
    marginTop: 12,
    gap: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  detailBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },
  detailText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
  },
});
