import React from "react";
import { getGithubRepos } from '@/lib/github';

export default async function Projects() {

  const repos = await getGithubRepos('dangtranhuu', process.env.GITHUB_TOKEN!);
  return (
    <div className="container">
      <h1>Your GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>
            <strong>{repo.name}</strong> - ⭐ {repo.stars} | 🍴 {repo.forks} | 📝 {repo.commits} commits
          </li>
        ))}
      </ul>
    </div>
  );
}