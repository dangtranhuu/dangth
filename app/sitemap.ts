export default function sitemap() {
  const baseUrl = "https://dangth.dev";

  return [
    // Static pages
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cert`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tutorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/post`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Posts from existing RSS (you gave me this list)
    {
      url: `${baseUrl}/post/2023-10-20-greedy-algorithm`,
      lastModified: new Date("2023-10-20"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/post/2023-10-20-auth-jwt-nodejs`,
      lastModified: new Date("2023-10-20"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/post/2023-12-22-limit-requests-per-ip`,
      lastModified: new Date("2023-12-22"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/post/2023-09-03-session-cookie-authentication`,
      lastModified: new Date("2023-09-03"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/post/2023-10-27-jwt-springboot`,
      lastModified: new Date("2023-10-27"),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
