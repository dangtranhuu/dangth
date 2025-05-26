'use client';

import React from 'react';

export default function CertPage() {
  const data = [
    {
      org: 'AWS Accademy',
      logo: '/images/cert/aws-accademy/aws-accademy-badge.png',
      certs: [
        { name: 'AWS Academy Cloud Foundations', image: '/images/cert/aws-accademy/AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20231130-29-1bi8im_page-0001.jpg' },
      ],
    }, {
      org: 'Udemy',
      logo: '/images/cert/udemy/udemy.png',
      certs: [
        { name: 'AWS Cert Cloud Practitioner (CLF-02)', image: '/images/cert/udemy/UC-4ba3d7fe-8025-406a-8605-df6657c1554d_page-0001.jpg' },
        { name: 'Master Microservices with Spring Boot & Spring Cloud', image: '/images/cert/udemy/UC-5c93db49-f535-430e-bc1c-b8170277cf5c_page-0001.jpg' },
        { name: 'AWS Cloud Practitioner Journey', image: '/images/cert/udemy/UC-9c1f9d11-56e1-4892-91fb-b2ec21873e71_page-0001.jpg' },
        { name: 'Master Java Web Services & RESTAPI with Spring Boot', image: '/images/cert/udemy/UC-e051a1c4-9e19-46a4-a941-7fd0aa660d3d_page-0001.jpg' },
      ],
    },
    {
      org: 'Data Camp',
      logo: '/images/cert/datacamp/datacamp-logo-freelogovectors.net_.png',
      certs: [
        { name: 'Intermediate SQL Queries', image: '/images/cert/datacamp/Intermediate SQL Queries.png' },
      ],
    },
    {
      org: 'FreeCodeCamp',
      logo: '/images/cert/freecodecamp/freecodecamp-icon.png',
      certs: [
        { name: 'Data Analysis with Python', image: '/images/cert/freecodecamp/Data Analysis with Python.jpg' },
        { name: 'Machine Learning with Python', image: '/images/cert/freecodecamp/Machine Learning with Python.PNG' },
        { name: 'Seientific Computing with Python', image: '/images/cert/freecodecamp/Seientific Computing with Python.jpg' },
      ],
    },
    {
      org: 'Great Learning',
      logo: '/images/cert/greatlearning/wpmuQ3EaRHeEFgOMOaJQ_convert.png',
      certs: [
        { name: 'GitHub Tutorial', image: '/images/cert/greatlearning/GitHub Tutorial for Beginners.png' },
      ],
    },
    {
      org: 'Data Quest',
      logo: '/images/cert/dataquest/dataquest.png',
      certs: [
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Combining-Tables-in-SQL.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Dictionaries,-Frequency-Tables,-and-Functions-in-Python (1).png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Filtering-and-Sorting-Data-in-SQL.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Introduction-to-SQL-and-Databases.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Python-Functions-and-Learn-Jupyter-Notebook.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--SQL-Fundamentals.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--SQL-Subqueries.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Summarizing-Data-in-SQL.png' },
        { name: '', image: '/images/cert/dataquest/Tran-Huu-Dang--Variables,-Data-Types,-and-Lists-in-Python (1).png' },
      ],
    },
    {
      org: 'Simpli Learn',
      logo: '/images/cert/simplilearn/100.jpg',
      certs: [
        { name: 'C++', image: '/images/cert/simplilearn/Git Training_page-0001.jpg' },
      ],
    }, {
      org: 'Solo Learn',
      logo: '/images/cert/sololearn/1_hsdk74SBj4i_UfX8SaW6YA.png',
      certs: [
        { name: 'C', image: '/images/cert/sololearn/C.png' },
        { name: 'CSS', image: '/images/cert/sololearn/css.png' },
        { name: 'HTML', image: '/images/cert/sololearn/HTML.png' },
        { name: 'Java', image: '/images/cert/sololearn/Java.png' },
        { name: 'javaScript', image: '/images/cert/sololearn/javaScript.png' },
        { name: 'Python', image: '/images/cert/sololearn/Python.png' },
      ],
    },
    {
      org: 'Programing Hub',
      logo: '/images/cert/programinghub/logo.png',
      certs: [
        { name: 'C++', image: '/images/cert/programinghub/C++.png' },
        { name: 'CSS', image: '/images/cert/programinghub/CSS.png' },
        { name: 'Data Science', image: '/images/cert/programinghub/Data Science.png' },
        { name: 'HTML', image: '/images/cert/programinghub/HTML.png' },
        { name: 'IT Basics', image: '/images/cert/programinghub/IT Basics.png' },
        { name: 'JavaProgramming', image: '/images/cert/programinghub/JavaProgramming.png' },
      ],
    },
    {
      org: 'Codelearn.io',
      logo: '/images/cert/codelearn/codelearn.png',
      certs: [
        { name: 'Computer Software', image: '/images/cert/codelearn/CodeLearn_certification.png' },
        { name: 'Computer Hardware', image: '/images/cert/codelearn/CodeLearn_certification (1).png' },
        { name: 'CPP', image: '/images/cert/codelearn/CodeLearn_certification (2).png' },
        { name: 'JAVA', image: '/images/cert/codelearn/CodeLearn_certification (3).png' },
        { name: 'Basic Algorithms', image: '/images/cert/codelearn/CodeLearn_certification (4).png' },
      ],
    },
  ];

  return (
    <div className="certifications px-5 py-10 text-[#333] max-w-[1100px] mx-auto">
      <h1 className="text-[32px] font-semibold mb-4 text-gray-900 dark:text-[#E5E7EB]">Certifications</h1>

      <div className="flex flex-col gap-10">
        {data.map(({ org, certs, logo }) => (
          <div className="p-5" key={org}>
            <div className="flex items-center gap-4 mb-5">
              <img
                src={logo}
                alt={`${org} logo`}
                className="w-[60px] h-[60px] object-contain rounded-lg shrink-0 zoom-img"
              />
              <div className="text-[20px] font-semibold text-[#34495e] h-[60px] flex items-center dark:text-[#E5E7EB]">{org}</div>
            </div>

            <div className="flex flex-wrap gap-6 justify-start sm:justify-start">
              {certs.map((cert, index) => (
                <div
                  className="flex flex-col items-center w-[180px] p-3 rounded-[10px] transition-transform duration-200 hover:scale-[1.03] dark:text-[#E5E7EB]"
                  key={cert.name || `untitled-${index}`}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    width={160}
                    height={100}
                    className="rounded-lg object-cover w-[160px] h-auto zoom-img transition-transform duration-300 hover:scale-[1.05]"
                  />
                  <div className="mt-2 text-sm text-center text-[#555] dark:text-[#E5E7EB]">
                    {cert.name || <em>Untitled</em>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
