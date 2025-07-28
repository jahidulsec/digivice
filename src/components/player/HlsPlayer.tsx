import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsPlayerProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
}

const HlsPlayer: React.FC<HlsPlayerProps> = ({
  src,
  autoPlay = true,
  controls = true,
  width = '100%',
  height = 'auto',
  muted = false,
  loop = false,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) video.play().catch((err) => console.error('Autoplay failed:', err));
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }
  }, [src, autoPlay]);

  return (
    <video ref={videoRef} controls={controls} muted={muted} loop={loop} poster={poster} style={{ width, height }} />
  );
};

export default HlsPlayer;
