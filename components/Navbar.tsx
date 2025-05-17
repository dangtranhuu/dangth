'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { FaUser, FaCertificate } from 'react-icons/fa';
import { GiMagicPortal, GiEvilBook } from 'react-icons/gi';
import { Projects } from './icons';
import useDarkMode from '@/hooks/useDarkMode';

export default function Navbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isDark, toggleDarkMode } = useDarkMode();

  const handleNavClick = (href: string) => {
    if (pathname === href) return;
    setActiveNav(href);
    router.push(`/${locale}${href}`);
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
    }, 100);
  };

  useEffect(() => {
    setActiveNav(null);
  }, [pathname]);

  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    const dark = saved === 'dark';

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
        // Scroll xuống → trượt rồi ẩn
        nav.classList.add('translate-y-[150%]');

        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
          nav.classList.add('hidden');
        }, 300); // đúng thời gian transition
      } else {
        // Scroll lên → hiện lại và trượt vào
        if (hideTimeout) clearTimeout(hideTimeout);
        nav.classList.remove('hidden');

        // Delay nhỏ để browser render lại trước khi remove translate
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
        className="inline-flex gap-2 items-center bg-[#FFFFFF] dark:bg-[#404B5D] px-4 py-2 rounded-2xl border border-[#e4e4e4] dark:border-[##5a5a5a] shadow-lg transition-all duration-300"
        ref={navRef}
      >

        {navItems.map(({ label, href, icon }) => (
          <div className="nav-item relative" key={href}>
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-100 text-gray-700 text-xs rounded px-2 py-1 border border-gray-400 whitespace-nowrap">
              {label}
            </span>
            <a
              onClick={() => handleNavClick(href)}
              className="group w-11 h-11 rounded-xl bg-[#EAEAEA] text-[#9A9A9A] dark:bg-[#4A5363] dark:text-[#9A9A9A] flex items-center justify-center transition-all ease-out duration-300 relative hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2 cursor-pointer"
            >
              {activeNav === href ? (
                <i className="fa-solid fa-spinner fa-spin" />
              ) : (
                icon
              )}
            </a>
          </div>
        ))}

        <div className="nav-item" id="mode">
          <a
            onClick={handleToggleTheme}
            className="group w-11 h-11 rounded-xl bg-[#EAEAEA] text-[#9A9A9A] dark:bg-[#4A5363] dark:text-[#9A9A9A] flex items-center justify-center transition-all ease-out duration-300 relative hover:scale-150 hover:mt-[-18px] hover:z-10 hover:mx-2 cursor-pointer"
          >
            <i
              className={`fa-solid ${isLoading ? 'fa-spinner fa-spin' : isDark ? 'fa-moon' : 'fa-sun'}`}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
