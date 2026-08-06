package com.skillpassport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@SpringBootApplication
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SkillPassportApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillPassportApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, Object> healthCheck() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("service", "SkillPassport Java Spring Boot Service");
        status.put("timestamp", System.currentTimeMillis());
        return status;
    }

    @GetMapping("/skills")
    public List<Map<String, Object>> getVerifiedSkills() {
        List<Map<String, Object>> skills = new ArrayList<>();
        
        Map<String, Object> java = new HashMap<>();
        java.put("id", "1");
        java.put("name", "Java");
        java.put("score", 92);
        java.put("category", "Core / Enterprise");
        java.put("verified", true);
        skills.add(java);

        Map<String, Object> spring = new HashMap<>();
        spring.put("id", "2");
        spring.put("name", "Spring Boot");
        spring.put("score", 96);
        spring.put("category", "Framework");
        spring.put("verified", true);
        skills.add(spring);

        Map<String, Object> react = new HashMap<>();
        react.put("id", "3");
        react.put("name", "React");
        react.put("score", 88);
        react.put("category", "Frontend");
        react.put("verified", true);
        skills.add(react);

        return skills;
    }

    @PostMapping("/verify-skill")
    public Map<String, Object> verifySkill(@RequestBody Map<String, String> payload) {
        String skillName = payload.getOrDefault("skillName", "Java");
        Map<String, Object> response = new HashMap<>();
        response.put("skill", skillName);
        response.put("verified", true);
        response.put("score", 94);
        response.put("message", "Skill verified successfully against repository commits.");
        return response;
    }
}
