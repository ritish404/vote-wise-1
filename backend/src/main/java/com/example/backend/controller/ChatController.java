package com.example.backend.controller;

import com.example.backend.service.AnthropicService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final AnthropicService anthropicService;

    public ChatController(AnthropicService anthropicService) {
        this.anthropicService = anthropicService;
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.getOrDefault("message", "");
        if (userMessage.trim().isEmpty()) {
            return Map.of("response", "Please provide a valid question.");
        }

        String aiResponse = anthropicService.getChatResponse(userMessage);
        return Map.of("response", aiResponse);
    }
}
