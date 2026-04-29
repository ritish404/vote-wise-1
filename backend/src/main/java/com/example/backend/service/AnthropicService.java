package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class AnthropicService {

    @Value("${anthropic.api.key:YOUR_ANTHROPIC_API_KEY_HERE}")
    private String apiKey;

    private final WebClient webClient;

    public AnthropicService() {
        this.webClient = WebClient.create("https://api.anthropic.com/v1");
    }

    public String getChatResponse(String userMessage) {
        if (apiKey == null || apiKey.trim().isEmpty() || apiKey.equals("YOUR_ANTHROPIC_API_KEY_HERE")) {
            // Provide a mock response so the app works without an API key
            try {
                Thread.sleep(1000); // Simulate network delay
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            
            String lowerMsg = userMessage.toLowerCase();
            if (lowerMsg.contains("hello") || lowerMsg.contains("hi") || lowerMsg.contains("namaste")) {
                return "Namaste! I am your VoteWise AI Assistant (running in Demo Mode). I can answer basic questions about Indian elections. How can I help you today?";
            } else if (lowerMsg.contains("vote") || lowerMsg.contains("age") || lowerMsg.contains("eligib")) {
                return "To vote in India, you must be a citizen of India and at least 18 years old on January 1st of the year the electoral roll is revised. You must also be registered as a voter.";
            } else if (lowerMsg.contains("id") || lowerMsg.contains("document")) {
                return "You need a Voter ID card (EPIC) to vote. If you don't have one, you can use other approved IDs like an Aadhaar Card, PAN Card, Driving License, or Passport.";
            } else {
                return "That's a great question! (I am currently in Demo Mode. To unlock my full AI capabilities and get a detailed answer, please add an Anthropic API Key in the backend configuration).";
            }
        }

        String systemPrompt = "You are the VoteWise Election Assistant, a neutral, factual AI designed to educate Indian citizens about their electoral process, the Constitution, and democratic rights. Keep your answers concise, neutral, and easy to understand. Do not show political bias. Respond in the same language the user asks in (Hindi or English).";

        Map<String, Object> requestBody = Map.of(
            "model", "claude-3-haiku-20240307",
            "max_tokens", 1024,
            "system", systemPrompt,
            "messages", List.of(
                Map.of("role", "user", "content", userMessage)
            )
        );

        try {
            Map response = webClient.post()
                    .uri("/messages")
                    .header("x-api-key", apiKey)
                    .header("anthropic-version", "2023-06-01")
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("content")) {
                List<Map<String, Object>> contentList = (List<Map<String, Object>>) response.get("content");
                if (!contentList.isEmpty()) {
                    return (String) contentList.get(0).get("text");
                }
            }
            return "I'm sorry, I couldn't generate a response at this time.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error connecting to the AI service: " + e.getMessage();
        }
    }
}
