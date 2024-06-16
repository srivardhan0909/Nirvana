import React from "react";
import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        'We provide solution for  Stress',
        2000,
        'We provide solution for  Depression',
        2000,
        'We provide solution for  Anxiety',
        2000,
        'We provide solution for  Tension',
        2000,
      ]}
      wrapper="span"
      speed={0}
      style={{ fontSize: '2em', display: 'block' }}
      repeat={Infinity}
    />
  );
};
export default ExampleComponent
