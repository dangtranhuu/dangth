'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FaUser,
  FaCertificate,
  FaEnvelope,
  FaGithub,
  FaGitlab,
  FaLinkedinIn,
  FaStackOverflow,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { ImBlog } from "react-icons/im";
export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  // MODE
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setIsLoading(true);

    setTimeout(() => {
      const nextDark = !isDark;
      setIsDark(nextDark);
      document.body.classList.toggle('dark-mode', nextDark);
      localStorage.setItem("modeByThean", nextDark ? "dark" : "light");
      setIsLoading(false);
    }, 600);
  };

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
            <Link href="/"><FaUser /></Link>
          </div>

          <div className="nav-item">
            <span>Projects</span>
            <Link href="/project">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="400" height="200" viewBox="0 0 300 149.999998" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <clipPath id="e2a71f3491">
                    <path d="M 60.632812 8.613281 L 237.632812 8.613281 L 237.632812 142 L 60.632812 142 Z M 60.632812 8.613281 " clipRule="nonzero" />
                  </clipPath>
                </defs>
                <path fill="#9a9a9a" className="blinking" d="M 179.710938 122.058594 L 147.332031 122.058594 C 144.351562 122.058594 141.9375 119.644531 141.9375 116.671875 C 141.9375 113.699219 144.351562 111.285156 147.332031 111.285156 L 179.667969 111.285156 C 182.644531 111.285156 185.085938 113.699219 185.085938 116.671875 C 185.085938 119.644531 182.6875 122.058594 179.710938 122.058594 Z M 179.710938 122.058594 " fillOpacity="1" fillRule="nonzero" />
                <path fill="#9a9a9a" d="M 96.964844 125.648438 C 95.296875 125.648438 93.65625 124.878906 92.597656 123.421875 C 90.851562 121.015625 91.382812 117.648438 93.792969 115.902344 L 150.511719 74.777344 L 115.761719 37.769531 C 113.722656 35.601562 113.832031 32.199219 116.011719 30.160156 C 118.191406 28.121094 121.59375 28.234375 123.636719 30.402344 L 162.066406 71.328125 C 163.003906 72.328125 163.519531 73.648438 163.519531 75.011719 L 163.519531 75.925781 C 163.519531 77.648438 162.695312 79.273438 161.296875 80.277344 L 100.140625 124.613281 C 99.183594 125.308594 98.066406 125.648438 96.964844 125.648438 Z M 96.964844 125.648438 " fillOpacity="1" fillRule="nonzero" />
              </svg>
            </Link>
          </div>

          <div className="nav-item">
            <span>Cert</span>
            <Link href="/cert"><FaCertificate /></Link>
          </div>

          <div className="nav-item">
            <span>Cert</span>
            <Link href="/blog"><ImBlog /></Link>
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
