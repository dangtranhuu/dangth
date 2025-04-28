// github.ts

export interface GithubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  languages_url: string;
}

export interface ProcessedRepo {
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  topics: string[];
  lastUpdate: string;
  languages: string[];
}

export async function searchReposByTopicAndUser(
  username: string,
  topic: string,
  token: string
): Promise<ProcessedRepo[]> {
  const query = `topic:${topic}+user:${username}`;
  const url = `https://api.github.com/search/repositories?q=${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'next-app',
        Accept: 'application/vnd.github.mercy-preview+json' // cần để query topics
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GitHub API error:", res.status, errorText);
      return [];
    }

    const data: { items: GithubRepo[] } = await res.json();

    const detailedRepos: ProcessedRepo[] = await Promise.all(
      data.items.map(async (repo): Promise<ProcessedRepo> => {
        const languagesRes = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'next-app'
          }
        });

        const languages = await languagesRes.json();

        return {
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics,
          lastUpdate: repo.updated_at,
          languages: Object.keys(languages)
        };
      })
    );

    return detailedRepos;
  } catch (err) {
    console.error("❌ Fetch failed:", err);
    return [];
  }
}
