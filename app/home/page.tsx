'use client';
import React, { useEffect } from 'react';
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { TbBrandHackerrank } from "react-icons/tb";
import { LuLinkedin } from "react-icons/lu";
import { FiYoutube } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { TbBrandTiktok } from "react-icons/tb";

export default function Home() {
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
    <div className='container'>
      <div className="head item">
        <div className="left">
          <div className="bounce_auto">
            <img src="/images/avt.png" id="avt" alt="" className="bounce" />
          </div>
          <h1 id="uname">
            Tran Huu Dang <span id="subname"></span>
          </h1>
          <p id="desc">Java Developer</p>

          <div className="contact">
            <div className="wrap">
              <a target="_blank" href="https://github.com/theanishtar">
                <button>
                  <FiGithub />
                </button>
              </a>
              <a href="https://leetcode.com/tranhuudang" target="_blank">
                <button>
                  <SiLeetcode />
                </button>
              </a>
              <a href="https://www.hackerrank.com/tranhuudang" target="_blank">
                <button>
                  <TbBrandHackerrank />
                </button>
              </a>
            </div>

            <div className="wrap">
              <a target="_blank" href="https://www.linkedin.com/in/tranhuudang">
                <button>
                  <LuLinkedin />
                </button>
              </a>
              <a href="https://www.youtube.com/@froggydev" target="_blank">
                <button>
                  <FiYoutube />
                </button>
              </a>
              <a target="_blank" href="https://www.facebook.com/dangdeveloper/">
                <button>
                  <LuFacebook />
                </button>
              </a>
              <a href="https://www.tiktok.com/@theanishtar" target="_blank" rel="noopener noreferrer">
                <button>
                  <TbBrandTiktok />
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="right bounce_auto">
          <img id="avatar" src="/images/avt.png" alt="" className="bounce" />
        </div>
      </div>

      {/* About */}
      <div className="about item">
        <p>
          I&rsquo;m a fullstack developer with a strong interest in building web applications that are both functional and user-friendly. My experience spans frontend and backend technologies, including Angular, Spring Boot, NodeJS, and modern cloud services like AWS and Firebase.
        </p>
        <p>
          I&rsquo;ve led and contributed to several real-world projects such as a social media platform (DESTINY), an online movie ticket booking system (DAVITICKETS), and a retail management app (DAVISY). I&apos;ve also worked across different roles — from backend lead to WordPress developer — gaining a solid understanding of both product and team workflows.
        </p>
        <p style={{ paddingRight: '30px' }}>
          Connect with my Linkedin to discuss about work or my Github to share interesting knowledge ^^
        </p>
      </div>

      {/* EXPERIENCE section */}
      <div className="experience title section">
        <h1>Experience</h1>
        <div className="item">
          <div className="title">
            <div className="left col">
              <div className="left">
                <img className="logo" src="/images/exp/devlands.jpg" alt="devlands" />
              </div>
              <div className="right">
                <div className="top">
                  Devlands
                  <span className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-black inline transform transition-transform duration-200"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    </svg>
                  </span>
                </div>
                <div className="bot">Designer & Content creator</div>
              </div>
            </div>
            <div className="right">2021–2023</div>
          </div>
          <div className="details">
            <p>
              Devlands is a personal brand project designed as a social learning platform for aspiring developers. It combines educational content with community interaction, offering tutorials, coding challenges, and collaborative features to facilitate programming education in an engaging environment.
            </p>
          </div>
        </div>
      </div>

      {/* EDUCATION section */}
      <div className="education title section">
        <h1>Education</h1>
        <div className="item">
          <div className="title">
            <div className="left col">
              <div className="left">
                <img className="logo" src="/images/education/ctu.png" alt="ctu" />
              </div>
              <div className="right">
                <div className="top">
                  Can Tho University
                  <span className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-black inline transform transition-transform duration-200"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    </svg>
                  </span>
                </div>
                <div className="bot">Information Technology</div>
              </div>
            </div>
            <div className="right times">Sep 2021 – Jan 2024</div>
          </div>
          <div className="details">
            <p>
              Studied Information Technology at Can Tho University, focusing on programming, databases, and software development.
            </p>
          </div>
        </div>

        <div className="item">
          <div className="title">
            <div className="left col">
              <div className="left">
                <img className="logo" src="/images/education/fpoly.jpg" alt="fpl" />
              </div>
              <div className="right">
                <div className="top">
                  FPT Polytechnic
                  <span className="icon-wrap">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-black inline transform transition-transform duration-200"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
                    </svg>
                  </span>
                </div>
                <div className="bot">Software development</div>
              </div>
            </div>
            <div className="right times">Sep 2021 – Jan 2024</div>
          </div>
          <div className="details">
            <p>
              Studied Software Development at FPT Polytechnic, with experience as a teaching assistant supporting student learning.
            </p>
          </div>
        </div>
      </div>

      {/* PROJECTS section */}
      <div className="project title section">
        <h1>Projects</h1>

        <div className="head">
          <div className="container">
            <div className="tabs">
              <input type="radio" id="radio-1" name="tabs" defaultChecked />
              <label className="tab" htmlFor="radio-1">
                Website<span className="notification">2</span>
              </label>
              <input type="radio" id="radio-2" name="tabs" />
              <label className="tab" htmlFor="radio-2">Desktop</label>
              <input type="radio" id="radio-3" name="tabs" />
              <label className="tab" htmlFor="radio-3">Mobile</label>
              <span className="glider"></span>
            </div>
          </div>
        </div>

        <div className="body">
          {[0, 1].map((rowIdx) => (
            <div className="row" key={rowIdx}>
              {[0, 1].map((colIdx) => (
                <div className="card" key={colIdx}>
                  <img
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    alt="Project image"
                    className="card-img"
                  />
                  <div className="card-content">
                    <h2 className="card-title">Todowy</h2>
                    <p className="card-year">2024 – 2025</p>
                    <p className="card-description">
                      Designed and developed a custom to-do list website that helps organize tasks, set priorities, and boost productivity.
                    </p>
                    <div className="tags">
                      <span>React</span>
                      <span>TypeScript</span>
                      <span>Tailwind</span>
                    </div>
                    <div className="buttons">
                      <a href="#">🌐 Website</a>
                      <a href="#">🔗 Source</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* CERTIFICATIONS section */}
      <div className="cert title section">
        <h1>Certifications</h1>
        <div className="body">
          <div className="cert-container">
            {[
              { img: 'udemy.png', title: 'Master Microservices with Spring Boot & Spring Cloud', org: 'Udemy', date: '02/08/2024' },
              { img: 'aws-cloudfoundations.png', title: 'AWS Academy Cloud Foundations', org: 'AWS', date: '03/07/2022' },
              { img: 'datacamp/statement-of-accomplishment.png', title: 'Intermediate SQL Queries', org: 'Data Camp', date: 'APR 15, 2022' },
              // { img: 'programing_hub.png', title: 'Cybersecurity', org: 'Certiport', date: '20/06/2023' },
              // { img: 'mos-ppt-2016.png', title: 'MOS PowerPoint 2016', org: 'Certiport', date: '03/07/2022' }
            ].map((cert, idx) => (
              <div className="cert" key={idx}>
                <img src={`/images/cert/${cert.img}`} alt={cert.title} />
                <div className="cert-title">{cert.title}</div>
                <div className="cert-org">{cert.org}</div>
                <div className="cert-date">Issued {cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}
