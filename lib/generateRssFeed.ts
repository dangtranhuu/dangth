import fs from 'fs';
import path from 'path';
import RSS from 'rss';
import { SITE_CONFIG } from './config'
import { getAllPostsMeta } from './markdown'; // hoặc đường dẫn đúng tới logic đọc bài viết của bạn

export async function generateRssFeed() {
  const siteUrl = SITE_CONFIG.url;

  const feed = new RSS({
    title: 'Dangth.dev',
    description: 'Personal blog by Dang Tran Huu',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Dang Tran Huu`,
  });

  const posts = await getAllPostsMeta();

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.subtitle || '',
      url: `${siteUrl}/post/${post.slug}`,
      date: post.date,
    });
  });

  const rss = feed.xml({ indent: true });
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rss);
}