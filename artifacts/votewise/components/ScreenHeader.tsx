import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { language, toggleLanguage } = useLanguage();
  const topInset = Platform.OS === "web" ? Math.max(insets.top, 67) : insets.top;

  const onToggle = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
    toggleLanguage();
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: topInset + 8,
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.titleBlock}>
          <Text
            style={[styles.title, { color: colors.foreground, fontFamily: "Inter_700Bold" }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle language"
          onPress={onToggle}
          style={({ pressed }) => [
            styles.langPill,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          testID="language-toggle"
        >
          <View
            style={[
              styles.langSegment,
              language === "en" && { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.langText,
                {
                  color:
                    language === "en" ? colors.primaryForeground : colors.mutedForeground,
                  fontFamily: "Inter_600SemiBold",
                },
              ]}
            >
              EN
            </Text>
          </View>
          <View
            style={[
              styles.langSegment,
              language === "hi" && { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.langText,
                {
                  color:
                    language === "hi" ? colors.primaryForeground : colors.mutedForeground,
                  fontFamily: "Inter_600SemiBold",
                },
              ]}
            >
              हिं
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  langPill: {
    flexDirection: "row",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 999,
    padding: 3,
  },
  langSegment: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    minWidth: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  langText: {
    fontSize: 13,
  },
});
