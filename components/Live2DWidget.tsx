'use client';
import { useEffect } from 'react';

export default function Live2DWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
    script.async = true;

    script.onload = () => {
      // @ts-expect-error: third-party library doesn't have types
      window.L2Dwidget?.init({
        model: {
          jsonPath: '/models/histoire/model.json',
        },
        display: {
          position: 'right',
          width: 180,
          height: 300,
        },
        mobile: {
          show: true,
        },
        react: {
          opacityDefault: 0.8,
          opacityOnHover: 0.2,
        },
      });

      // Đợi DOM render bằng polling (cực kỳ chắc ăn)
      const waitForWidget = () => {
        const el = document.querySelector('#live2d-widget') as HTMLElement;
        if (!el) {
          requestAnimationFrame(waitForWidget); // thử lại frame tiếp theo
          return;
        }

        // Gắn base style
        Object.assign(el.style, {
          position: 'fixed',
          right: '0px',
          bottom: '-20px',
          transition: 'bottom 0.3s ease-in-out',
          zIndex: '9999',
          pointerEvents: 'none', // tránh chặn click ở menu
        });

        // Logic scroll
        let lastScrollTop = 0;

        const handleScroll = () => {
          const currentScrollTop = window.scrollY;

          if (currentScrollTop < lastScrollTop) {
            el.style.bottom = '20px'; // scroll lên
          } else {
            el.style.bottom = '-20px'; // scroll xuống
          }

          lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        };

        window.addEventListener('scroll', handleScroll);

        // Optional: Cleanup
        // return () => window.removeEventListener('scroll', handleScroll);
      };

      waitForWidget();
    };

    document.body.appendChild(script);
  }, []);

  return null;
}
