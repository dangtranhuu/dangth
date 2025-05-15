import { generateRssFeed } from '../lib/generateRssFeed';

generateRssFeed().then(() => console.log('✅ Local RSS generated'));
