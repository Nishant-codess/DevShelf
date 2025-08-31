// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || 'your_github_client_id'
const GITHUB_REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000/auth/callback'

export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  name: string | null
  bio: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubAuthResponse {
  access_token: string
  token_type: string
  scope: string
}

// Initiate GitHub OAuth flow
export function initiateGitHubLogin() {
  const state = generateRandomState()
  localStorage.setItem('github_oauth_state', state)
  
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user,repo&state=${state}`
  
  // Redirect to GitHub
  window.location.href = githubAuthUrl
}

// Generate random state for OAuth security
function generateRandomState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Exchange code for access token (this would typically be done on the backend)
export async function exchangeCodeForToken(code: string): Promise<GitHubAuthResponse> {
  // Note: In a real application, this should be done on the backend
  // to keep the client secret secure
  const response = await fetch('/api/auth/github/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  if (!response.ok) {
    throw new Error('Failed to exchange code for token')
  }

  return response.json()
}

// Get authenticated user data
export async function getAuthenticatedUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch authenticated user')
  }

  return response.json()
}

// Get authenticated user's repositories
export async function getAuthenticatedUserRepos(accessToken: string): Promise<any[]> {
  const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user repositories')
  }

  return response.json()
}

// Get repository README content
export async function getRepositoryReadme(owner: string, repo: string, accessToken: string): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    return '' // Return empty string if README not found
  }

  const data = await response.json()
  return atob(data.content) // Decode base64 content
}

// Get repository activity (commits, issues, etc.)
export async function getRepositoryActivity(owner: string, repo: string, accessToken: string): Promise<any[]> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/events?per_page=10`, {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

// Get repository issues and comments
export async function getRepositoryIssues(owner: string, repo: string, accessToken: string): Promise<any[]> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=5`, {
    headers: {
      'Authorization': `token ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    return []
  }

  return response.json()
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('github_access_token')
}

// Get stored access token
export function getAccessToken(): string | null {
  return localStorage.getItem('github_access_token')
}

// Store access token
export function storeAccessToken(token: string): void {
  localStorage.setItem('github_access_token', token)
}

// Remove access token (logout)
export function removeAccessToken(): void {
  localStorage.removeItem('github_access_token')
  localStorage.removeItem('github_oauth_state')
}

// Handle OAuth callback
export function handleOAuthCallback(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  const storedState = localStorage.getItem('github_oauth_state')

  // Verify state parameter for security
  if (state !== storedState) {
    throw new Error('Invalid OAuth state parameter')
  }

  // Clean up stored state
  localStorage.removeItem('github_oauth_state')

  return code
}
