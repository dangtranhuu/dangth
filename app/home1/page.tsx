'use client';
import Image from "next/image";
import React from 'react';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const items = document.querySelectorAll('.item');

    items.forEach((item) => {
      const title = item.querySelector('.title') as HTMLElement;
      const details = item.querySelector('.details') as HTMLElement;
      const icon = item.querySelector('.icon-wrap svg') as HTMLElement;

      if (title && details && icon) {
        title.addEventListener('click', () => {
          icon.classList.toggle('rotate');
          details.classList.toggle('show');
        });
      }
    });

    return () => {
      // Cleanup listeners when component unmounts
      items.forEach((item) => {
        const title = item.querySelector('.title') as HTMLElement;
        const details = item.querySelector('.details') as HTMLElement;
        const icon = item.querySelector('.icon-wrap svg') as HTMLElement;

        if (title && details && icon) {
          title.replaceWith(title.cloneNode(true));
        }
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
                  <i className="fa-brands fa-github"></i>
                </button>
              </a>
              <a href="https://leetcode.com/tranhuudang" target="_blank">
                <button>
                  <svg id="leetcode" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                    <title>LeetCode icon</title>
                    <path d="M16.102 17.93l-2.697 2.607c-..." />
                  </svg>
                </button>
              </a>
              <a href="https://www.hackerrank.com/tranhuudang" target="_blank">
                <button>
                  <svg id="hackerrank" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0c1.714 0 13 6.516..." />
                  </svg>
                </button>
              </a>
            </div>

            <div className="wrap">
              <a target="_blank" href="https://www.linkedin.com/in/tranhuudang">
                <button>
                  <i className="fa-brands fa-linkedin-in" id="linkedin"></i>
                </button>
              </a>
              <a href="https://www.youtube.com/@froggydev" target="_blank">
                <button>
                  <i className="fa-brands fa-youtube" id="youtube"></i>
                </button>
              </a>
              <a target="_blank" href="https://www.facebook.com/dangdeveloper/">
                <button>
                  <i className="fa-brands fa-facebook" id="facebook"></i>
                </button>
              </a>
              <a href="https://www.tiktok.com/@theanishtar" target="_blank" rel="noopener noreferrer">
                <button>
                  <i className="fa-brands fa-tiktok" id="tiktok"></i>
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
        <p>Hi, I&apos;m Tran Huu Dang. You can call me Davis.</p>
        <p>
          I like technology and other work with computers. I am a developer in the back-end website fields
          (NodeJS and Spring Boot)
        </p>
        <p>
          I also have knowledge of Angular, VueJS, TailwindCSS, JavaSwing. I understand tools like Git, Postman, Debug...
        </p>
        <p style={{ paddingRight: '30px' }}>
          Connect with my Linkedin to discuss about work or my Github to share interesting knowledge ^^
        </p>
      </div>

      {/* EXPERIENCE section */}
      <div className="experience title section">
        <h1>Experience</h1>
        {[1, 4].map((_, idx) => (
          <div className="item" key={idx}>
            <div className="title">
              <div className="left col">
                <div className="left">
                  <img className="logo" src="/assets/images/exp/fpoly.jpg" alt="fpoly" />
                </div>
                <div className="right">
                  <div className="top">
                    Davlands
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
                  <div className="bot">Fullstack developer</div>
                </div>
              </div>
              <div className="right">2021–2023</div>
            </div>
            <div className="details">
              <p>
                Built and maintained web applications for internal company systems. Collaborated with frontend and backend teams to ensure scalable architecture and responsive UI/UX.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EDUCATION section */}
      <div className="education title section">
        <h1>Education</h1>
        {[1, 2].map((_, idx) => (
          <div className="item" key={idx}>
            <div className="title">
              <div className="left col">
                <div className="left">
                  <img className="logo" src="/assets/images/education/ctu.png" alt="ctu" />
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
                Studied fundamental and advanced courses in software development, including algorithms, data structures, databases, and web programming.
              </p>
            </div>
          </div>
        ))}
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
    </div>
  );
}
