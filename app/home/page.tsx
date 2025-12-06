// app/page.tsx (SERVER COMPONENT)

import Image from "next/image";
import ExpandItem from "@/components/home/ExpandItem";
import AvatarStack from "@/components/AvatarStack";
import GithubContributions from "@/components/github/GithubContributions"; // DIRECT CLIENT IMPORT
import { iconMap } from "@/lib/utils/iconMap";

export default function Home() {
  const mySkills = [
    "angular", "nextjs", "springboot", "nodejs",
    "mssql", "postgresql", "mongodb", "redis", "dockerfile"
  ];

  const renderSkillIcons = (keys: string[]) =>
    keys.map((key) => {
      const entry = iconMap[key];
      if (!entry) return null;
      const Icon = entry.icon;
      return (
        <span
          key={key}
          title={key}
          style={{ color: entry.color, fontSize: "1.5rem", marginLeft: "0.5rem" }}
        >
          <Icon />
        </span>
      );
    });

  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">

      {/* HEADER */}
      <div className={`relative mt-10`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* AvatarStack */}
          <div className="order-2 md:order-none">
            <h1 className="text-[40px] md:text-[50px] font-bold">Tran Huu Dang</h1>
            <p className="text-[#2b2c2fa1] dark:text-[#E5E7EB] font-semibold">Fullstack developer</p>
          </div>

          <div className="md:static mx-auto mb-[50px] ml-[30%] md:ml-0 md:mb-0 md:mx-0">
            <AvatarStack />
          </div>

        </div>

        {/* SOCIAL */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { icon: "github", link: "https://github.com/dangtranhuu" },
            { icon: "leetcode", link: "https://leetcode.com/tranhuudang" },
            { icon: "hackerrank", link: "https://www.hackerrank.com/tranhuudang" },
            { icon: "linkedin", link: "https://www.linkedin.com/in/tranhuudang" },
            { icon: "youtube", link: "https://www.youtube.com/@devlands" },
            { icon: "facebook", link: "https://www.facebook.com/dangth.dev/" },
            { icon: "tiktok", link: "https://www.tiktok.com/@theanishtar" },
          ].map((s, i) => {
            const Icon = iconMap[s.icon].icon;
            return (
              <a href={s.link} target="_blank" key={i}>
                <button
                  className="
            bg-[var(--contact-bc)] 
            dark:bg-[var(--contact-bc-dark)]

            text-[var(--contact-bc-dark)] 
            dark:text-[var(--contact-bc)]

            px-3 py-1 rounded text-[18px]

            transition-all duration-200 ease-out
            hover:scale-110 hover:-translate-y-[2px]
            hover:shadow-lg hover:shadow-[var(--contact-bc)/50]
            dark:hover:shadow-[var(--contact-bc-dark)/50]
          "
                >
                  <Icon size={20} />
                </button>
              </a>
            );
          })}
        </div>

      </div>

      {/* ABOUT */}
      <section className="mt-12 space-y-4 fade-in">
        <p>I’m a fullstack developer with a strong interest in building web applications...</p>
        <p>I’ve led and contributed to several real-world projects such as DESTINY, DAVITICKETS...</p>
        <p>Connect with my Linkedin or Github to share knowledge ^^</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span>My skills:</span>
          {renderSkillIcons(mySkills)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Experience</h2>

        <ExpandItem
          title="Devlands"
          subtitle="Designer & Content creator"
          time="2021–2023"
          logo="/images/exp/devlands.jpg"
        >
          Devlands is a personal brand project designed as a social learning platform...
        </ExpandItem>
      </section>

      {/* EDUCATION */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Education</h2>

        <ExpandItem
          title="Can Tho University"
          subtitle="Information Technology"
          time="Sep 2025 – Jan 2027"
          logo="/images/education/ctu.png"
        >
          Studied Information Technology at Can Tho University...
        </ExpandItem>

        <ExpandItem
          title="FPT Polytechnic"
          subtitle="Software Development"
          time="Sep 2021 – Jan 2024"
          logo="/images/education/fpoly.jpg"
        >
          Studied Software Development at FPT Polytechnic...
        </ExpandItem>
      </section>

      {/* GITHUB CONTRIBUTIONS */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Github Contributions</h2>
        <GithubContributions />
      </section>

      {/* CERTIFICATIONS */}
      <section className="mt-12 fade-in text-center">
        <h2 className="text-[32px] font-semibold mb-4">Certifications</h2>

        <div className="flex flex-wrap gap-10 justify-center">
          {[
            {
              img: "udemy.png",
              title: "Master Microservices with Spring Boot & Spring Cloud",
              org: "Udemy",
              date: "02/08/2024",
            },
            {
              img: "aws-cloudfoundations.png",
              title: "AWS Academy Cloud Foundations",
              org: "AWS",
              date: "03/07/2022",
            },
            {
              img: "datacamp/statement-of-accomplishment.png",
              title: "Intermediate SQL Queries",
              org: "Data Camp",
              date: "APR 15, 2022",
            },
          ].map((cert, idx) => (
            <article key={idx} className="w-[250px]">
              <Image
                src={`/images/cert/${cert.img}`}
                alt={cert.title}
                width={100}
                height={100}
                className="mx-auto object-contain"
              />
              <div className="font-bold mt-2 text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                {cert.title}
              </div>
              <div className="text-[14px] text-[#555]">{cert.org}</div>
              <div className="text-[13px] text-[#888] mt-1">Issued {cert.date}</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
