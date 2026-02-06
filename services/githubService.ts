
import { CONFIG, getToken } from '../config';

class GitHubStorage {
  private owner: string;
  private repo: string;
  private branch: string;
  private apiBase: string;

  constructor() {
    this.owner = CONFIG.github.owner;
    this.repo = CONFIG.github.repo;
    this.branch = CONFIG.github.branch;
    this.apiBase = 'https://api.github.com';
  }

  private get headers() {
    return {
      'Authorization': `token ${getToken()}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  }

  async initialize() {
    try {
      await this.readFile('data/progress.json');
    } catch (error) {
      console.log('Initializing data folder...');
      const initialProgress = {
        daysUnlocked: [],
        daysCompleted: [],
        startedAt: new Date().toISOString()
      };
      await this.writeFile('data/progress.json', initialProgress, 'Initialize progress tracking');
    }
  }

  async readFile(path: string) {
    const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const response = await fetch(url, { headers: this.headers });
    
    if (!response.ok) {
      if (response.status === 404) throw new Error('File not found');
      throw new Error(`Failed to read ${path}`);
    }
    
    const data = await response.json();
    const content = atob(data.content);
    return {
      data: JSON.parse(content),
      sha: data.sha
    };
  }

  async writeFile(path: string, content: any, commitMessage?: string) {
    let sha = null;
    try {
      const existing = await this.readFile(path);
      sha = existing.sha;
    } catch (error) {
      // File doesn't exist, proceed
    }

    const url = `${this.apiBase}/repos/${this.owner}/${this.repo}/contents/${path}`;
    const encodedContent = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));

    const body: any = {
      message: commitMessage || `Update ${path}`,
      content: encodedContent,
      branch: this.branch
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(`Failed to write ${path}: ${err.message}`);
    }

    return await response.json();
  }

  async updateProgress(day: string, status: 'unlocked' | 'completed') {
    try {
      const { data: progress } = await this.readFile('data/progress.json');
      
      const key = status === 'unlocked' ? 'daysUnlocked' : 'daysCompleted';
      if (!progress[key].includes(day)) {
        progress[key].push(day);
      }
      
      progress.lastUpdated = new Date().toISOString();
      await this.writeFile('data/progress.json', progress, `Day ${day} ${status}`);
      return progress;
    } catch (e) {
      // If folder not initialized
      const initial = {
        daysUnlocked: status === 'unlocked' ? [day] : [],
        daysCompleted: status === 'completed' ? [day] : [],
        startedAt: new Date().toISOString()
      };
      await this.writeFile('data/progress.json', initial, `Init with Day ${day} ${status}`);
      return initial;
    }
  }
}

export const githubStorage = new GitHubStorage();
