// app/projects/page.tsx (ví dụ)

import React from "react";
import { searchReposByTopicAndUser } from '@/lib/github';
import { GITHUB } from '@/lib/config';
import { LangBadge } from './badge/LangBadge'
import { FaRegStar } from "react-icons/fa";

type RepoCardProps = {
  url: string;
  name: string;
  description: string | null;
  languages: string[];
  license?: string;
  lastUpdate: string;
  stars: number;
  commitCount: number;
};

const RepoCard = ({
  url,
  name,
  description,
  languages,
  license,
  lastUpdate,
  stars,
  commitCount
}: RepoCardProps) => {
  return (
    <div>
      <hr className="repo-bott" />
      <div className="repo-card">
        <div className="repo-header">
          <a href={url}>
            <h2 className="repo-name">{name}</h2>
          </a>
          <span className="repo-stars"><FaRegStar /> {stars}</span>
        </div>
        <p className="repo-desc">{description || "Không có mô tả"}</p>
        {/* <span className="repo-commits">
        <IoGitBranchOutline /> {commitCount} commits
      </span> */}
        <div className="repo-meta">
          {languages.map((lang) => (
            <LangBadge key={lang} lang={lang} />
          ))}
          {license && <span className="repo-license">{license}</span>}
          <span className="repo-updated">
            Last updated {new Date(lastUpdate).toLocaleDateString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default async function Projects() {
  const repos = await searchReposByTopicAndUser(GITHUB.username, GITHUB.topic, process.env.GITHUB_TOKEN!);

  return (
    <div className="max-w-3xl mx-auto py-12 container repo-project">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      {repos.map((repo) => (
        <RepoCard key={repo.name} {...repo} />
      ))}
    </div>
  );
}
