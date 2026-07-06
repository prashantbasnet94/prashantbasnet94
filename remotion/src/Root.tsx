import React from 'react';
import {Composition} from 'remotion';
import {Hero} from './Hero';
import {Metrics} from './Metrics';

export const Root: React.FC = () => (
  <>
    <Composition id="Hero" component={Hero} width={980} height={330} fps={30} durationInFrames={270} />
    <Composition id="Metrics" component={Metrics} width={980} height={272} fps={30} durationInFrames={150} />
  </>
);
