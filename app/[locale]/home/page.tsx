'use client';
import React, { useEffect } from 'react';
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { TbBrandHackerrank } from "react-icons/tb";
import { LuLinkedin } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { TbBrandTiktok } from "react-icons/tb";
import { useTranslations } from 'next-intl';
import { iconMap } from '@/lib/utils/iconMap';
import GithubContributions from '@/components/github/GithubContributions'
import AvatarStack from '@/components/AvatarStack'
import { useInView } from '@/hooks/useInView';
import useFadeInOnLoad from '@/hooks/useFadeInOnLoad';

const mySkills = ['angular', 'nextjs', 'springboot', 'nodejs', 'mssql', 'postgresql', 'mongodb', 'redis', 'dockerfile']

const renderSkillIcons = (keys: string[]) =>
  keys.map((key) => {
    const entry = iconMap[key];
    if (!entry) return null;
    const Icon = entry.icon;
    return (
      <span key={key} title={key} style={{ color: entry.color, fontSize: '1.5rem', marginLeft: '0.5rem' }}>
        <Icon />
      </span>
    );
  });

export default function Home() {

  const t = useTranslations("home");
  const { ref: ghcRef, isVisible: ghcVisible } = useInView();
  const { ref: certRef, isVisible: certVisible } = useInView();
  const isHeaderVisible = useFadeInOnLoad(100);
  const isAboutVisible = useFadeInOnLoad(500);
  const isExpVisible = useFadeInOnLoad(900);
  const isEduVisible = useFadeInOnLoad(1200);

  useEffect(() => {
    const items = document.querySelectorAll('.item');

    const handlers: { title: HTMLElement; handler: () => void }[] = [];

    items.forEach((item) => {
      const title = item.querySelector('.title') as HTMLElement;
      const details = item.querySelector('.details') as HTMLElement;
      const icon = item.querySelector('.icon-wrap svg') as HTMLElement;

      if (title && details && icon) {
        const handler = () => {
          icon.classList.toggle('rotate');
          details.classList.toggle('show');
        };

        title.addEventListener('click', handler);
        handlers.push({ title, handler }); // lưu lại để cleanup
      }
    });

    return () => {
      handlers.forEach(({ title, handler }) => {
        title.removeEventListener('click', handler);
      });
    };
  }, []);


  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)] dark:bg-[var(--background-color-dark)]">
      {/* Header */}
      <div className={`fade-in-load scroll-fade ${isHeaderVisible ? 'visible' : ''} relative mt-10`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* AvatarStack */}
          <div className="order-2 md:order-none">
            <h1 className="text-[40px] md:text-[50px] font-bold">{t("fullName")}</h1>
            <p className="text-[#2b2c2fa1] dark:text-[#E5E7EB] font-semibold">{t("role")}</p>
          </div>

          <div className="md:static mx-auto mb-[50px] ml-[30%] md:ml-0 md:mb-0 md:mx-0">
            <AvatarStack />
          </div>

        </div>

        <div className="flex flex-col gap-2">
          <div className="mt-4 mb-4 space-y-2">
            <div className="flex gap-2">
              <a href="https://github.com/dangtranhuu" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <FiGithub />
                </button>
              </a>
              <a href="https://leetcode.com/tranhuudang" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <SiLeetcode />
                </button>
              </a>
              <a href="https://www.hackerrank.com/tranhuudang" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <TbBrandHackerrank />
                </button>
              </a>
            </div>
            <div className="flex gap-2">
              <a href="https://www.linkedin.com/in/tranhuudang" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <LuLinkedin />
                </button>
              </a>
              <a href="https://www.youtube.com/@devlands" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <FiYoutube />
                </button>
              </a>
              <a href="https://www.facebook.com/dangdeveloper/" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <LuFacebook />
                </button>
              </a>
              <a href="https://www.tiktok.com/@theanishtar" target="_blank">
                <button className="bg-[var(--contact-bc)] dark:bg-[var(--contact-bc-dark)] text-[var(--contact-bc-dark)] dark:text-[var(--contact-bc)] px-3 py-1 rounded text-[18px] flex items-center gap-2">
                  <TbBrandTiktok />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className={`fade-in-load scroll-fade ${isAboutVisible ? 'visible' : ''} space-y-4 mb-12`}>
        <p>
          I’m a fullstack developer with a strong interest in building web applications that are both functional and user-friendly...
        </p>
        <p>
          I’ve led and contributed to several real-world projects such as DESTINY, DAVITICKETS, DAVISY...
        </p>
        {/* <ul>
          <li className='flex'>BackEnd: <span className='mr-[10px]'></span> {renderSkillIcons(backendSkills)}</li>
          <li className='flex'>FrontEnd:<span className='mr-[10px]'></span> {renderSkillIcons(frontendSkills)}</li>
          <li className='flex'>Database:<span className='mr-[10px]'></span> {renderSkillIcons(dbSkills)}</li>
          <li className='flex'>DevOps:<span className='mr-[10px]'></span> {renderSkillIcons(devopsSkills)}</li>
          <li className='flex'>Others: <span className='mr-[10px]'></span>{renderSkillIcons(otherSkills)}</li>
        </ul> */}
        <p>
          Connect with my Linkedin to discuss about work or my Github to share interesting knowledge ^^
        </p>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', }}>
          <span style={{ flexBasis: '100%' }}>My skills:</span>
          {renderSkillIcons(mySkills)}
        </div>
      </div>

      {/* EXPERIENCE section */}
      <div className={`fade-in-load scroll-fade ${isExpVisible ? 'visible' : ''} experience title section mb-12`}>
        <h1 className="text-[32px] font-semibold mb-4">Experience</h1>

        {/* Item */}
        <div className="item">
          <div className="title flex justify-between items-start py-2 cursor-pointer group">
            {/* LEFT: logo + info */}
            <div className="left col flex">
              {/* Avatar/logo */}
              <div className="left w-[70px]">
                <img
                  src="/images/exp/devlands.jpg"
                  className="w-[48px] h-[48px] object-cover rounded-md"
                  alt="devlands"
                />
              </div>

              {/* Content */}
              <div className="right">
                <div className="top font-semibold text-[17px] flex items-center gap-1">
                  Devlands
                  <span className="icon-wrap">
                    <svg
                      className="w-4 h-4 transform transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <div className="bot text-sm text-gray-500 dark:text-gray-400">
                  Designer & Content creator
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="right times text-[15px] font-semibold tracking-tight whitespace-nowrap">
              2021–2023
            </div>
          </div>

          {/* Toggle content */}
          <div className="details text-[15px] leading-[27px] text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden transition-all duration-300">
            <p>
              Devlands is a personal brand project designed as a social learning platform,
              offering tutorials and coding challenges to support developers.
            </p>
          </div>
        </div>
      </div>

      {/* EDUCATION section */}
      <div className={`fade-in-load scroll-fade ${isEduVisible ? 'visible' : ''} education title section mb-12`}>
        <h1 className="text-[32px] font-semibold mb-4">Education</h1>

        {/* === Item 1 === */}
        <div className="item">
          <div className="title flex justify-between items-start py-2 cursor-pointer group">
            {/* LEFT: logo + info */}
            <div className="left col flex">
              {/* Logo */}
              <div className="left w-[70px]">
                <img
                  src="/images/education/ctu.png"
                  className="w-[48px] h-[48px] object-cover rounded-full"
                  alt="ctu"
                />
              </div>

              {/* Content */}
              <div className="right">
                <div className="top font-semibold text-[17px] flex items-center gap-1">
                  Can Tho University
                  <span className="icon-wrap">
                    <svg
                      className="w-4 h-4 transform transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <div className="bot text-sm text-gray-500 dark:text-gray-400">
                  Information Technology
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="right times text-[15px] font-semibold tracking-tight whitespace-nowrap">
              Sep 2021 – Jan 2024
            </div>
          </div>

          {/* Toggle content */}
          <div className="details text-[15px] leading-[27px] text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden transition-all duration-300">
            <p>
              Studied Information Technology at Can Tho University, focusing on programming, databases, and software development.
            </p>
          </div>
        </div>

        {/* === Item 2 === */}
        <div className="item">
          <div className="title flex justify-between items-start py-2 cursor-pointer group">
            {/* LEFT: logo + info */}
            <div className="left col flex">
              {/* Logo */}
              <div className="left w-[70px]">
                <img
                  src="/images/education/fpoly.jpg"
                  className="w-[48px] h-[48px] object-cover rounded-full"
                  alt="fpt"
                />
              </div>

              {/* Content */}
              <div className="right">
                <div className="top font-semibold text-[17px] flex items-center gap-1">
                  FPT Polytechnic
                  <span className="icon-wrap">
                    <svg
                      className="w-4 h-4 transform transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </span>
                </div>
                <div className="bot text-sm text-gray-500 dark:text-gray-400">
                  Software development
                </div>
              </div>
            </div>

            {/* Time */}
            <div className="right times text-[15px] font-semibold tracking-tight whitespace-nowrap">
              Sep 2021 – Jan 2024
            </div>
          </div>

          {/* Toggle content */}
          <div className="details text-[15px] leading-[27px] text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden transition-all duration-300">
            <p>
              Studied Software Development at FPT Polytechnic, with experience as a teaching assistant supporting student learning.
            </p>
          </div>
        </div>
      </div>


      {/* GithubContributions section */}
      <div ref={ghcRef} className={`fade-in-load scroll-fade ${ghcVisible ? 'visible' : ''} github-contributions title section mb-12`}>
        <h1 className="text-[32px] font-semibold mb-4">Github Contributions</h1>
        <GithubContributions />
      </div>


      {/* CERTIFICATIONS section */}
      <div ref={certRef} className={`fade-in-load scroll-fade ${certVisible ? 'visible' : ''} cert title section mb-12`}>
        <h1 className="text-[32px] font-semibold mb-4">Certifications</h1>
        <div className="flex flex-wrap gap-10 justify-center text-center">
          {[
            {
              img: 'udemy.png',
              title: 'Master Microservices with Spring Boot & Spring Cloud',
              org: 'Udemy',
              date: '02/08/2024',
            },
            {
              img: 'aws-cloudfoundations.png',
              title: 'AWS Academy Cloud Foundations',
              org: 'AWS',
              date: '03/07/2022',
            },
            {
              img: 'datacamp/statement-of-accomplishment.png',
              title: 'Intermediate SQL Queries',
              org: 'Data Camp',
              date: 'APR 15, 2022',
            },
          ].map((cert, idx) => (
            <div key={idx} className="w-[250px]">
              <img
                src={`/images/cert/${cert.img}`}
                alt={cert.title}
                className="w-[100px] mx-auto"
              />
              <div className="font-bold mt-2 text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                {cert.title}
              </div>
              <div className="text-[14px] text-[#555]">{cert.org}</div>
              <div className="text-[13px] text-[#888] mt-1">Issued {cert.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}
