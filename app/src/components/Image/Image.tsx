import * as React from 'react';
import { useStatefulRef, useInViewport } from '../../hooks';
import { RichImage } from '../../types';
import { getSizes, getImageDetails, getAspectRatio } from './utils';
import { RatioPadding } from './RatioPadding';
import { HoverImageWrapper, Wrapper, Picture, Caption } from './styled';

interface ImageProps {
  className?: string;
  image: RichImage;
  altText?: string;
  role?: string;
  hoverImage?: RichImage;
  /**
   * A custom ratio for this image (height / width)
   *
   * If your GROQ fetches the image's metadata, that will be used to determine
   * the default ratio.
   */
  ratio?: number;
  /**
   * A css object-fit property. defaults to 'cover'.
   *
   * If you are using the default ratio, this prop is not necessary.
   */
  objectFit?: string;
  /**
   * Set to `true` if you want to use HTML canvas
   * to render the placeholder. This is only necessary when
   * the default usage of a container with padding-bottom
   * produces undesired reuslts.
   */
  canvasFill?: boolean;
  /**
   * An optional color to use as the background of the image container.
   * This is only visible before the image loads.
   * Defaults to 'transparent'
   */
  backgroundColor?: string;
  /**
   * The css/html sizes at which this image is expected to appear,
   * from mobile to desktop. The final value will be used without a breakpoint.
   *
   * Examples:
   *
   * ['100vw', '80vw', '500px'] =>
   *   '(max-width: 650px) 100vw, (max-width: 900px) 80vw, 500px'
   *
   * ['100vw', '80vw'] =>
   *   '(max-width: 650px) 100vw, 80vw'
   *
   * ['80vw'] =>
   *   '80vw'
   */
  sizes: string[];
  /**
   * An optional onLoad handler
   */
  onLoad?: () => void;
  /**
   * Set to `true` if you do not want the image to lazy-load
   */
  preload?: boolean;
}

/**
 * Create's an image "sizes" attribute given an array of numbers.
 */
export const Image: React.FC<ImageProps> = ({
  image,
  className,
  sizes: imageSizes,
  hoverImage,
  altText: customAltText,
  role,
  onLoad,
  preload,
  ratio: customRatio,
  canvasFill,
  backgroundColor,
  objectFit,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = useStatefulRef<HTMLImageElement>(null);
  const { isInViewOnce } = useInViewport(containerRef);

  const imageDetails = React.useMemo(() => getImageDetails(image), [image]);
  const hoverImageDetails = React.useMemo(
    () => (hoverImage ? getImageDetails(hoverImage) : null),
    [hoverImage],
  );
  const sizes = getSizes(imageSizes);

  const {
    caption,
    src,
    altText: cmsAltText,
    srcSet,
    srcSetWebp,
  } = imageDetails || {};

  const altText = customAltText || cmsAltText;

  React.useEffect(() => {
    if (imageRef.current === null) return;
    if (imageRef.current.complete) {
      setLoaded(true);
    }
  }, [imageRef.current]);

  const handleOnLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const ratio = customRatio || getAspectRatio(image);
  const shouldRender = preload || isInViewOnce;

  return (
    <>
      <Wrapper ref={containerRef} className={className}>
        {ratio ? (
          <RatioPadding
            canvasFill={canvasFill}
            backgroundColor={backgroundColor}
            ratio={ratio}
          />
        ) : null}
        {src && shouldRender ? (
          <Picture objectFit={objectFit} loaded={loaded}>
            {srcSetWebp ? (
              <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
            ) : null}
            {srcSet ? (
              <source type="image/jpg" srcSet={srcSet} sizes={sizes} />
            ) : null}
            <img
              src={src}
              alt={altText || ''}
              role={role}
              ref={imageRef}
              onLoad={handleOnLoad}
              /* @ts-ignore */
              rel={preload ? 'preload' : undefined}
            />
            {hoverImageDetails && hoverImageDetails.src ? (
              <HoverImageWrapper>
                <img
                  src={hoverImageDetails.src}
                  sizes={sizes}
                  srcSet={srcSetWebp || srcSet || undefined}
                />
              </HoverImageWrapper>
            ) : null}
          </Picture>
        ) : null}
      </Wrapper>
      {caption ? <Caption>{caption}</Caption> : null}
    </>
  );
};
