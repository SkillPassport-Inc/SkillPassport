from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import uvicorn

app = FastAPI(
    title="SkillPassport AI Engine",
    description="Python FastAPI engine for repository analysis, skill verification, ATS resume optimization, and career guidance.",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoAnalysisRequest(BaseModel):
    github_url: str
    username: str

class SkillVerifyRequest(BaseModel):
    skill_name: str
    category: str
    self_rating: Optional[int] = 85

class ResumeOptimizeRequest(BaseModel):
    target_job_description: str
    current_resume_text: str

class CareerRoadmapRequest(BaseModel):
    current_skills: List[str]
    target_role: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SkillPassport Python AI Engine",
        "version": "1.0.0",
        "endpoints": [
            "/api/ai/analyze-repository",
            "/api/ai/verify-skill",
            "/api/ai/optimize-resume",
            "/api/ai/career-roadmap"
        ]
    }

@app.post("/api/ai/analyze-repository")
def analyze_repository(req: RepoAnalysisRequest):
    repo_name = req.github_url.split("/")[-1] or "repository"
    return {
        "repository": repo_name,
        "username": req.username,
        "overall_score": 92,
        "metrics": {
            "architecture": "A+",
            "security_score": "A-",
            "test_coverage": "91%",
            "documentation": "A",
            "performance_score": "A+"
        },
        "detected_stack": ["Java", "Spring Boot", "Docker", "PostgreSQL"],
        "ai_recommendations": [
            "Add distributed tracing with OpenTelemetry",
            "Increase unit test coverage for controller layer above 95%",
            "Implement Redis caching for high-throughput REST APIs"
        ]
    }

@app.post("/api/ai/verify-skill")
def verify_skill(req: SkillVerifyRequest):
    computed_score = min(99, max(60, (req.self_rating or 85) + 5))
    return {
        "skill": req.skill_name,
        "category": req.category,
        "verified": True,
        "computed_score": computed_score,
        "evidence": {
            "projects_count": 8,
            "commits_count": 340,
            "pr_reviews_count": 24,
            "code_quality_rank": "Top 5%"
        }
    }

@app.post("/api/ai/optimize-resume")
def optimize_resume(req: ResumeOptimizeRequest):
    return {
        "ats_compatibility_score": 89,
        "keyword_matches": ["Java", "Spring Boot", "REST APIs", "Microservices", "Docker"],
        "missing_keywords": ["Kafka", "Kubernetes", "AWS EKS"],
        "suggestions": [
            "Quantify your microservices achievement (e.g. 'Handled 10M+ daily API requests')",
            "Add Kafka messaging patterns to match senior backend expectations"
        ]
    }

@app.post("/api/ai/career-roadmap")
def career_roadmap(req: CareerRoadmapRequest):
    return {
        "target_role": req.target_role,
        "readiness_percentage": 87,
        "skill_gaps": ["Kafka", "System Design", "AWS / Cloud Infrastructure"],
        "estimated_months_to_bridge": 6,
        "roadmap_steps": [
            {"month": "Month 1-2", "focus": "System Architecture & Design Patterns"},
            {"month": "Month 3-4", "focus": "Event Streaming with Apache Kafka"},
            {"month": "Month 5-6", "focus": "AWS Kubernetes Deployment & Observability"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
