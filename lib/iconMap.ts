import {
  FaVuejs, FaReact, FaPython, FaJava, FaNodeJs, FaHtml5, FaCss3Alt, FaDocker,
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiCplusplus, SiGo, SiRust, SiPhp,
  SiDart, SiCmake, SiSwift, SiKotlin, SiSass,
} from 'react-icons/si';
import { PiFileCSharpBold, PiFileSqlBold } from 'react-icons/pi';
import { IconType } from 'react-icons';

type IconEntry = {
  icon: IconType;
  color?: string; // optional nếu không muốn override
};

export const iconMap: Record<string, IconEntry> = {
  vue: { icon: FaVuejs, color: '#42b883' },
  react: { icon: FaReact, color: '#61dafb' },
  python: { icon: FaPython, color: '#3776AB' },
  java: { icon: FaJava, color: '#b07219' },
  nodejs: { icon: FaNodeJs, color: '#43853d' },
  javascript: { icon: SiJavascript, color: '#f1e05a' },
  typescript: { icon: SiTypescript, color: '#3178c6' },
  csharp: { icon: PiFileCSharpBold, color: '#178600' },
  cplusplus: { icon: SiCplusplus, color: '#f34b7d' },
  go: { icon: SiGo, color: '#00ADD8' },
  rust: { icon: SiRust, color: '#dea584' },
  php: { icon: SiPhp, color: '#4F5D95' },
  html: { icon: FaHtml5, color: '#e34c26' },
  css: { icon: FaCss3Alt, color: '#563d7c' },
  tsql: { icon: PiFileSqlBold, color: '#e38c00' },
  dart: { icon: SiDart, color: '#00B4AB' },
  cmake: { icon: SiCmake, color: '#064F8C' },
  swift: { icon: SiSwift, color: '#F05138' },
  dockerfile: { icon: FaDocker, color: '#2496ED' },
  kotlin: { icon: SiKotlin, color: '#7F52FF' },
  scss: { icon: SiSass, color: '#CD6799' },
};
