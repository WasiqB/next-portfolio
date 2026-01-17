import Image from 'next/image';
import { getImage } from '@/lib/image-utils';
import type { Media } from '@/payload/types';

interface ImageBoxProps {
  media?: Media | null;
  imageUrl?: string | null;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  imageClassName?: string;
  priority?: boolean;
}

export const ImageBox = async (props: ImageBoxProps) => {
  const { media, imageUrl, fill, imageClassName, sizes, alt: altProp, priority } = props;

  let width: number | undefined;
  let height: number | undefined;
  let objectPosition: string | undefined;
  let blurhash: string | undefined;
  let placeholder: 'blur' | 'empty' = 'empty';
  let url: string | undefined;
  let alt: string = altProp || 'Image';

  if (media) {
    const { width: imageWidth, height: imageHeight } = media;

    width = imageWidth ?? undefined;
    height = imageHeight ?? undefined;

    objectPosition = media.focalX != null && media.focalY != null ? `${media.focalX}% ${media.focalY}%` : 'center';

    blurhash = media.blurhash ?? undefined;
    placeholder = media.blurhash ? 'blur' : 'empty';
    url = media.url ?? undefined;
    alt = altProp || media.alt || 'Image';
  } else if (imageUrl) {
    try {
      const { base64, img } = await getImage(imageUrl);
      url = img.src;
      blurhash = base64;
      width = img.width;
      height = img.height;
      placeholder = base64 ? 'blur' : 'empty';
    } catch (error) {
      console.error('Error loading image with getImage:', error);
      url = imageUrl;
    }
  }

  if (!url) {
    return null;
  }

  const shouldFill = fill || !width || !height;

  return (
    <Image
      src={url}
      alt={alt}
      quality={75}
      fill={shouldFill}
      width={!shouldFill ? width : undefined}
      height={!shouldFill ? height : undefined}
      className={imageClassName}
      sizes={sizes}
      priority={priority}
      style={{
        objectFit: 'cover',
        objectPosition,
      }}
      placeholder={placeholder}
      blurDataURL={blurhash}
    />
  );
};
