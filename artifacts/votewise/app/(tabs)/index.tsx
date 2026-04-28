import { Feather } from "@expo/vector-icons";
import { useSendChatMessage, type ChatMessage } from "@workspace/api-client-react";
import * as Haptics from "expo-haptics";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ListRenderItem,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useColors } from "@/hooks/useColors";

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function makeId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const lastSentRef = useRef<UiMessage[] | null>(null);

  const mutation = useSendChatMessage({
    mutation: {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), role: "assistant", content: data.reply },
        ]);
        setErrorMsg(null);
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
            () => {},
          );
        }
      },
      onError: (err) => {
        setErrorMsg(err instanceof Error ? err.message : t.chat.errorTitle);
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
            () => {},
          );
        }
      },
    },
  });

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || mutation.isPending) return;
      const userMsg: UiMessage = { id: makeId(), role: "user", content: trimmed };
      const next = [...messages, userMsg];
      setMessages(next);
      setInput("");
      setErrorMsg(null);
      lastSentRef.current = next;
      const apiMessages: ChatMessage[] = next.map((m) => ({
        role: m.role,
        content: m.content,
      }));
      mutation.mutate({ data: { messages: apiMessages, language } });
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }
    },
    [messages, mutation, language, t.chat.errorTitle],
  );

  const onClear = useCallback(() => {
    setMessages([]);
    setErrorMsg(null);
    lastSentRef.current = null;
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
  }, []);

  // Inverted FlatList — reverse data
  const inverted = useMemo(() => [...messages].reverse(), [messages]);

  const renderItem: ListRenderItem<UiMessage> = ({ item }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.bubbleRow,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser
              ? {
                  backgroundColor: colors.primary,
                  borderBottomRightRadius: 6,
                }
              : {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderBottomLeftRadius: 6,
                },
          ]}
        >
          <Text
            style={[
              styles.bubbleText,
              {
                color: isUser ? colors.primaryForeground : colors.foreground,
                fontFamily: "Inter_400Regular",
              },
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  const tabBarHeight = Platform.OS === "web" ? 84 : 60 + insets.bottom;
  const headerComponent =
    mutation.isPending ? (
      <View style={[styles.bubbleRow, { justifyContent: "flex-start" }]}>
        <View
          style={[
            styles.bubble,
            styles.thinkingBubble,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <ActivityIndicator size="small" color={colors.mutedForeground} />
          <Text
            style={[
              styles.thinkingText,
              { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
            ]}
          >
            {t.chat.thinking}
          </Text>
        </View>
      </View>
    ) : errorMsg ? (
      <View style={[styles.bubbleRow, { justifyContent: "flex-start" }]}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: colors.card,
              borderColor: colors.destructive,
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={{
              color: colors.destructive,
              fontFamily: "Inter_600SemiBold",
              marginBottom: 4,
            }}
          >
            {t.chat.errorTitle}
          </Text>
          <Text style={{ color: colors.mutedForeground, fontFamily: "Inter_400Regular" }}>
            {t.chat.errorRetry}
          </Text>
        </View>
      </View>
    ) : null;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenHeader title={t.chat.heading} subtitle={t.chat.subheading} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        {messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={[
              styles.emptyContainer,
              { paddingBottom: tabBarHeight + 100 },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[
                styles.neutralBadge,
                { backgroundColor: colors.secondary, borderColor: colors.border },
              ]}
            >
              <Feather name="shield" size={14} color={colors.accent} />
              <Text
                style={[
                  styles.neutralBadgeText,
                  { color: colors.secondaryForeground, fontFamily: "Inter_500Medium" },
                ]}
              >
                {t.chat.neutralBadge}
              </Text>
            </View>
            <Text
              style={[
                styles.emptyTitle,
                { color: colors.foreground, fontFamily: "Inter_700Bold" },
              ]}
            >
              {t.chat.heading}
            </Text>
            <Text
              style={[
                styles.emptySubtitle,
                { color: colors.mutedForeground, fontFamily: "Inter_400Regular" },
              ]}
            >
              {t.chat.subheading}
            </Text>
            <View style={styles.suggestionsWrap}>
              {t.chat.suggestions.map((s) => (
                <Pressable
                  key={s}
                  onPress={() => send(s)}
                  style={({ pressed }) => [
                    styles.suggestion,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <Feather
                    name="message-circle"
                    size={16}
                    color={colors.primary}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.suggestionText,
                      { color: colors.foreground, fontFamily: "Inter_500Medium" },
                    ]}
                  >
                    {s}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={inverted}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            inverted
            ListHeaderComponent={headerComponent}
            contentContainerStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            scrollEnabled={!!inverted.length}
          />
        )}

        <View
          style={[
            styles.composer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              paddingBottom: tabBarHeight + 8,
            },
          ]}
        >
          {messages.length > 0 ? (
            <Pressable
              onPress={onClear}
              style={({ pressed }) => [
                styles.clearBtn,
                { opacity: pressed ? 0.6 : 1 },
              ]}
              accessibilityLabel={t.chat.clear}
            >
              <Feather name="rotate-ccw" size={16} color={colors.mutedForeground} />
              <Text
                style={[
                  styles.clearText,
                  { color: colors.mutedForeground, fontFamily: "Inter_500Medium" },
                ]}
              >
                {t.chat.clear}
              </Text>
            </Pressable>
          ) : null}
          <View
            style={[
              styles.inputRow,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { color: colors.foreground, fontFamily: "Inter_400Regular" },
              ]}
              value={input}
              onChangeText={setInput}
              placeholder={t.chat.placeholder}
              placeholderTextColor={colors.mutedForeground}
              multiline
              maxLength={1000}
              editable={!mutation.isPending}
              onSubmitEditing={() => send(input)}
              returnKeyType="send"
              blurOnSubmit
            />
            <Pressable
              onPress={() => send(input)}
              disabled={!input.trim() || mutation.isPending}
              accessibilityLabel={t.chat.send}
              style={({ pressed }) => [
                styles.sendBtn,
                {
                  backgroundColor:
                    !input.trim() || mutation.isPending
                      ? colors.muted
                      : colors.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              {mutation.isPending ? (
                <ActivityIndicator size="small" color={colors.primaryForeground} />
              ) : (
                <Feather
                  name="arrow-up"
                  size={18}
                  color={
                    !input.trim()
                      ? colors.mutedForeground
                      : colors.primaryForeground
                  }
                />
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bubbleRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  bubble: {
    maxWidth: "84%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 21,
  },
  thinkingBubble: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  thinkingText: {
    fontSize: 14,
  },
  emptyContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: "flex-start",
  },
  neutralBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 16,
  },
  neutralBadgeText: {
    fontSize: 12,
  },
  emptyTitle: {
    fontSize: 24,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 22,
  },
  suggestionsWrap: {
    gap: 10,
    width: "100%",
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
  suggestionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
  },
  composer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  clearBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingVertical: 6,
  },
  clearText: {
    fontSize: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 6,
    paddingLeft: 14,
    gap: 6,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    minHeight: 32,
    maxHeight: 120,
    paddingTop: Platform.OS === "ios" ? 8 : 4,
    paddingBottom: 8,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
