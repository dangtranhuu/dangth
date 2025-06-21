export function enableImageZoom() {
  if (typeof window === 'undefined') return;

  const bindZoom = () => {
    const images = document.querySelectorAll('.zoom-img');
    images.forEach((img) => {
      if ((img as HTMLElement).dataset.zoomBound) return;
      (img as HTMLElement).dataset.zoomBound = 'true';

      img.addEventListener('click', () => {
        const rect = img.getBoundingClientRect();
        const wrapper = document.createElement('div');
        wrapper.className = 'zoom-wrapper';

        const clone = img.cloneNode(true) as HTMLImageElement;
        clone.classList.add('zoom-clone');

        wrapper.appendChild(clone);
        document.body.appendChild(wrapper);

        clone.classList.add('zoom-clone');
        clone.style.top = `${rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        document.body.appendChild(clone);

        // Thêm class vào overlay
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        document.body.appendChild(overlay);

        // Apply initial styles
        wrapper.style.position = 'fixed';
        wrapper.style.top = `${rect.top}px`;
        wrapper.style.left = `${rect.left}px`;
        wrapper.style.width = `${rect.width}px`;
        wrapper.style.height = `${rect.height}px`;
        wrapper.style.zIndex = '1000';
        wrapper.style.transition = 'all 0.3s ease';

        clone.style.width = '100%';
        clone.style.height = '100%';
        clone.style.objectFit = 'contain';
        clone.style.cursor = 'zoom-out';

        // Animate to center
        requestAnimationFrame(() => {
          wrapper.style.top = '50%';
          wrapper.style.left = '50%';
          wrapper.style.width = '90vw';
          wrapper.style.height = 'auto';
          wrapper.style.transform = 'translate(-50%, -50%)';
        });

        const closeZoom = () => {
          wrapper.style.transition = 'all 0.3s ease';
          wrapper.style.top = `${rect.top}px`;
          wrapper.style.left = `${rect.left}px`;
          wrapper.style.width = `${rect.width}px`;
          wrapper.style.height = `${rect.height}px`;
          wrapper.style.transform = `none`;

          overlay.remove();

          setTimeout(() => {
            wrapper.remove();
          }, 300);
        };

        clone.addEventListener('click', closeZoom);
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closeZoom();
        }, { once: true });
      });
    });
  };

  // Initial bind
  bindZoom();

  // Observe DOM for dynamically added images
  const observer = new MutationObserver(bindZoom);
  observer.observe(document.body, { childList: true, subtree: true });
}
