'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { FaUser, FaCertificate, FaSun, FaMoon, FaSpinner } from 'react-icons/fa';
import { GiMagicPortal, GiEvilBook } from 'react-icons/gi';
import { Projects } from './icons';

import useDarkMode from '@/hooks/useDarkMode';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isDark, toggleDarkMode } = useDarkMode();

  const handleNavClick = (href: string) => {
    if (pathname === href) return;
    setActiveNav(href);
    router.push(href);

    setTimeout(() => {
      const navItems = document.querySelectorAll('.nav-item a');
      navItems.forEach(item => item.classList.remove('hovered'));
    }, 300);
  };

  const handleToggleTheme = () => {
    setIsLoading(true);
    setTimeout(() => {
      toggleDarkMode();
      setIsLoading(false);
    }, 120);
  };

  useEffect(() => {
    setActiveNav(null);
  }, [pathname]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const items = nav.querySelectorAll('.nav-item a');
    const mouseEvents: { item: Element; enter: () => void; leave: () => void }[] = [];

    items.forEach(item => {
      const enter = () => item.classList.add('hovered');
      const leave = () => item.classList.remove('hovered');
      item.addEventListener('mouseenter', enter);
      item.addEventListener('mouseleave', leave);
      mouseEvents.push({ item, enter, leave });
    });

    let lastScrollTop = 0;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        // Scroll xuống → trượt xuống rồi ẩn
        nav.classList.add('translate-y-[150%]');

        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          nav.classList.add('hidden');
        }, 300);
      } else {
        // Scroll lên → hiện lại
        if (hideTimeout) clearTimeout(hideTimeout);
        nav.classList.remove('hidden');

        requestAnimationFrame(() => {
          nav.classList.remove('translate-y-[150%]');
        });
      }

      lastScrollTop = Math.max(currentScrollTop, 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mouseEvents.forEach(({ item, enter, leave }) => {
        item.removeEventListener('mouseenter', enter);
        item.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: <FaUser /> },
    { label: 'Projects', href: '/project', icon: <Projects /> },
    { label: 'Certs', href: '/cert', icon: <FaCertificate /> },
    { label: 'Tutorials', href: '/tutorial', icon: <GiEvilBook /> },
    { label: 'Posts', href: '/post', icon: <GiMagicPortal /> },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2 px-3">
      <div
        ref={navRef}
        className="inline-flex gap-2 items-center bg-[#FFFFFF] dark:bg-[#404B5D] px-4 py-2 rounded-2xl border border-[#e4e4e4] dark:border-[#5a5a5a] shadow-lg transition-all duration-300"
      >

        {/* NAV ITEMS */}
        {navItems.map(({ label, href, icon }) => (
          <div className="nav-item relative" key={href}>
            <a
              onClick={() => handleNavClick(href)}
              title={label}
              className="group w-11 h-11 rounded-xl bg-[#EAEAEA] text-[#9A9A9A] dark:bg-[#4A5363] dark:text-[#9A9A9A]
              flex items-center justify-center transition-all ease-out duration-300 
              hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2 cursor-pointer"
            >
              {activeNav === href ? (
                <FaSpinner className="animate-spin" />
              ) : (
                icon
              )}
            </a>
          </div>
        ))}

        {/* THEME TOGGLE */}
        <div className="nav-item" id="mode">
          <a
            onClick={handleToggleTheme}
            title="Toggle theme"
            className="group w-11 h-11 rounded-xl bg-[#EAEAEA] text-[#9A9A9A] dark:bg-[#4A5363] dark:text-[#9A9A9A]
            flex items-center justify-center transition-all ease-out duration-300 
            hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2 cursor-pointer"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isDark ? (
              <FaMoon />
            ) : (
              <FaSun />
            )}
          </a>
        </div>

      </div>
    </div>
  );
}
