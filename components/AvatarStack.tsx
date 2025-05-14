'use client';
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const avatars = [
  '/images/profile/1.JPG',
  '/images/profile/2.JPG',
  '/images/profile/3.JPG',
  '/images/profile/4.JPG',
  '/images/profile/5.JPG',
  '/images/profile/6.JPG',
  '/images/profile/7.JPG',
];

export default function AvatarStack() {
  const [images, setImages] = useState(avatars);

  const handleDragEnd = () => {
    const updated = [...images.slice(1), images[0]];
    setImages(updated);
  };

  return (
    <div className="relative w-[120px] h-[120px]">
      {images.map((src, idx) => {
        const isTop = idx === 0;
        const z = images.length - idx;

        if (isTop) {
          return (
            <DraggableImage
              key={src}
              src={src}
              onDragEnd={handleDragEnd}
              zIndex={z}
            />
          );
        }

        // Càng về sau thì xòe ra xa hơn + xoay nhẹ
        const offsetX = idx * 8;
        const offsetY = idx * 4;
        const rotate = idx * 3;

        return (
          <motion.img
            key={src}
            src={src}
            initial={{ scale: 0.95 }}
            animate={{
              x: offsetX,
              y: offsetY,
              rotate,
              scale: 0.95,
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 w-full h-full rounded-lg object-cover pointer-events-none shadow-md"
            style={{ zIndex: z }}
          />
        );
      })}
    </div>
  );
}

function DraggableImage({
  src,
  onDragEnd,
  zIndex,
}: {
  src: string;
  onDragEnd: () => void;
  zIndex: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-10, 10], [15, -15]);
  const rotateY = useTransform(x, [-10, 10], [-15, 15]);

  return (
    <motion.img
      src={src}
      drag
      dragElastic={0.5}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 30 || Math.abs(info.offset.y) > 30) {
          onDragEnd();
        }
      }}
      className="absolute top-0 left-0 w-full h-full rounded-lg object-cover cursor-grab shadow-lg"
      style={{
        x,
        y,
        rotateX,
        rotateY,
        zIndex,
        transformPerspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    />
  );
}