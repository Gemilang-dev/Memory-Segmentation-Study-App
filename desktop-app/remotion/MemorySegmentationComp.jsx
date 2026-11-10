import React from 'react';
import { AbsoluteFill, Video, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ThreeCanvas } from '@remotion/three';

export const MemorySegmentationComp = ({ title, videoSrc, moduleIndex }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0B1320', fontFamily: 'Nunito, sans-serif' }}>
      <Video src={staticFile(videoSrc)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <ThreeCanvas
        width={width}
        height={height}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.2 }}
        camera={{ fov: 35, position: [0, 2, 6] }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2.0} />
        <mesh position={[2.4, Math.sin(t * 2) * 0.2, 0]} rotation={[0, t * 0.6, 0]}>
          <boxGeometry args={[0.8, 1.4, 0.8]} />
          <meshStandardMaterial color="#3FF2B6" wireframe />
        </mesh>
      </ThreeCanvas>
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          padding: '8px 16px',
          borderRadius: 999,
          background: 'rgba(11, 19, 32, 0.82)',
          border: '1px solid rgba(63, 242, 182, 0.45)',
          color: '#3FF2B6',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: 1.2,
        }}
      >
        {title} · {t.toFixed(1)}s
      </div>
    </AbsoluteFill>
  );
};
