/* eslint-disable @next/next/no-img-element -- /api/uploads images are served from MongoDB */
import Image, { type ImageProps } from 'next/image'
import { isApiUploadImage, resolveImageSrc } from '@/lib/image-url'

type CmsImageProps = Omit<ImageProps, 'src'> & {
  src: string | undefined | null
}

export default function CmsImage({ src, alt, className, fill, width, height, ...props }: CmsImageProps) {
  const resolved = resolveImageSrc(src)

  if (isApiUploadImage(resolved)) {
    if (fill) {
      return (
        <img
          src={resolved}
          alt={alt}
          className={className as string | undefined}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            // Tailwind object-* classes (e.g. object-contain for logos) win over the default crop
            ...(String(className || '').includes('object-') ? {} : { objectFit: 'cover' as const }),
          }}
        />
      )
    }
    return (
      <img
        src={resolved}
        alt={alt}
        className={className as string | undefined}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : undefined}
      />
    )
  }

  const unoptimized = resolved === '/grain.svg'

  return (
    <Image
      src={resolved}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      unoptimized={unoptimized}
      {...props}
    />
  )
}
