export async function getGithubRepos(username: string, token: string) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'next-app'
    }
  });

  const repos = await res.json();

  const detailedRepos = await Promise.all(repos.map(async (repo: any) => {
    const commitsRes = await fetch(repo.commits_url.replace('{/sha}', ''), {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'next-app'
      }
    });

    const commits = await commitsRes.json();

    return {
      name: repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      commits: Array.isArray(commits) ? commits.length : 0
    };
  }));

  detailedRepos.sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return b.forks - a.forks;
  });

  return detailedRepos;
}
