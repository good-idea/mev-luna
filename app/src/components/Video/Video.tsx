import * as React from 'react';
import { Video as VideoType } from '../../types/sanity';

interface VideoProps {
  video: VideoType;
}

export const Video: React.FC<VideoProps> = ({ video }) => {
  const src = `https://player.vimeo.com/video/${video.vimeoId}`;
  // Compute padding-bottom percentage from the video's aspectRatio (e.g. "16:9")
  const [width, height] = video.aspectRatio.split(':').map(Number);
  const paddingBottomPercentage = (height / width) * 100;
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: `${paddingBottomPercentage}%`,
        height: 0,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <iframe
        src={src}
        title={video.title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
