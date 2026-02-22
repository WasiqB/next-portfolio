import Image from 'next/image';
import { getImage } from '@/lib/image-utils';

interface ImageBoxProps {
  imageUrl?: string | null;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  imageClassName?: string;
  priority?: boolean;
}

export const ImageBox = async (props: ImageBoxProps) => {
  const { imageUrl, fill, imageClassName, sizes, alt: altProp, priority } = props;

  let width: number | undefined;
  let height: number | undefined;
  let objectPosition: string | undefined;
  let blurhash: string | undefined;
  let placeholder: 'blur' | 'empty' = 'empty';
  let url: string | undefined;
  const alt: string = altProp || 'Image';

  if (imageUrl) {
    try {
      const { base64, img } = await getImage(imageUrl);
      url = img.url;
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
