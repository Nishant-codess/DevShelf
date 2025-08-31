export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
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
  coverImage?: string
  featured?: boolean
  hidden?: boolean
}

export interface User {
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

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  criteria: {
    type: 'stars' | 'forks' | 'age' | 'language' | 'custom'
    value: number | string
  }
}

export interface Trophy {
  id: string
  name: string
  description: string
  icon: string
  color: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlockedAt?: string
}

export interface FilterOptions {
  search: string
  language: string
  sortBy: 'stars' | 'forks' | 'updated' | 'created'
  order: 'asc' | 'desc'
  featured: boolean
}
