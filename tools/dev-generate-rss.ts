import { generateRssFeed } from '../lib/core/generateRssFeed';

generateRssFeed().then(() => console.log('✅ Local RSS generated'));
