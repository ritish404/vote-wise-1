import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";

import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/contexts/LanguageContext";

function NativeTabLayout() {
  const { t } = useLanguage();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "bubble.left", selected: "bubble.left.fill" }} />
        <Label>{t.tabs.chat}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="timeline">
        <Icon sf={{ default: "calendar", selected: "calendar" }} />
        <Label>{t.tabs.timeline}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="quiz">
        <Icon
          sf={{ default: "checkmark.circle", selected: "checkmark.circle.fill" }}
        />
        <Label>{t.tabs.quiz}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="learn">
        <Icon sf={{ default: "book", selected: "book.fill" }} />
        <Label>{t.tabs.learn}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.background,
          borderTopWidth: isWeb ? 1 : StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: colors.background },
              ]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.chat,
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="bubble.left" tintColor={color} size={24} />
            ) : (
              <Feather name="message-circle" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="timeline"
        options={{
          title: t.tabs.timeline,
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="calendar" tintColor={color} size={24} />
            ) : (
              <Feather name="calendar" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: t.tabs.quiz,
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="checkmark.circle" tintColor={color} size={24} />
            ) : (
              <Feather name="check-circle" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: t.tabs.learn,
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="book" tintColor={color} size={24} />
            ) : (
              <Feather name="book-open" size={22} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
