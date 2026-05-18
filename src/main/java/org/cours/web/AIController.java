package org.cours.web;

import org.cours.service.VoitureAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ai")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class AIController {

    @Autowired
    private VoitureAIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(
            @RequestBody Map<String, String> request) {
        return ResponseEntity.ok(
                Map.of("response",
                        aiService.chat(request.get("message"))));
    }

    @GetMapping("/description/{id}")
    public ResponseEntity<Map<String, String>> description(
            @PathVariable Long id) {
        return ResponseEntity.ok(
                Map.of("description",
                        aiService.generateDescription(id)));
    }

    @GetMapping("/recommend/{budget}")
    public ResponseEntity<Map<String, String>> recommend(
            @PathVariable int budget) {
        return ResponseEntity.ok(
                Map.of("recommendation",
                        aiService.recommendByBudget(budget)));
    }

    @GetMapping("/analyse-stock")
    public ResponseEntity<Map<String, String>> analyseStock() {
        return ResponseEntity.ok(
                Map.of("analyse", aiService.analyseStock()));
    }
}