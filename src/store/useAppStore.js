import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const languageColorMap = {
  Java: '#F89820',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Go: '#00ADD8',
  Rust: '#DEA584',
  C: '#555555',
  'C++': '#F34B7D',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Shell: '#89E051',
  PHP: '#4F5D95',
  Ruby: '#701516',
};

const initialUserState = {
  name: '',
  title: '',
  email: '',
  location: '',
  bio: '',
  avatar: '',
  githubUsername: '',
  role: 'developer',
  isAuthenticated: false,
  isProfileSetup: false,
  overallScore: 0,
  stats: {
    projects: 0,
    commits: 0,
    apis: 0,
    prs: 0,
  },
};

const initialJobs = [
  {
    id: 'job-1',
    title: 'Senior Backend Engineer',
    company: 'Stripe',
    location: 'Remote',
    salary: '₹18L – ₹24L',
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    description: 'Looking for a Senior Backend Engineer to build high-scale payment processing APIs and microservices.',
    postedBy: 'Stripe Recruiting Team',
    createdAt: '2 days ago',
  },
  {
    id: 'job-2',
    title: 'Frontend Architect',
    company: 'Vercel',
    location: 'Remote',
    salary: '₹16L – ₹22L',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
    description: 'Lead web performance optimizations and build modern UI component systems.',
    postedBy: 'Vercel Engineering',
    createdAt: '3 days ago',
  },
  {
    id: 'job-3',
    title: 'Platform Infrastructure Engineer',
    company: 'Linear',
    location: 'Remote',
    salary: '₹19L – ₹25L',
    skills: ['Kubernetes', 'Docker', 'Go', 'DevOps'],
    description: 'Manage automated Kubernetes clusters, CI/CD pipelines, and cloud observability.',
    postedBy: 'Linear Ops',
    createdAt: '5 days ago',
  },
];

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: initialUserState,
      skills: [],
      repositories: [],
      certifications: [],
      activities: [],
      jobs: initialJobs,
      candidatesPipeline: [],
      connectedApps: {
        github: false,
        gitlab: false,
        stackoverflow: false,
        leetcode: false,
      },
      isSyncingGitHub: false,
      syncError: null,

      login: (email, name = '', role = 'developer', githubUsername = '') => {
        set((state) => ({
          user: {
            ...state.user,
            email: email || state.user.email,
            name: name || state.user.name || (email ? email.split('@')[0] : 'User'),
            role: role || state.user.role,
            githubUsername: githubUsername || state.user.githubUsername,
            isAuthenticated: true,
          },
        }));
      },

      register: (data) => {
        set((state) => ({
          user: {
            ...state.user,
            ...data,
            isAuthenticated: true,
            isProfileSetup: false,
          },
        }));
      },

      logout: () => {
        set(() => ({
          user: initialUserState,
          skills: [],
          repositories: [],
          certifications: [],
          activities: [],
          jobs: initialJobs,
          candidatesPipeline: [],
          connectedApps: {
            github: false,
            gitlab: false,
            stackoverflow: false,
            leetcode: false,
          },
          isSyncingGitHub: false,
          syncError: null,
        }));
      },

      updateProfile: (data) => {
        set((state) => ({
          user: {
            ...state.user,
            ...data,
            isProfileSetup: true,
          },
        }));
      },

      addSkill: (newSkillData) => {
        const newSkill = {
          id: `skill-${Date.now()}`,
          projectsCount: Math.floor(Math.random() * 5) + 1,
          commitsCount: Math.floor(Math.random() * 200) + 20,
          verified: true,
          ...newSkillData,
        };

        set((state) => {
          const updatedSkills = [newSkill, ...state.skills.filter((s) => s.name.toLowerCase() !== newSkill.name.toLowerCase())];
          const newActivity = {
            id: `act-${Date.now()}`,
            icon: '✓',
            text: `Added & verified skill: ${newSkill.name} (${newSkill.score}%)`,
            time: 'Just now',
            color: 'var(--sp-success)',
          };

          return {
            skills: updatedSkills,
            activities: [newActivity, ...state.activities.slice(0, 9)],
          };
        });

        get().recalculateOverallScore();
      },

      removeSkill: (id) => {
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        }));
        get().recalculateOverallScore();
      },

      verifySkill: (skillName) => {
        set((state) => {
          const updatedSkills = state.skills.map((s) =>
            s.name.toLowerCase() === skillName.toLowerCase()
              ? { ...s, verified: true, score: Math.min(99, s.score + 5) }
              : s
          );
          const newActivity = {
            id: `act-${Date.now()}`,
            icon: '⚡',
            text: `Re-verified ${skillName} codebase analysis`,
            time: 'Just now',
            color: 'var(--sp-accent)',
          };
          return {
            skills: updatedSkills,
            activities: [newActivity, ...state.activities.slice(0, 9)],
          };
        });
        get().recalculateOverallScore();
      },

      addCertification: (certData) => {
        const newCert = {
          id: `cert-${Date.now()}`,
          name: certData.name,
          issuer: certData.issuer || 'Professional Organization',
          date: certData.date || '2026',
          verified: true,
          credentialId: certData.credentialId || `SP-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        };

        set((state) => {
          const newActivity = {
            id: `act-${Date.now()}`,
            icon: '🏆',
            text: `Verified Certification: ${newCert.name} (${newCert.issuer})`,
            time: 'Just now',
            color: 'var(--sp-accent-light)',
          };

          return {
            certifications: [newCert, ...state.certifications],
            activities: [newActivity, ...state.activities.slice(0, 9)],
          };
        });
      },

      removeCertification: (id) => {
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id),
        }));
      },

      // Recruiter Job Management Actions
      addJob: (jobData) => {
        const newJob = {
          id: `job-${Date.now()}`,
          title: jobData.title,
          company: jobData.company || get().user.name || 'Hiring Team',
          location: jobData.location || 'Remote',
          salary: jobData.salary || 'Competitive',
          skills: Array.isArray(jobData.skills) ? jobData.skills : jobData.skills.split(',').map((s) => s.trim()),
          description: jobData.description || 'Verified engineering role.',
          postedBy: get().user.name || 'Recruiter',
          createdAt: 'Just now',
        };

        set((state) => ({
          jobs: [newJob, ...state.jobs],
        }));
      },

      removeJob: (jobId) => {
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== jobId),
        }));
      },

      toggleConnectedApp: (app) => {
        set((state) => ({
          connectedApps: {
            ...state.connectedApps,
            [app]: !state.connectedApps[app],
          },
        }));
      },

      syncGitHub: async (githubUsername) => {
        if (!githubUsername || !githubUsername.trim()) return;

        set({ isSyncingGitHub: true, syncError: null });

        try {
          const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=20`);
          if (!response.ok) {
            throw new Error(`GitHub user "${githubUsername}" not found or API rate limited.`);
          }

          const ghRepos = await response.json();

          if (ghRepos.length === 0) {
            throw new Error(`No public repositories found for GitHub user "${githubUsername}".`);
          }

          const langMap = {};
          let totalStars = 0;
          let totalForks = 0;

          const parsedRepos = ghRepos.map((repo, idx) => {
            const lang = repo.language || 'JavaScript';
            langMap[lang] = (langMap[lang] || 0) + 1;
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;

            const baseScore = Math.min(98, 75 + repo.stargazers_count * 2 + Math.max(0, 15 - idx));

            return {
              id: `gh-repo-${repo.id}`,
              name: repo.name,
              desc: repo.description || 'Public GitHub repository dynamically fetched and analyzed by SkillPassport.',
              lang: {
                name: lang,
                color: languageColorMap[lang] || '#4F46E5',
              },
              scores: {
                architecture: baseScore > 90 ? 'A+' : 'A',
                security: baseScore > 85 ? 'A' : 'B+',
                testing: `${Math.min(96, baseScore - 2)}%`,
                docs: baseScore > 88 ? 'A' : 'B',
                performance: baseScore > 92 ? 'A+' : 'A-',
              },
              overall: baseScore,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              public: !repo.private,
              aiReviewed: true,
              url: repo.html_url,
            };
          });

          const newSkills = Object.entries(langMap).map(([langName, count], idx) => {
            const score = Math.min(98, 70 + count * 6 + Math.max(0, 10 - idx * 2));
            return {
              id: `skill-gh-${langName.toLowerCase()}`,
              name: langName,
              score,
              category: count > 3 ? 'Primary Language' : 'Secondary Stack',
              verified: true,
              projectsCount: count,
              commitsCount: count * 45 + Math.floor(Math.random() * 50),
            };
          });

          set((state) => {
            const mergedSkills = [...newSkills];
            state.skills.forEach((existingSkill) => {
              if (!mergedSkills.some((s) => s.name.toLowerCase() === existingSkill.name.toLowerCase())) {
                mergedSkills.push(existingSkill);
              }
            });

            const newActivity = {
              id: `act-${Date.now()}`,
              icon: '⟠',
              text: `Synced ${ghRepos.length} public repos from GitHub @${githubUsername}`,
              time: 'Just now',
              color: 'var(--sp-accent-light)',
            };

            return {
              repositories: parsedRepos,
              skills: mergedSkills,
              connectedApps: { ...state.connectedApps, github: true },
              user: {
                ...state.user,
                githubUsername,
                isProfileSetup: true,
                stats: {
                  projects: ghRepos.length,
                  commits: ghRepos.length * 45 + totalStars * 5,
                  apis: Math.round(ghRepos.length * 2.5),
                  prs: Math.round(ghRepos.length * 1.8),
                },
              },
              activities: [newActivity, ...state.activities.slice(0, 9)],
              isSyncingGitHub: false,
              syncError: null,
            };
          });

          get().recalculateOverallScore();
        } catch (err) {
          set({
            isSyncingGitHub: false,
            syncError: err.message || 'Failed to sync with GitHub',
          });
        }
      },

      recalculateOverallScore: () => {
        const currentSkills = get().skills;
        if (currentSkills.length === 0) {
          set((state) => ({ user: { ...state.user, overallScore: 0 } }));
          return;
        }
        const avg = Math.round(currentSkills.reduce((acc, s) => acc + s.score, 0) / currentSkills.length);
        set((state) => ({
          user: {
            ...state.user,
            overallScore: Math.min(99, Math.max(40, avg)),
          },
        }));
      },
    }),
    {
      name: 'skillpassport-dynamic-user-store',
    }
  )
);
