// CHỈ DÙNG CHO GITHUB PAGE

'use client'; // Chỉ cần nếu bạn dùng App Router (app/), không cần với pages/

import React from 'react';
import { getAssetPath } from '../lib/getAssetPath';

type ImageSafeProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

const ImageSafe: React.FC<ImageSafeProps> = ({ src, alt, ...rest }) => {
  return <img src={getAssetPath(src)} alt={alt} {...rest} />;
};

export default ImageSafe;
