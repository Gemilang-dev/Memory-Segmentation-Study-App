import React from 'react';
import { Composition } from 'remotion';
import { MemorySegmentationComp } from './MemorySegmentationComp';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Module1-ProcessAndSegmentation"
        component={MemorySegmentationComp}
        durationInFrames={24 * 21}
        fps={24}
        width={1280}
        height={720}
        defaultProps={{
          moduleIndex: 0,
          title: 'Module 1: Process & Memory Segmentation',
          videoSrc: 'videos/module-1.mp4',
        }}
      />
      <Composition
        id="Module2-CodeAndDataSegments"
        component={MemorySegmentationComp}
        durationInFrames={24 * 22}
        fps={24}
        width={1280}
        height={720}
        defaultProps={{
          moduleIndex: 1,
          title: 'Module 2: Code & Data Segments',
          videoSrc: 'videos/module-2.mp4',
        }}
      />
      <Composition
        id="Module3-StackAndSubroutines"
        component={MemorySegmentationComp}
        durationInFrames={24 * 20}
        fps={24}
        width={1280}
        height={720}
        defaultProps={{
          moduleIndex: 2,
          title: 'Module 3: Stack Segment & Subroutines',
          videoSrc: 'videos/module-3.mp4',
        }}
      />
      <Composition
        id="Module4-DynamicStackAndFreeMemory"
        component={MemorySegmentationComp}
        durationInFrames={24 * 20}
        fps={24}
        width={1280}
        height={720}
        defaultProps={{
          moduleIndex: 3,
          title: 'Module 4: Dynamic Stack Growth & Free Memory',
          videoSrc: 'videos/module-4.mp4',
        }}
      />
    </>
  );
};
