import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { getLearnCards } from "@/constants/electionContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColors } from "@/hooks/useColors";

export default function LearnScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const cards = getLearnCards(language);

  const tabBarHeight = Platform.OS === "web" ? 84 : 60 + insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t.learn.heading} subtitle={t.learn.subheading} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: tabBarHeight + 32,
          gap: 14,
        }}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.cardTop}>
              <View
                style={[
                  styles.iconBadge,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <Feather name="book-open" size={16} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: colors.foreground, fontFamily: "Inter_700Bold" },
                  ]}
                >
                  {card.title}
                </Text>
                {card.abbreviation ? (
                  <Text
                    style={[
                      styles.abbr,
                      { color: colors.primary, fontFamily: "Inter_600SemiBold" },
                    ]}
                  >
                    {card.abbreviation}
                  </Text>
                ) : null}
              </View>
            </View>
            <Text
              style={[
                styles.body,
                { color: colors.foreground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {card.body}
            </Text>
            <View style={styles.bullets}>
              {card.bullets.map((b) => (
                <View key={b} style={styles.bulletRow}>
                  <View
                    style={[
                      styles.bulletDot,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                  <Text
                    style={[
                      styles.bulletText,
                      {
                        color: colors.secondaryForeground,
                        fontFamily: "Inter_400Regular",
                      },
                    ]}
                  >
                    {b}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 17,
    letterSpacing: -0.3,
  },
  abbr: {
    fontSize: 12,
    letterSpacing: 0.4,
    marginTop: 2,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  bullets: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 19,
  },
});
