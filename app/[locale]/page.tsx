import Home from "./home/page"
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { type Locale } from '@/i18n/routing';

export default function Root({ params: { locale } }: { params: { locale: Locale } }) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  return (
    <div>
      <Home />
    </div>
  );
}
