'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from "next-intl";
import { FaUser, FaCertificate } from 'react-icons/fa';
import { GiMagicPortal } from "react-icons/gi";
import { ImBlog } from "react-icons/im"
import { Projects } from './icons'


export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [activeNav, setActiveNav] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);

  // MODE
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavClick = (href: string) => {
    // const locale = useLocale();
    if (pathname === href) return; // Nếu đang ở đúng route → không làm gì cả

    setActiveNav(href); // đánh dấu nav đang được click

    // router.push(href);
    router.push(`/${locale}${href}`);

    // Delay để cho animation hovered có thời gian chạy
    setTimeout(() => {
      const navItems = document.querySelectorAll('.nav-item a');
      navItems.forEach(item => item.classList.remove('hovered'));
    }, 300); // 300ms là thời gian đủ để thấy hiệu ứng phình to
  };



  const toggleTheme = () => {
    setIsLoading(true);

    setTimeout(() => {
      const nextDark = !isDark;
      setIsDark(nextDark);
      document.body.classList.toggle('dark-mode', nextDark);
      localStorage.setItem("modeByThean", nextDark ? "dark" : "light");
      document.getElementById('comments')?.setAttribute('theme', nextDark ? 'transparent_dark' : 'light')
      setIsLoading(false);
    }, 600);
  }


  useEffect(() => {
    setActiveNav(null); // tắt trạng thái loading khi route xong
  }, [pathname]);


  useEffect(() => {
    const saved = localStorage.getItem("modeByThean");
    const dark = saved === "dark";

    setIsDark(dark);
    document.body.classList.toggle('dark-mode', dark);

    // Check if navRef.current is available before continuing
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll('.nav-item a');
    const mouseEvents: { item: Element; enter: () => void; leave: () => void }[] = [];

    items.forEach((item) => {
      const enter = () => item.classList.add('hovered');
      const leave = () => item.classList.remove('hovered');

      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);

      mouseEvents.push({ item, enter, leave });
    });

    let lastScrollTop = 0;

    const handleScroll = () => {
      if (!navRef.current) return;

      const currentScrollTop = window.scrollY;

      if (currentScrollTop > 0) {
        navRef.current.classList.add('h-shadow');
      } else {
        navRef.current.classList.remove('h-shadow');
      }

      if (currentScrollTop > lastScrollTop) {
        navRef.current.classList.add('hidden');
      } else {
        navRef.current.classList.remove('hidden');
      }

      lastScrollTop = Math.max(currentScrollTop, 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      // Cleanup: Remove event listeners for hover effects
      mouseEvents.forEach(({ item, enter, leave }) => {
        if (item) {
          item.removeEventListener('mouseenter', enter);
          item.removeEventListener('mouseleave', leave);
        }
      });
    };
  }, []);


  return (
    <div className="menu">
      <div className="bottom-nav-wrapper">
        <div className="bottom-nav" id="bottomNav" ref={navRef}>
          {/* 👤 Cá nhân */}
          <div className="nav-item">
            <span>Home</span>
            <a onClick={() => handleNavClick('/')}>
              {activeNav === '/' ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <FaUser />
              )}
            </a>
          </div>

          <div className="nav-item">
            <span>Projects</span>
            <a onClick={() => handleNavClick('/project')}>
              {activeNav === '/project' ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <Projects />
              )}
            </a>
          </div>

          <div className="nav-item">
            <span>Cert</span>
            <a onClick={() => handleNavClick('/cert')}>
              {activeNav === '/cert' ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <FaCertificate />
              )}
            </a>
          </div>

          <div className="nav-item">
            <span>Blog</span>
            <a onClick={() => handleNavClick('/blog')}>
              {activeNav === '/blog' ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <ImBlog />
              )}
            </a>
          </div>

          <div className="nav-item">
            <span>Posts</span>
            <a onClick={() => handleNavClick('/post')}>
              {activeNav === '/post' ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                <GiMagicPortal />
              )}
            </a>
          </div>

          {/* 
          <div className="nav-item">
            <Link href="#"><FaEnvelope /></Link>
          </div>

          🌐 Social Dev
          <div className="nav-item">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
          <div className="nav-item">
            <a href="https://gitlab.com/" target="_blank" rel="noreferrer">
              <FaGitlab />
            </a>
          </div>
          <div className="nav-item">
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
          <div className="nav-item">
            <a href="https://stackoverflow.com/" target="_blank" rel="noreferrer">
              <FaStackOverflow />
            </a>
          </div> */}

          {/* 🌙 Theme toggle */}
          <div className="nav-item">
            <a onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              <i
                className={`fa-solid sun-moon ${isLoading ? 'fa-spinner fa-spin' : isDark ? 'fa-moon' : 'fa-sun'
                  }`}
              ></i>
            </a>
          </div>

          {/* <div className="nav-item">
            <a>
              <i className="fa-solid fa-sun sun-moon" onclick="changesIcon(this)"> </i>
              <div className="spinner" style={{ display: none; }}></div>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}
