// Profile links / contact info — sourced from env vars (VITE_*).
// Set them in Vercel (Project → Settings → Environment Variables) for production
// and in a local `.env` for development (see .env.example). No values live in code.
const env = import.meta.env

export const SITE = {
  githubUrl: env.VITE_GITHUB_URL || 'https://github.com/itamarkln-dev',
  githubReposUrl: env.VITE_GITHUB_REPOS_URL || 'https://github.com/itamarkln-dev?tab=repositories',
  linkedinUrl: env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/itamarklein',
  email: env.VITE_EMAIL || 'itamarkln.dev@gmail.com',
}
