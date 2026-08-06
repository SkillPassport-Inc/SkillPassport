# SkillPassport 🛡️
### AI-Powered Verified Developer Identity Platform

[![CI/CD Build](https://github.com/your-org/skillpassport/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/skillpassport/actions)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **The Verified Identity Platform for Software Engineers**  
> SkillPassport automatically builds a verified technical identity by analyzing a developer's real work across platforms like GitHub, GitLab, and LeetCode—replacing self-reported resume claims with measurable proof.

---

## 💡 Problem & Solution

### The Problem
Traditional resumes and LinkedIn profiles rely heavily on self-reported information (`Java ⭐⭐⭐⭐⭐`). Recruiters struggle to verify true technical competence, while developers lack a unified platform to demonstrate practical engineering experience.

### The Solution
Instead of static claims, SkillPassport provides verified evidence:
- **27 Java Projects** analyzed
- **1,480 Commits** scanned
- **52 REST APIs** developed
- **98 Merged Pull Requests** verified
- **94% Average Code Quality Score**
- **Spring Boot & Docker** deployment proof

---

## ✨ Features

- **🛡️ Verified Skill Scores**: Dynamic circular progress rings and analytics computed directly from codebase commits and repository data.
- **⟠ Live GitHub Integration**: Fetch public GitHub repositories in real time via GitHub REST API (`/users/{username}/repos`) to auto-extract skills & quality metrics.
- **🕸️ Interactive Skill Graph**: Dynamic node-edge network visualization mapping dependencies between technologies, frameworks, and tools.
- **📄 AI Resume Builder**: Live editor with real-time ATS compatibility scoring, job description optimization, and PDF/DOCX export.
- **🤖 AI Career Coach**: ChatGPT-style career advisor evaluating skill gaps and generating step-by-step learning roadmaps.
- **🔍 Recruiter Search Suite**: AI candidate search by verified skills, experience level, and hiring pipeline tracking.
- **💼 AI Job Matcher**: Automated matching score between verified developer profiles and open job requirements.

---

## 💳 Pricing Tiers (INR ₹)

| Tier | Price | Highlights |
| :--- | :--- | :--- |
| **Free** | **₹0 / forever** | Verified profile, GitHub connection, basic analytics, public portfolio |
| **Developer Pro** | **₹1,299 / month** | AI Resume Builder, AI Career Coach, ATS optimization, unlimited repo analysis |
| **Recruiter** | **₹3,999 / month** | AI candidate search, talent pipeline, verified skill reports, candidate comparison |
| **Enterprise** | **Custom** | Internal workforce skill mapping, team dashboards, SSO / SAML |

---

## 📁 Project Structure

```
SkillPassport/
├── src/                        # Source Code
│   ├── assets/                 # SVGs and Images
│   ├── components/             # Reusable UI Components (Cards, Buttons, Modals, ProgressRings)
│   ├── layouts/                # Dashboard Shell Layout
│   ├── pages/                  # Application Routes (Dashboard, Skills, Graph, Resume, Repos, Settings, etc.)
│   ├── store/                  # Zustand Global Store & GitHub API Integration
│   ├── App.tsx                 # Main Application Router
│   ├── index.css               # Design Tokens & Global CSS
│   └── main.tsx                # Entry Point
├── public/                     # Public Assets
├── .github/
│   ├── workflows/ci.yml        # GitHub Actions CI Workflow
│   └── dependabot.yml          # Dependabot Config
├── index.html                  # HTML Template
├── vite.config.ts              # Vite Configuration
├── tsconfig.app.json           # TypeScript Application Config
└── package.json                # Project Dependencies & Scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.0.0 or higher
- **npm**: v10.0.0 or higher

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/skillpassport.git
   cd SkillPassport
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 🛠️ Build & Test Commands

```bash
# Build for Production
npm run build

# Preview Production Build
npm run preview

# Lint Codebase
npm run lint
```

---

## 🛡️ License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
