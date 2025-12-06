import {
  FaVuejs, FaReact, FaPython, FaJava, FaNodeJs, FaDocker, FaGitAlt
} from 'react-icons/fa';
import { FaFlutter } from "react-icons/fa6";
import {
  SiJavascript, SiTypescript, SiCplusplus, SiGo, SiRust, SiPhp,
  SiDart, SiCmake, SiSwift, SiKotlin, SiSass, SiAngular, SiMongodb, SiRedis
} from 'react-icons/si';
import { PiFileCSharpBold } from 'react-icons/pi';
import { TbBrandNextjs, TbBrandMysql } from "react-icons/tb";
import { BiLogoSpringBoot, BiLogoPostgresql } from "react-icons/bi";
import { DiMsqlServer } from "react-icons/di";
import { FiGithub, FiYoutube } from "react-icons/fi";
import { LuLinkedin, LuFacebook } from "react-icons/lu";
import { SiLeetcode } from "react-icons/si";
import { TbBrandHackerrank, TbBrandTiktok } from "react-icons/tb";
import { IconType } from 'react-icons';

type IconEntry = {
  icon: IconType;
  color?: string; // optional nếu không muốn override
};

export const iconMap: Record<string, IconEntry> = {
  github: { icon: FiGithub, color: "#000" },
  leetcode: { icon: SiLeetcode, color: "#FFA116" },
  hackerrank: { icon: TbBrandHackerrank, color: "#32c766" },
  linkedin: { icon: LuLinkedin, color: "#0A66C2" },
  youtube: { icon: FiYoutube, color: "#FF0000" },
  facebook: { icon: LuFacebook, color: "#1877F2" },
  tiktok: { icon: TbBrandTiktok, color: "#000" },

  //fe
  vue: { icon: FaVuejs, color: '#42b883' },
  react: { icon: FaReact, color: '#61dafb' },
  nextjs: { icon: TbBrandNextjs, color: '#000000' },
  angular: { icon: SiAngular, color: '#F3044C' },

  //be
  springboot: { icon: BiLogoSpringBoot, color: '#76BC1E' },
  nodejs: { icon: FaNodeJs, color: '#43853d' },

  //db
  mysql: { icon: TbBrandMysql, color: '#016089' },
  mssql: { icon: DiMsqlServer, color: '#E2302A' },
  postgresql: { icon: BiLogoPostgresql, color: '#336791' },
  mongodb: { icon: SiMongodb, color: '#16AA52' },
  redis: { icon: SiRedis, color: '#C8302B' },

  // mobile
  flutter: { icon: FaFlutter, color: '#45C6FB' },

  //langs
  python: { icon: FaPython, color: '#3776AB' },
  java: { icon: FaJava, color: '#b07219' },
  javascript: { icon: SiJavascript, color: '#f1e05a' },
  typescript: { icon: SiTypescript, color: '#3178c6' },
  csharp: { icon: PiFileCSharpBold, color: '#178600' },
  go: { icon: SiGo, color: '#00ADD8' },
  rust: { icon: SiRust, color: '#dea584' },
  php: { icon: SiPhp, color: '#4F5D95' },
  dart: { icon: SiDart, color: '#00B4AB' },
  kotlin: { icon: SiKotlin, color: '#7F52FF' },
  scss: { icon: SiSass, color: '#CD6799' },
  cmake: { icon: SiCmake, color: '#064F8C' },
  swift: { icon: SiSwift, color: '#F05138' },
  cplusplus: { icon: SiCplusplus, color: '#f34b7d' },

  //others
  dockerfile: { icon: FaDocker, color: '#2496ED' },
  git: { icon: FaGitAlt, color: '#DE4C36' },

};
