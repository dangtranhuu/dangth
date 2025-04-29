import Home from "./home/page"
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing'; // Import routing bạn define

export default function Root({ params: { locale } }: { params: { locale: any } }) {
  if (!routing.locales.includes(locale)) {
    notFound(); // ⚡ trigger chuẩn nextjs, tự render not-found.tsx
  }
  return (
    <div>
      <Home />
    </div>
  );
}
