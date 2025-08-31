export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics?: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  default_branch: string
  homepage: string | null
  license: {
    name: string
    spdx_id: string
  } | null
  archived: boolean
  disabled: boolean
  private: boolean
  fork: boolean
  size: number
  open_issues_count: number
  watchers_count: number
  visibility: string
}

export async function fetchUserRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found')
      }
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw new Error(`Failed to fetch repositories: ${response.status}`)
    }
    
    const repos: GitHubRepository[] = await response.json()
    
    // Filter out private repositories and only return public ones
    return repos.filter(repo => !repo.private)
  } catch (error) {
    console.error('Error fetching repositories:', error)
    throw error
  }
}

export async function fetchUser(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found')
      }
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw new Error(`Failed to fetch user: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
