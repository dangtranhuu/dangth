import React from "react";
import { searchReposByTopicAndUser } from '@/lib/utils/github';
import { GITHUB } from '@/config/config';
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
      <div className="hr" />
      <div className="-mx-4 hover:bg-muted transition-colors duration-200 rounded-md">
        <div className="px-6 py-[30px]">
          <div className="flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <a href={url} className="text-lg font-semibold hover:underline dark:text-[#E5E7EB]">
                {name}
              </a>
              <span className="text-sm flex items-center gap-1 text-muted-foreground">
                <FaRegStar className="text-base" /> {stars}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {description || "Không có mô tả"}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              {languages.map((lang) => (
                <LangBadge key={lang} lang={lang} />
              ))}
              {license && (
                <span className="text-muted-foreground text-xs border px-2 py-1 rounded-md">
                  {license}
                </span>
              )}
              <span className="text-muted-foreground text-xs ml-auto">
                Last updated {new Date(lastUpdate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default async function Projects() {
  const repos = await searchReposByTopicAndUser(GITHUB.username, GITHUB.topic, process.env.GITHUB_TOKEN!);

  return (
    <div className="max-w-3xl mx-auto py-12 container repo-project">
      <h1 className="text-[32px] font-semibold mb-4 dark:text-[#E5E7EB]">Projects</h1>
      {repos.map((repo) => (
        <RepoCard key={repo.name} {...repo} />
      ))}
    </div>
  );
}
